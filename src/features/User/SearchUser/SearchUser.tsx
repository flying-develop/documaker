import { FC, useState } from 'react';
import { Input } from 'antd';
import { useDebounce } from 'react-use';
import { useAppDispatch } from '&/app/providers/Store';
import { usersActions } from '&/entities/User/model/slice/usersSlice';
// import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import cn from './SearchUser.module.scss';

const SearchUser: FC = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>('');

    useDebounce(
        () => {
            if (search) {
                if (search.length > 2) {
                    dispatch(usersActions.setUserFilter({ search }));
                }
            } else {
                dispatch(usersActions.deleteUserFilter('search'));
            }
        },
        300,
        [dispatch, search],
    );

    return (
        <div>
            <Input
                type="search"
                value={search}
                placeholder="Search"
                className={cn.search}
                onInput={({ currentTarget }) => {
                    setSearch(currentTarget.value);
                }}
            />
        </div>
    );
};

export default SearchUser;
