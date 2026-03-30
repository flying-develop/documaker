import { FC, useCallback, useEffect, useState } from 'react';
import TextStyleBold from '&/shared/assets/icons/editor/TextStyleBold.svg?react';
import TextStyleItalic from '&/shared/assets/icons/editor/TextStyleItalic.svg?react';
import TextStyleUnderline from '&/shared/assets/icons/editor/TextStyleUnderline.svg?react';
import TextAlignLeft from '&/shared/assets/icons/editor/TextAlignLeft.svg?react';
import TextAlignCenter from '&/shared/assets/icons/editor/TextAlignCenter.svg?react';
import TextAlignRight from '&/shared/assets/icons/editor/TextAlignRight.svg?react';
import TextAlignJustify from '&/shared/assets/icons/editor/TextAlignJustify.svg?react';
import ToolImage from '&/shared/assets/icons/editor/ToolImage.svg?react';
import ToolTable from '&/shared/assets/icons/editor/ToolTable.svg?react';
import ToolLink from '&/shared/assets/icons/editor/ToolLink.svg?react';
import classNames from 'classnames';
import {
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    EditorState,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { Button } from 'antd';
import { getSelectedNode } from '&/widgets/Editor/utils/getSelectionNode';
import EditorLinks from '&/widgets/Editor/ui/EditorLinks/EditorLinks';
import { useModal } from '../../hooks/useModal';
import {
    InsertInlineImageBody,
    InsertInlineImageFooter,
} from '../../plugins/custom/InlineImagePlugin';
import { InsertTableBody, InsertTableFooter } from '../../plugins/custom/TablePlugin';
import cn from './EditorToolbar.module.scss';
import { LuBraces } from 'react-icons/lu';
import EditorKeyWords from '&/widgets/Editor/ui/EditorKeyWords/EditorKeyWords';

interface EditorToolbarProps {
    editor: any;
}

const EditorToolbar: FC<EditorToolbarProps> = (props) => {
    const { editor } = props;
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [elementFormat, setElementFormat] = useState('left');
    const [isLink, setIsLink] = useState(false);
    const [isKeyword, setIsKeyWord] = useState(false);
    const [modal, createModal] = useModal();

    const handleChangeStyle = useCallback(
        (inlineStyle: string) => {
            if (editor) {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, inlineStyle);
            }
        },
        [editor],
    );

    const handleChangeAlign = useCallback(
        (alignStyle: string) => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignStyle);
        },
        [editor],
    );

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));

            const node = getSelectedNode(selection);
            const parent = node.getParent();
            setElementFormat(
                ($isElementNode(node) ? node.getFormatType() : parent?.getFormatType()) || 'left',
            );
        }
    }, []);

    useEffect(() => {
        if (editor) {
            return mergeRegister(
                editor.registerUpdateListener(({ editorState }: { editorState: EditorState }) => {
                    editorState.read(() => {
                        updateToolbar();
                    });
                }),
            );
        }
    }, [editor, updateToolbar]);

    const handleToolTable = () => {
        createModal(
            'Insert Table',
            true,
            () => <InsertTableBody />,
            (onClose) => <InsertTableFooter activeEditor={editor} onClose={onClose} />,
        );
    };

    const handleToolImage = () => {
        createModal(
            'Insert Inline Image',
            true,
            () => <InsertInlineImageBody />,
            (onClose) => <InsertInlineImageFooter activeEditor={editor} onClose={onClose} />,
        );
    };
    const addLinkHandler = useCallback(() => {
        setIsLink((prev) => !prev);
    }, []);

    const addKeyWordHandler = useCallback(() => {
        setIsKeyWord((prev) => !prev);
    }, []);

    return (
        <>
            <div className={cn.toolbar}>
                <div className={cn.group}>
                    <Button
                        type="primary"
                        onClick={() => handleChangeStyle('bold')}
                        className={classNames(cn.button, cn.first, {
                            [cn.active]: isBold,
                        })}
                    >
                        <TextStyleBold />
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => handleChangeStyle('italic')}
                        className={classNames(cn.button, {
                            [cn.active]: isItalic,
                        })}
                    >
                        <TextStyleItalic />
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => handleChangeStyle('underline')}
                        className={classNames(cn.button, cn.last, {
                            [cn.active]: isUnderline,
                        })}
                    >
                        <TextStyleUnderline />
                    </Button>
                </div>

                <div className={cn.group}>
                    <Button
                        type="primary"
                        onClick={() => handleChangeAlign('left')}
                        className={classNames(cn.button, cn.first, {
                            [cn.active]: elementFormat === 'left',
                        })}
                    >
                        <TextAlignLeft />
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleChangeAlign('center')}
                        className={classNames(cn.button, {
                            [cn.active]: elementFormat === 'center',
                        })}
                    >
                        <TextAlignCenter />
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleChangeAlign('right')}
                        className={classNames(cn.button, {
                            [cn.active]: elementFormat === 'right',
                        })}
                    >
                        <TextAlignRight />
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handleChangeAlign('justify')}
                        className={classNames(cn.button, cn.last, {
                            [cn.active]: elementFormat === 'justify',
                        })}
                    >
                        <TextAlignJustify />
                    </Button>
                </div>

                <div className={cn.group}>
                    <Button
                        type="primary"
                        onClick={handleToolImage}
                        className={classNames(cn.button, cn.first, {
                            [cn.active]: false,
                        })}
                    >
                        <ToolImage />
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleToolTable}
                        className={classNames(cn.button, {
                            [cn.active]: false,
                        })}
                    >
                        <ToolTable />
                    </Button>
                    <Button
                        type="primary"
                        onClick={addLinkHandler}
                        className={classNames(cn.button, {
                            [cn.active]: false,
                        })}
                    >
                        <ToolLink />
                    </Button>

                    <Button
                        type="primary"
                        onClick={addKeyWordHandler}
                        className={classNames(cn.button, cn.last, {
                            [cn.active]: false,
                        })}
                    >
                        <LuBraces size={24} />
                    </Button>
                </div>
            </div>

            {modal}
            {isLink && <EditorLinks editor={editor} onCancel={addLinkHandler} />}
            {isKeyword && <EditorKeyWords editor={editor} onCancel={addKeyWordHandler} />}
        </>
    );
};

export default EditorToolbar;
