import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { User } from '&/entities/User/model/types/User';
import TableColumn from '&/shared/lib/Table/TableColumn/TableColumn';
import { getTemplateFilters } from '&/entities/Template/model/selectors/getTemplateFilters';
import cn from './SearchTemplateByUser.module.scss';

interface Props {
    user: User;
}
const SearchTemplateByUser: FC<Props> = (props) => {
    const { user } = props;
    const dispatch = useAppDispatch();
    const filters = useAppSelector(getTemplateFilters);

    const userSearchHandler = useCallback(() => {
        if (filters?.user) {
            dispatch(templatesActions.deleteTemplateFilter('user'));
        } else {
            dispatch(templatesActions.setTemplateFilter({ user: user.id?.toString() }));
        }
    }, [dispatch, filters, user]);

    return (
        <div onClick={userSearchHandler} className={cn.container}>
            <TableColumn.User avatar={user?.avatar ?? null} name={user?.name ?? '-'} />
        </div>
    );
};

export default SearchTemplateByUser;
