import { FC, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Tag } from '&/entities/Tag/model/types/Tag';
import { useAppDispatch } from '&/app/providers/Store';
import { deleteTag } from '&/entities/Tag/model/services/deleteTag';
import cn from './DeleteTag.module.scss';

interface DeleteTagProps {
    tag?: Tag;
}

const DeleteTag: FC<DeleteTagProps> = (props) => {
    const { tag } = props;
    const dispatch = useAppDispatch();
    const deleteTagHandler = useCallback(() => {
        if (tag) {
            dispatch(deleteTag(tag));
        }
    }, [dispatch, tag]);
    return (
        <div onClick={deleteTagHandler} className={cn.row}>
            <AiFillDelete />
            <span>Delete</span>
        </div>
    );
};

export default DeleteTag;
