import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { LexicalEditor } from 'lexical';
import { Button, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateCurrentSection } from '&/entities/Template/model/selectors/getTemplateCurrentSection';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { Tag } from '&/entities/Tag/model/types/Tag';
import _ from 'lodash';
import EditorBlankWrapper from '&/widgets/Editor/ui/EditorBlankWrapper/EditorBlankWrapper';
import EditorBlankToolbar from '&/widgets/Editor/ui/EditorBlankToolbar/EditorBlankToolbar';
import { duplicateTemplateSection } from '&/entities/Template/model/services/duplicateTemplateSection';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { getTemplateIsCase } from '&/entities/Template/model/selectors/getTemplateIsCase';
import {
    BaseItem,
    TemplateEditorSortableList,
} from '&/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/TemplateEditorSortableList';
import { updateTemplateSectionBlankSilence } from '&/entities/Template/model/services/updateTemplateSectionBlankSilence';
import cn from './BlankEditor.module.scss';

interface Props {
    isClient?: boolean;
}

const BlankEditor: FC<Props> = (props) => {
    const { isClient } = props;
    const dispatch = useAppDispatch();
    const currentSection = useAppSelector(getTemplateCurrentSection);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const loading = useAppSelector(getTemplateLoading);
    const isBlank = useAppSelector(getTemplateIsBlank);
    const isCase = useAppSelector(getTemplateIsCase);
    const [editor, setEditor] = useState<LexicalEditor>();
    const [items, setItems] = useState<Tag[]>([]);

    const tags = useMemo(() => {
        if (editedSection?.tags) {
            return _.sortBy(editedSection.tags, ['position_manual', 'position']);
        }
        return [];
    }, [editedSection]);

    const duplicateSection = useCallback(() => {
        dispatch(duplicateTemplateSection({ section: editedSection }));
    }, [dispatch, editedSection]);

    const sortTagsHandler = useCallback(
        (tags: Tag[]) => {
            const sortedTags = tags.map((tag, idx) => ({ ...tag, position_manual: 100 * idx }));
            dispatch(
                updateTemplateSectionBlankSilence({
                    section: { ...editedSection, tags: sortedTags },
                }),
            );
            setItems(sortedTags);
        },
        [dispatch, editedSection],
    );

    useEffect(() => {
        if (tags) {
            setItems(tags);
        }
    }, [tags]);

    useEffect(() => {
        if (!!currentSection) {
            dispatch(templatesActions.setTemplateEditedSection(currentSection));
        }
    }, [currentSection, dispatch]);

    return (
        <Card>
            <>
                {loading ? (
                    <BlockPage />
                ) : (
                    <>
                        {isBlank && <EditorBlankToolbar editor={editor} />}
                        <TemplateEditorSortableList
                            key={editedSection.id}
                            items={items as BaseItem[]}
                            onChange={sortTagsHandler}
                            renderItem={(tag: Tag) => {
                                return (
                                    <TemplateEditorSortableList.Item id={tag.id as number}>
                                        <EditorBlankWrapper
                                            key={tag.id}
                                            isClient={isClient}
                                            section={editedSection}
                                            setEditor={setEditor}
                                            tag={tag}
                                        >
                                            <TemplateEditorSortableList.DragHandle />
                                        </EditorBlankWrapper>
                                    </TemplateEditorSortableList.Item>
                                );
                            }}
                        />
                        {!!editedSection.is_multiple && isCase && (
                            <Card className={cn.duplicate} styles={{ body: { padding: '10px' } }}>
                                <Button className={cn.button} onClick={duplicateSection}>
                                    Duplicate section
                                </Button>
                            </Card>
                        )}
                    </>
                )}
            </>
        </Card>
    );
};

export default BlankEditor;
