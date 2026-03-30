import { ChangeEvent, FC } from 'react';
import { Input } from 'antd';
import { Tag } from '&/entities/Tag/model/types/Tag';
import cn from './EditorTagTitle.module.scss';

interface BlankTagInputProps {
    tag: Tag;
    onChange: (value: number | string) => void;
}

const EditorTagTitle: FC<BlankTagInputProps> = (props) => {
    const { tag, onChange } = props;

    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
    };

    return (
        <Input
            className={cn.input}
            value={tag?.title}
            onChange={changeHandler}
            autoComplete="off"
        />
    );
};

export default EditorTagTitle;
