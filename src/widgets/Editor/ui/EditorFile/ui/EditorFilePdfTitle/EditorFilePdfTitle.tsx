import { ChangeEvent, FC, useCallback } from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { getTemplateEditedSection } from '&/entities/Template/model/selectors/getTemplateEditedSection';
import cn from './EditorFilePdfTitle.module.scss';

const EditorFilePdfTitle: FC = () => {
    const dispatch = useAppDispatch();
    const editedSection = useAppSelector(getTemplateEditedSection);

    const titleHandler = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            dispatch(templatesActions.updateTemplateSection({ pdf_title: evt.target.value }));
        },
        [dispatch],
    );

    return (
        <div>
            <Input
                className={cn.input}
                value={editedSection?.pdf_title}
                onChange={titleHandler}
                autoComplete="off"
                placeholder="PDF title"
            />
        </div>
    );
};

export default EditorFilePdfTitle;
