import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalEditor } from 'lexical';
import { Card, Modal } from 'antd';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { Tag, TagOption } from '&/entities/Tag/model/types/Tag';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateIsBlank } from '&/entities/Template/model/selectors/getTemplateIsBlank';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import EditorTagInput from '&/widgets/Editor/ui/EditorTag/ui/EditorTagInput/EditorTagInput';
import { SelectTemplateSection } from '&/features/Template';
import { updateTemplateSectionBlankTag } from '&/entities/Template/model/services/updateTemplateSectionBlankTag';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { TagType } from '&/shared/types/TagTypes';
import EditorTagFile from '&/widgets/Editor/ui/EditorTag/ui/EditorTagFile/EditorTagFile';
import cn from './EditorTag.module.scss';

interface TagProps {
    setEditor: (editor: LexicalEditor) => void;
    tag: Tag;
    section: TemplateSection;
    isClient?: boolean;
}

const EditorTag: FC<PropsWithChildren<TagProps>> = (props) => {
    const dispatch = useAppDispatch();
    const { setEditor, section, tag, isClient, children } = props;
    const isBlank = useAppSelector(getTemplateIsBlank);
    const editedSection = useAppSelector(getTemplateEditedSection);
    const [editor] = useLexicalComposerContext();
    const [option, setOption] = useState<TagOption | null>(null);

    const onSetSection = useCallback(
        (linked_section: TemplateSection) => {
            if (option) {
                dispatch(
                    updateTemplateSectionBlankTag({
                        tag: {
                            ...tag,
                            options: tag.options?.map((o) => {
                                if (o.id === option?.id) {
                                    return {
                                        ...o,
                                        linked_section,
                                    };
                                }
                                return o;
                            }),
                        },
                        section,
                    }),
                );
            }
        },
        [dispatch, option, section, tag],
    );

    const onDeleteSection = useCallback(
        (option: TagOption) => {
            if (option) {
                dispatch(
                    updateTemplateSectionBlankTag({
                        tag: {
                            ...tag,
                            options: tag.options?.map((o) => {
                                if (o.id === option?.id) {
                                    return {
                                        ...o,
                                        linked_section: null,
                                    };
                                }
                                return o;
                            }),
                        },
                        section,
                    }),
                );
            }
        },
        [dispatch, section, tag],
    );

    const setEditorHandler = useCallback(() => {
        if (editor) {
            setEditor(editor);
        }
    }, [setEditor, editor]);

    const tagHandler = useCallback(
        (name: keyof Tag) => (value: string | number | number[]) => {
            if (tag.id) {
                const tags = section.tags || [];
                dispatch(
                    templatesActions.updateTemplateSection({
                        tags: tags.map((sectionTag) => {
                            if (sectionTag.id === tag.id) {
                                return {
                                    ...tag,
                                    [name]: value,
                                };
                            }
                            return sectionTag;
                        }),
                    }),
                );
            }
        },
        [dispatch, section, tag],
    );

    useEffect((): any => {
        if (tag.description && editor) {
            editor.setEditorState(editor.parseEditorState(tag.description));
        }
    }, [editor, dispatch, tag]);

    if (tag.type === 'choices' || tag.type === 'choice') {
        if (!tag.options?.length) {
            return null;
        }
    }

    return (
        <Card
            className={cn.blankTag}
            hoverable
            onClick={setEditorHandler}
            styles={{ body: { padding: '10px' } }}
        >
            <div className={cn.controls}>
                <div className={cn.group}>
                    {children}
                    <div className={cn.title}>{`${tag?.title}`}</div>
                </div>
            </div>

            <div className={cn.wrapper}>
                {isClient ? (
                    <>
                        {tag?.description && (
                            <RichTextPlugin
                                contentEditable={<ContentEditable className={cn.readOnly} />}
                                ErrorBoundary={LexicalErrorBoundary}
                                placeholder={null}
                            />
                        )}
                    </>
                ) : (
                    <RichTextPlugin
                        contentEditable={<ContentEditable className={cn.contentEditable} />}
                        ErrorBoundary={LexicalErrorBoundary}
                        placeholder={<span className={cn.placeholder}>Enter some text...</span>}
                    />
                )}
            </div>
            {tag.type === TagType.FILE && (
                <EditorTagFile key={tag.id} tag={tag} section={editedSection} />
            )}

            <EditorTagInput
                deleteSection={onDeleteSection}
                // setOption={!!editedSection?.children?.length ? setOption : undefined}
                setOption={setOption}
                tag={tag}
                onChange={tagHandler(isBlank ? 'default_value' : 'value')}
                isClient={isClient}
            />

            {option && !isClient && (
                <Modal title="Insert Link" open onCancel={() => setOption(null)} footer={null}>
                    <SelectTemplateSection onSelect={onSetSection} title="Set section" fullTree />
                </Modal>
            )}
        </Card>
    );
};

export default EditorTag;
