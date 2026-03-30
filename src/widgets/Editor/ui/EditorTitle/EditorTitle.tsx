import { ChangeEvent, FC, useCallback } from 'react';
import { Input } from 'antd';
import { TemplateSection } from '&/entities/Template/model/types/TemplateSection';
import { useAppDispatch } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import cn from './EditorTitle.module.scss';

interface TitleProps {
    section: TemplateSection;
}

const EditorTitle: FC<TitleProps> = ({ section }) => {
    const dispatch = useAppDispatch();

    const titleHandler = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch(templatesActions.updateTemplateSection({ title: evt.target.value }));
        },
        [dispatch],
    );

    return (
        <Input
            className={cn.input}
            value={section?.title}
            onChange={titleHandler}
            autoComplete="off"
        />
    );
};

export default EditorTitle;
