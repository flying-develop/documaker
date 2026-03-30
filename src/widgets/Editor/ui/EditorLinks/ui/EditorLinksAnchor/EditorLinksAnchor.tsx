import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import { AiOutlinePushpin } from 'react-icons/ai';
import { INSERT_ANCHOR_COMMAND } from '&/widgets/Editor/plugins/custom/AnchorPlugin/AnchorPlugin';
import { getId } from '&/shared/utils';
import cn from './EditorLinksAnchor.module.scss';

interface Props {
    editor: any;
    onCancel: () => void;
}

const EditorLinksAnchor: FC<Props> = (props) => {
    const { editor, onCancel } = props;
    const [text, setText] = useState('');

    const textHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setText(evt.target.value);
    };

    const createAnchorHandler = useCallback(() => {
        if (editor) {
            editor.dispatchCommand(INSERT_ANCHOR_COMMAND, { text, id: getId() });
            onCancel();
        }
    }, [editor, text, onCancel]);

    return (
        <div className={cn.container}>
            <Input value={text} prefix={<AiOutlinePushpin />} onChange={textHandler} />
            <Button onClick={createAnchorHandler}>Create anchor</Button>
        </div>
    );
};

export default EditorLinksAnchor;
