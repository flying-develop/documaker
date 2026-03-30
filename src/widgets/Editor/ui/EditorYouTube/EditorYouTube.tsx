import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, InputRef, Modal } from 'antd';
import { INSERT_YOUTUBE_COMMAND } from '../../plugins/custom/YouTubePlugin';
import cn from './EditorYouTube.module.scss';
import { CiYoutube } from 'react-icons/ci';

interface Props {
    editor: any;
    onCancel: () => void;
}

const parseUrl = async (url: string) => {
    const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

    const id = match?.[2].length === 11 ? match[2] : null;
    return id || null;
};

const EditorYouTube: FC<Props> = (props) => {
    const { editor, onCancel } = props;
    const ref = useRef<InputRef>(null);
    const [text, setText] = useState('');

    const textHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        setText(evt.target.value);
    };

    const createYTHandler = useCallback(async () => {
        if (editor) {
            const id = await parseUrl(text);
            if (id) {
                editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, id);
                onCancel();
            }
        }
    }, [editor, onCancel, text]);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <Modal title="Insert video" open onCancel={onCancel} footer={null}>
            <div className={cn.container}>
                <Input ref={ref} value={text} prefix={<CiYoutube />} onChange={textHandler} />
                <Button onClick={createYTHandler}>Add video</Button>
            </div>
        </Modal>
    );
};

export default EditorYouTube;
