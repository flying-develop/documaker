import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { LexicalEditor } from 'lexical';
import { Card, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { getTemplateLoading } from '&/entities/Template/model/selectors/getTemplateLoading';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import EditorWrapper from '&/widgets/Editor/ui/EditorWrapper/EditorWrapper';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import EditorFileUnit from '&/widgets/Editor/ui/EditorFileUnit/EditorFileUnit';
import EditorUnitDivider from '&/widgets/Editor/ui/EditorUnitDivider/EditorUnitDivider';
import _ from 'lodash';
import EditorSectionUnit from '&/widgets/Editor/ui/EditorSectionUnit/EditorSectionUnit';
import { updateTemplateSectionByIdSilence } from '&/entities/Template/model/services/updateTemplateSectionByIdSilence';
import classNames from 'classnames';
import {
    BaseItem,
    TemplateEditorSortableList,
} from '&/widgets/Editor/lib/TemplateEditor/ui/TemplateEditorSortableList/TemplateEditorSortableList';
import Collapsible from 'react-collapsible';
import EditorTitle from '../../ui/EditorTitle/EditorTitle';
import EditorToolbar from '../../ui/EditorToolbar/EditorToolbar';

import cn from './TemplateEditor.module.scss';
import EditorFile from '&/widgets/Editor/ui/EditorFile/EditorFile';

const TemplateEditor: FC<{ fixedHeader: boolean }> = ({ fixedHeader }) => {
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);
    const loading = useAppSelector(getTemplateLoading);
    const [editor, setEditor] = useState<LexicalEditor>();
    const [items, setItems] = useState<TemplateUnit[]>([]);

    const sortUnitsHandler = useCallback(
        (units: TemplateUnit[]) => {
            const sortedUnits = units.map((unit, idx) => ({ ...unit, sort: 100 * idx }));
            dispatch(
                updateTemplateSectionByIdSilence({
                    section: { ...editedSection, units: sortedUnits },
                }),
            );
            setItems(sortedUnits);
        },
        [dispatch, editedSection],
    );

    const units = useMemo(() => {
        if (editedSection?.units) {
            return _.sortBy(editedSection.units, 'sort');
        }
        return [];
    }, [editedSection]);

    useEffect(() => {
        if (units) {
            setItems(units);
        }
    }, [units]);

    return (
        <Card className={cn.editor} classNames={{ body: cn['editor-body'] }}>
            <>
                {loading ? (
                    <BlockPage />
                ) : (
                    <>
                        {!!editedSection?.id && !editedSection.is_global ? (
                            <>
                                <div
                                    className={classNames(cn['editor-header'], {
                                        [cn['editor-header-fixed']]: fixedHeader,
                                    })}
                                >
                                    <div className={cn['editor-header-body']}>
                                        <Collapsible
                                            trigger="123"
                                            triggerTagName="div"
                                            open={!fixedHeader}
                                            triggerDisabled={false}
                                            transitionTime={100}
                                            style={{ lineHeight: 0 }}
                                        >
                                            <EditorTitle section={editedSection} />
                                        </Collapsible>
                                        <EditorToolbar editor={editor} />
                                    </div>
                                </div>
                                {editedSection.is_file ? (
                                    <EditorFile setEditor={setEditor} />
                                ) : (
                                    <>
                                        <EditorUnitDivider />
                                        <TemplateEditorSortableList
                                            key={editedSection.id}
                                            items={items as BaseItem[]}
                                            onChange={sortUnitsHandler}
                                            renderItem={(unit: TemplateUnit) => {
                                                return (
                                                    <TemplateEditorSortableList.Item
                                                        id={unit.id as number}
                                                    >
                                                        {!!unit.is_file && (
                                                            <>
                                                                <EditorFileUnit unit={unit}>
                                                                    <TemplateEditorSortableList.DragHandle />
                                                                </EditorFileUnit>
                                                                <EditorUnitDivider unit={unit} />
                                                            </>
                                                        )}
                                                        {!!unit.is_section && !unit.is_file && (
                                                            <>
                                                                <EditorSectionUnit unit={unit}>
                                                                    <TemplateEditorSortableList.DragHandle />
                                                                </EditorSectionUnit>
                                                                <EditorUnitDivider unit={unit} />
                                                            </>
                                                        )}
                                                        {!unit.is_file && !unit.is_section && (
                                                            <>
                                                                <EditorWrapper
                                                                    unit={unit}
                                                                    setEditor={setEditor}
                                                                >
                                                                    <TemplateEditorSortableList.DragHandle />
                                                                </EditorWrapper>
                                                                <EditorUnitDivider unit={unit} />
                                                            </>
                                                        )}
                                                    </TemplateEditorSortableList.Item>
                                                );
                                            }}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <div className={cn.empty}>
                                <Empty description="Create you first section" />
                            </div>
                        )}
                    </>
                )}
            </>
        </Card>
    );
};

export default TemplateEditor;
