import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import BlockPage from '&/shared/ui/BlockPage/BlockPage';
import { TableUsers } from '&/widgets/Users';
import { Helmet } from 'react-helmet';
import BaseNav from '&/widgets/Layouts/BaseNav/BaseNav';
import { getLoading } from '&/entities/User/model/selectors/getLoading';
import { AddUser } from '&/features/User';
import SetManager from '&/features/User/SetManager/SetManager';
import { User } from '&/entities/User/model/types/User';
import SearchUser from '&/features/User/SearchUser/SearchUser';
import { usersActions } from '&/entities/User/model/slice/usersSlice';

import cn from './Users.module.scss';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(getLoading);
    const title = 'Users';
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect((): any => {
        return () => dispatch(usersActions.resetTemplateFilters());
    }, [dispatch]);

    return (
        <>
            <Helmet title={title} />
            <BaseNav>
                <div className={cn.header}>
                    <SearchUser />
                    <AddUser />
                </div>
                <TableUsers setSelectedUser={setSelectedUser}/>

                {selectedUser && <SetManager user={selectedUser} setSelectedUser={setSelectedUser} />}
            </BaseNav>
            {loading && <BlockPage />}
        </>
    );
};

export default Users;
