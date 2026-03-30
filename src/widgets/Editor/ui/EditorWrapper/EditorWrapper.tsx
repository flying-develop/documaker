/* eslint-disable react/jsx-boolean-value */
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalEditor, SerializedEditorState } from 'lexical';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TemplateUnit } from '&/entities/Template/model/types/TemplateUnit';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import EditorUnit from '&/widgets/Editor/ui/EditorUnit/EditorUnit';
import {
    HashtagPlugin,
    CustomOnChangePlugin,
    AnchorLinkPlugin,
    KeyWordPlugin,
} from '&/widgets/Editor/plugins/custom';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import FloatingLinkEditorPlugin from '&/widgets/Editor/plugins/custom/FloatingLinkEditorPlugin';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import { TableContext } from '../../plugins/custom/TablePlugin';
import { TableCellResizerPlugin } from '../../plugins/custom/TableCellResizer';
import { InlineImagePlugin } from '../../plugins/custom/InlineImagePlugin';
import { TableActionMenuPlugin } from '../../plugins/custom/TableActionMenuPlugin';
import { initialConfig } from '../../config/initialConfig';
import AnchorPlugin from '../../plugins/custom/AnchorPlugin/AnchorPlugin';

interface EditorWrapperProps {
    unit: TemplateUnit;
    setEditor: (editor: LexicalEditor) => void;
}

const EditorWrapper: FC<PropsWithChildren<EditorWrapperProps>> = (props) => {
    const { unit, setEditor, children } = props;
    const editedSection = useAppSelector(getTemplateEditedSection);
    const dispatch = useAppDispatch();
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    const onChange = useCallback(
        (state: SerializedEditorState) => {
            if (unit.current_variant) {
                const section_data = editedSection.section_data || {};
                dispatch(
                    templatesActions.updateTemplateSection({
                        section_data: {
                            ...section_data,
                            [unit.current_variant]: JSON.stringify(state),
                        },
                    }),
                );
            }
        },
        [dispatch, editedSection.section_data, unit.current_variant],
    );

    return (
        <LexicalComposer initialConfig={initialConfig} key={unit.current_variant}>
            <TableContext>
                <>
                    <EditorUnit
                        setEditor={setEditor}
                        unit={unit}
                        onRef={onRef}
                        setIsLinkEditMode={setIsLinkEditMode}
                    >
                        {children}
                    </EditorUnit>
                    <CustomOnChangePlugin onChange={onChange} />
                    <HistoryPlugin />
                    <HashtagPlugin />
                    <KeyWordPlugin />
                    <TablePlugin hasCellMerge hasCellBackgroundColor={false} />
                    <TableCellResizerPlugin />
                    <LinkPlugin />
                    <InlineImagePlugin />
                    <AnchorPlugin />
                    <AnchorLinkPlugin />

                    {floatingAnchorElem && (
                        <>
                            <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge />
                            <FloatingLinkEditorPlugin
                                anchorElem={floatingAnchorElem}
                                isLinkEditMode={isLinkEditMode}
                                setIsLinkEditMode={setIsLinkEditMode}
                            />
                            <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge />
                        </>
                    )}
                </>
            </TableContext>
        </LexicalComposer>
    );
};

export default EditorWrapper;
