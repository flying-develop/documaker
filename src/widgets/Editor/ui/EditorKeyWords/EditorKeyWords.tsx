import { FC, useCallback } from 'react';
import { List, Modal } from 'antd';
import { useAppSelector } from '&/app/providers/Store';
import { getTemplateKeyWords } from '&/entities/Template/model/selectors/getTemplateKeyWords';
import Chip from '&/shared/ui/Chip/Chip';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';
import { getId } from '&/shared/utils';
import { INSERT_KEY_WORD_COMMAND } from '&/widgets/Editor/plugins/custom/KeyWordPlugin/KeyWordPlugin';
import cn from './EditorKeyWords.module.scss';

interface Props {
    editor: any;
    onCancel: () => void;
}

const EditorKeyWords: FC<Props> = (props) => {
    const { onCancel, editor } = props;
    const keyWords = useAppSelector(getTemplateKeyWords);

    const createKeyWordHandler = useCallback(
        (keyWord: TemplateKeyWord) => () => {
            if (editor && keyWord?.code) {
                editor.dispatchCommand(INSERT_KEY_WORD_COMMAND, {
                    text: `{{${keyWord.code}}}`,
                    id: getId(),
                });
                onCancel();
            }
        },
        [editor, onCancel],
    );

    return (
        <Modal title="Insert Key Word" open onCancel={onCancel} footer={null}>
            <List className={cn.list}>
                {keyWords.map((keyWord) => {
                    return (
                        <List.Item key={keyWord.id}>
                            <Chip
                                onClick={createKeyWordHandler(keyWord)}
                                key={keyWord.id}
                                title={keyWord.code}
                            />
                        </List.Item>
                    );
                })}
            </List>
        </Modal>
    );
};

export default EditorKeyWords;
