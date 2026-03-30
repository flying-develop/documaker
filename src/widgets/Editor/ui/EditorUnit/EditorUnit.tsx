import { FC, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalEditor } from 'lexical';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Button, Card, Popconfirm, Typography } from 'antd';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { initialEditorState } from '&/widgets/Editor/config/initialEditorState';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import { deleteTemplateSectionUnit } from '&/entities/Template/model/services/deleteTemplateSectionUnit';
import cn from './EditorUnit.module.scss';

interface EditorUnitProps {
    setEditor: (editor: LexicalEditor) => void;
    setIsLinkEditMode: (value: boolean) => void;
    unit: TemplateUnit;
    onRef?: any;
}

const EditorUnit: FC<PropsWithChildren<EditorUnitProps>> = (props) => {
    const { setEditor, unit, onRef, setIsLinkEditMode, children } = props;
    const isEditable = useLexicalEditable();
    const editedSection = useAppSelector(getTemplateEditedSection);
    const dispatch = useAppDispatch();
    const [editor] = useLexicalComposerContext();
    const setEditorHandler = useCallback(() => {
        if (editor) {
            setEditor(editor);
            if (!editedSection.current_unit) {
                dispatch(templatesActions.updateTemplateSection({ current_unit: unit.id }));
            }
        }
    }, [editor, setEditor, editedSection.current_unit, dispatch, unit.id]);

    const addVariantHandler = useCallback(() => {
        if (unit) {
            dispatch(templatesActions.addTemplateSectionUnitVariant(unit));
        }
    }, [dispatch, unit]);

    const removeVariantHandler = useCallback(() => {
        if (unit.id && unit.current_variant) {
            dispatch(
                templatesActions.removeTemplateSectionUnitVariant({
                    unitId: unit.id,
                    variantId: unit.current_variant,
                }),
            );
        }
    }, [dispatch, unit]);

    const removeUnitHandler = useCallback(() => {
        if (unit) {
            dispatch(deleteTemplateSectionUnit(unit));
        }
    }, [dispatch, unit]);

    const currentVariantPosition = useMemo(() => {
        if (unit.variants && unit.current_variant) {
            return unit.variants?.findIndex((variant) => variant.id === unit.current_variant) + 1;
        }
        return 1;
    }, [unit]);

    const nextVariantHandler = useCallback(() => {
        if (unit.id && unit.variants && unit.current_variant) {
            const currentVariantIndex = unit.variants?.findIndex(
                (variant) => variant.id === unit.current_variant,
            );
            if (currentVariantIndex < unit.variants.length - 1) {
                const current_variant =
                    unit.variants[currentVariantIndex + 1]?.id || unit.current_variant;
                if (current_variant) {
                    const current_state = editedSection?.section_data
                        ? editedSection.section_data[current_variant]
                        : initialEditorState;
                    dispatch(
                        templatesActions.updateTemplateSectionUnit({
                            ...unit,
                            current_variant,
                            current_state,
                        }),
                    );
                }
            }
        }
    }, [dispatch, editedSection, unit]);

    const prevVariantHandler = useCallback(() => {
        if (unit.id && unit.variants && unit.current_variant) {
            const currentVariantIndex = unit.variants?.findIndex(
                (variant) => variant.id === unit.current_variant,
            );
            if (currentVariantIndex > 0 && unit.variants.length > 1) {
                const current_variant =
                    unit.variants[currentVariantIndex - 1]?.id || unit.current_variant;
                if (current_variant) {
                    const current_state = editedSection?.section_data
                        ? editedSection.section_data[current_variant]
                        : initialEditorState;
                    dispatch(
                        templatesActions.updateTemplateSectionUnit({
                            ...unit,
                            current_variant,
                            current_state,
                        }),
                    );
                }
            }
        }
    }, [dispatch, editedSection.section_data, unit]);

    useEffect((): any => {
        if (unit.current_state && editor) {
            editor.setEditorState(editor.parseEditorState(unit.current_state));
        }
    }, [editor, dispatch, unit]);

    return (
        <Card
            className={cn.unit}
            hoverable
            onClick={setEditorHandler}
            styles={{ body: { padding: 10 } }}
        >
            <div className={cn.controls}>
                <div className={cn.group}>
                    {children}
                    <Button
                        type="primary"
                        icon={<AiOutlineLeft />}
                        className={cn.button}
                        onClick={prevVariantHandler}
                        disabled={unit.variants?.length === 1}
                    />
                    <Button
                        type="primary"
                        icon={<AiOutlineRight />}
                        className={cn.button}
                        onClick={nextVariantHandler}
                        disabled={unit.variants?.length === 1}
                    />
                </div>
                <div className={cn.group}>
                    <Typography.Text className={cn.counter}>
                        {currentVariantPosition}/{unit?.variants?.length}
                    </Typography.Text>
                    <Button
                        type="primary"
                        icon={<AiOutlinePlus />}
                        className={cn.button}
                        onClick={addVariantHandler}
                    />
                    <Popconfirm
                        title="Delete the option"
                        description="Are you sure you want to delete this unit option?"
                        onConfirm={removeVariantHandler}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" icon={<AiOutlineMinus />} className={cn.button} />
                    </Popconfirm>
                    <Popconfirm
                        title="Delete the unit"
                        description="Are you sure you want to completely delete this unit?"
                        onConfirm={removeUnitHandler}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" icon={<FaRegTrashAlt />} className={cn.button} />
                    </Popconfirm>
                </div>
            </div>
            <div className={cn.wrapper} onClick={() => setIsLinkEditMode(false)}>
                <RichTextPlugin
                    contentEditable={
                        <div ref={onRef}>
                            <ContentEditable className={cn.contentEditable} />
                        </div>
                    }
                    placeholder={<span className={cn.placeholder}>Enter some text...</span>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {!isEditable && <LexicalClickableLinkPlugin />}
            </div>
        </Card>
    );
};

export default EditorUnit;
