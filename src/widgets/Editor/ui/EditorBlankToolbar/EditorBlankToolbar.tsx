import { FC, useCallback, useEffect, useState } from 'react';
import { AiOutlineBold, AiOutlineUnderline, AiOutlineItalic, AiOutlineLink } from 'react-icons/ai';
import {
    CiImageOn,
    CiTextAlignCenter,
    CiTextAlignJustify,
    CiTextAlignLeft,
    CiTextAlignRight,
    CiViewTable,
    CiYoutube,
} from 'react-icons/ci';
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
import { Button, Card } from 'antd';
import { getSelectedNode } from '&/widgets/Editor/utils/getSelectionNode';
import EditorLinks from '&/widgets/Editor/ui/EditorLinks/EditorLinks';
import EditorYouTube from '&/widgets/Editor/ui/EditorYouTube/EditorYouTube';
import { useModal } from '../../hooks/useModal';
import {
    InsertInlineImageBody,
    InsertInlineImageFooter,
} from '../../plugins/custom/InlineImagePlugin';
import { InsertTableBody, InsertTableFooter } from '../../plugins/custom/TablePlugin';
import cn from './EditorBlankToolbar.module.scss';

interface EditorToolbarProps {
    editor: any;
}

const EditorBlankToolbar: FC<EditorToolbarProps> = (props) => {
    const { editor } = props;
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [elementFormat, setElementFormat] = useState('left');
    const [isLink, setIsLink] = useState(false);
    const [isYT, setYT] = useState(false);
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

    const addYTHandler = useCallback(() => {
        setYT((prev) => !prev);
    }, []);

    return (
        <>
            <Card
                hoverable
                styles={{ body: { padding: 0, display: 'flex', justifyContent: 'flex-end' } }}
                style={{ padding: 0, margin: '10px 0' }}
            >
                <div className={cn.toolbar}>
                    <div className={cn.group}>
                        <Button
                            type="primary"
                            icon={<AiOutlineBold />}
                            onClick={() => handleChangeStyle('bold')}
                            className={classNames(cn.button, cn.first, {
                                [cn.active]: isBold,
                            })}
                        />

                        <Button
                            type="primary"
                            icon={<AiOutlineItalic />}
                            onClick={() => handleChangeStyle('italic')}
                            className={classNames(cn.button, {
                                [cn.active]: isItalic,
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<AiOutlineUnderline />}
                            onClick={() => handleChangeStyle('underline')}
                            className={classNames(cn.button, cn.last, {
                                [cn.active]: isUnderline,
                            })}
                        />
                    </div>

                    <div className={cn.group}>
                        <Button
                            type="primary"
                            icon={<CiTextAlignLeft />}
                            onClick={() => handleChangeAlign('left')}
                            className={classNames(cn.button, cn.first, {
                                [cn.active]: elementFormat === 'left',
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<CiTextAlignCenter />}
                            onClick={() => handleChangeAlign('center')}
                            className={classNames(cn.button, {
                                [cn.active]: elementFormat === 'center',
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<CiTextAlignRight />}
                            onClick={() => handleChangeAlign('right')}
                            className={classNames(cn.button, {
                                [cn.active]: elementFormat === 'right',
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<CiTextAlignJustify />}
                            onClick={() => handleChangeAlign('justify')}
                            className={classNames(cn.button, cn.last, {
                                [cn.active]: elementFormat === 'justify',
                            })}
                        />
                    </div>

                    <div className={cn.group}>
                        <Button
                            type="primary"
                            icon={<CiImageOn />}
                            onClick={handleToolImage}
                            className={classNames(cn.button, cn.first, {
                                [cn.active]: false,
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<CiViewTable />}
                            onClick={handleToolTable}
                            className={classNames(cn.button, {
                                [cn.active]: false,
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<CiYoutube />}
                            onClick={addYTHandler}
                            className={classNames(cn.button, {
                                [cn.active]: false,
                            })}
                        />
                        <Button
                            type="primary"
                            icon={<AiOutlineLink />}
                            onClick={addLinkHandler}
                            className={classNames(cn.button, cn.last, {
                                [cn.active]: false,
                            })}
                        />
                    </div>
                </div>
            </Card>

            {modal}
            {isLink && <EditorLinks editor={editor} onCancel={addLinkHandler} withAnchor={false} />}
            {isYT && <EditorYouTube editor={editor} onCancel={addYTHandler} />}
        </>
    );
};

export default EditorBlankToolbar;
