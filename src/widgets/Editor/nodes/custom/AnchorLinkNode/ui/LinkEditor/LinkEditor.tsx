import { Ref, RefObject } from 'react';
import { ChangeEvent, forwardRef } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import cn from './LinkEditor.module.scss';

type BaseEquationEditorProps = {
    link: string;
    setLink: (text: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
};

function LinkEditor(
    { link, setLink, onDelete, onSubmit }: BaseEquationEditorProps,
    forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
): JSX.Element {
    const onChange = (event: ChangeEvent) => {
        setLink((event.target as HTMLInputElement).value);
    };

    return (
        <span className={cn.editor}>
            <Input
                // @ts-ignore
                ref={forwardedRef as RefObject<HTMLInputElement>}
                value={link}
                onChange={onChange}
                autoFocus
            />
            <Button
                type="primary"
                icon={<AiOutlineCheck />}
                className={cn.button}
                onMouseDown={(event) => event.preventDefault()}
                onClick={onSubmit}
            />
            <Button
                type="primary"
                icon={<AiOutlineDelete />}
                className={cn.button}
                onMouseDown={(event) => event.preventDefault()}
                onClick={onDelete}
            />
        </span>
    );
}

export default forwardRef(LinkEditor);
