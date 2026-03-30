import { FC, PropsWithChildren, useCallback } from 'react';
import { useAppDispatch } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { AiFillDelete } from 'react-icons/ai';
import { deleteTemplateKeyWord } from '&/entities/Template/model/services/deleteTemplateKeyWord';
import { TemplateKeyWord } from '&/entities/Template/model/types/TemplateKeyWord';
import cn from './DeleteTemplateKeyWord.module.scss';

interface Props {
    keyWord: TemplateKeyWord;
}

const DeleteTemplateKeyWord: FC<PropsWithChildren<Props>> = (props) => {
    const { keyWord } = props;

    const dispatch = useAppDispatch();
    const removeKeyWordHandler = useCallback(async () => {
        if (keyWord) {
            dispatch(deleteTemplateKeyWord(keyWord));
            dispatch(templatesActions.removeTemplateKeyWord(keyWord));
        }
    }, [dispatch, keyWord]);

    return (
        <div onClick={removeKeyWordHandler} className={cn.row}>
            <AiFillDelete />
            <span>Delete</span>
        </div>
    );
};

export default DeleteTemplateKeyWord;
