import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { createColumnHelper, PaginationState, SortingState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import calendar from 'dayjs/plugin/calendar';
import TableColumn from '&/shared/lib/Table/TableColumn/TableColumn';
import { Link } from 'react-router-dom';
import { MenuProps } from 'antd';
import UserBlock from '&/shared/assets/icons/UserBlock.svg?react';
import Edit from '&/shared/assets/icons/Edit.svg?react';
import Trash from '&/shared/assets/icons/Trash.svg?react';
import { getUsers } from '../model/selectors/getUsers';
import { User } from '../model/types/User';
import { fetchRoles } from '../model/services/fetchRoles';
import { fetchUsers } from '../model/services/fetchUsers';
import { Role } from '../model/types/Role';
import { getPagination } from '../model/selectors/getPagination';
import { blockUser } from '../model/services/blockUser';
import { deleteUser } from '../model/services/deleteUser';
import { editUser } from '../model/services/editUser';
import { getUserFilters } from '../model/selectors/getUserFilters';
import { fetchUpdateUserById } from '../model/services/fetchUpdateUserById';

const useUsers = ({ setSelectedUser }: { setSelectedUser: (user: User | null) => void }) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(getUsers);
    const paginationMeta = useAppSelector(getPagination);
    const filters = useAppSelector(getUserFilters);
    const [paginationData, setPaginationData] = useState({ total: 0, current: 0, pageSize: 0 });
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: paginationData.current,
        pageSize: paginationData.pageSize,
    });
    const [isOpenUserEdit, setIsOpenUserEdit] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setPaginationData({
            total: paginationMeta.total,
            current: paginationMeta.current,
            pageSize: paginationMeta.pageSize,
        });
    }, [paginationMeta]);

    useEffect(() => {
        dispatch(
            fetchUsers({
                dir: sorting[0].desc ? 'desc' : 'asc',
                sort: sorting[0].id,
                page: pagination.pageIndex,
                ...filters
            }),
        ).then(() => {
            dispatch(fetchRoles({}));
        });
    }, [dispatch, sorting, pagination.pageIndex, filters]);

    dayjs.extend(calendar);

    const columnHelper = createColumnHelper<User & { action: any }>();

    const handleClickBlock = useCallback(
        (data: User) => {
            dispatch(blockUser(data.id)).then(() => {
                dispatch(
                    fetchUsers({
                        dir: sorting[0].desc ? 'desc' : 'asc',
                        sort: sorting[0].id,
                        page: pagination.pageIndex,
                        ...filters
                    }),
                );
            });
        },
        [dispatch, pagination.pageIndex, sorting, filters],
    );

    const handleClickAcceptEdit = useCallback(
        (data: User) => {
            if (user) {
                dispatch(
                    editUser({
                        ...data,
                        id: user.id,
                    }),
                ).then(() => {
                    dispatch(
                        fetchUsers({
                            dir: sorting[0].desc ? 'desc' : 'asc',
                            sort: sorting[0].id,
                            page: pagination.pageIndex,
                            ...filters
                        }),
                    );
                });
            }
        },
        [dispatch, pagination.pageIndex, sorting, user, filters],
    );

    const handleClickRemove = useCallback(
        (data: User) => {
            dispatch(deleteUser(data.id)).then(() => {
                dispatch(
                    fetchUsers({
                        dir: sorting[0].desc ? 'desc' : 'asc',
                        sort: sorting[0].id,
                        page: pagination.pageIndex,
                        ...filters
                    }),
                );
            });
        },
        [dispatch, pagination.pageIndex, sorting, filters],
    );

    const handleChangeUserRole = useCallback((data: Record<string, unknown>) => {
        dispatch(fetchUpdateUserById(data)).then(() => {
            dispatch(
                fetchUsers({
                    dir: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    page: pagination.pageIndex,
                    ...filters
                }),
            );
        });
    }, [dispatch, filters, pagination.pageIndex, sorting]);

    const handleClickEdit = (data: User) => {
        setUser(data);
        setIsOpenUserEdit(true);
    };

    const columns = [
        columnHelper.accessor('id', {
            header: () => <>ID</>,
            cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => <>Name</>,
            cell: (prop) => (
                <TableColumn.User avatar={prop.cell.row.original.avatar} name={prop.getValue()} />
            ),
        }),
        columnHelper.accessor('email', {
            header: () => <>E-mail</>,
            cell: (prop) => (
                <TableColumn.Root>
                    <Link to={`mailto:${prop.getValue()}`}>{prop.getValue()}</Link>
                </TableColumn.Root>
            ),
        }),
        columnHelper.accessor('phone', {
            header: () => <>Phone</>,
            cell: (prop) => (
                <TableColumn.Root>
                    <Link to={`tel:${prop.getValue()}`}>{prop.getValue()}</Link>
                </TableColumn.Root>
            ),
        }),
        columnHelper.accessor('last_active_at', {
            header: () => <>Last active</>,
            cell: (prop) => {
                const activeDate = dayjs(prop.getValue());

                return prop.getValue() && dayjs().calendar(activeDate);
            },
        }),
        columnHelper.accessor('roles', {
            header: () => <>Role</>,
            cell: (prop) => {
                return (
                    <TableColumn.Role user={prop.row.original} onChange={handleChangeUserRole} values={prop.getValue() as Role[]} />
                );
            },
        }),
        columnHelper.accessor('managers', {
            header: () => <>Manager</>,
            cell: (prop) => {
                return (
                    <TableColumn.Manager
                        user={prop.row.original}
                        setSelectedUser={setSelectedUser}
                    />
                );
            },
        }),
        columnHelper.accessor('action', {
            header: () => <></>,
            cell: (prop) => {
                const items: MenuProps['items'] = [
                    {
                        icon: <UserBlock />,
                        label: 'Block user',
                        key: 0,
                        onClick: () => handleClickBlock(prop.row.original),
                    },
                    {
                        icon: <Edit />,
                        label: 'Edit',
                        key: 1,
                        onClick: () => handleClickEdit(prop.row.original),
                    },
                    {
                        icon: <Trash />,
                        label: 'Delete',
                        key: 2,
                        className: 'danger',
                        onClick: () => handleClickRemove(prop.row.original),
                    },
                ];
                return <TableColumn.Action items={items} />;
            },
        }),
    ];

    const data = useMemo(() => [...users], [users]);

    return {
        columns,
        data,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
        user,
        setUser,
        handleClickAcceptEdit,
        isOpenUserEdit,
        setIsOpenUserEdit,
    };
};

export default useUsers;
