import { Ref, RefObject } from 'react';
import { ChangeEvent, forwardRef } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import cn from './AnchorEditor.module.scss';

type BaseEquationEditorProps = {
    anchor: string;
    setAnchor: (text: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
};

function AnchorEditor(
    { anchor, setAnchor, onDelete, onSubmit }: BaseEquationEditorProps,
    forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
): JSX.Element {
    const onChange = (event: ChangeEvent) => {
        setAnchor((event.target as HTMLInputElement).value);
    };

    return (
        <span className={cn.editor}>
            <Input
                // @ts-ignore
                ref={forwardedRef as RefObject<HTMLInputElement>}
                value={anchor}
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

export default forwardRef(AnchorEditor);
