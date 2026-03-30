import useUsers from '&/entities/User/hooks/useUsers';
import { TableRegister } from '&/shared/lib/Table';
import { FC } from 'react';
import EditUser from '&/features/User/EditUser/EditUser';
import { Modal } from 'antd';
import AntDCloseIcon from '&/shared/assets/icons/AntDCloseIcon.svg?react';
import { User } from '&/entities/User/model/types/User';

import cn from './TableUsers.module.scss';

interface TableUsersProps {
    setSelectedUser: (user: User | null) => void
}

const TableUsers: FC<TableUsersProps> = ({ setSelectedUser }) => {
    const {
        data,
        columns,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
        user,
        isOpenUserEdit,
        setUser,
        setIsOpenUserEdit,
        handleClickAcceptEdit
    } = useUsers({ setSelectedUser });

    const handleOnCancelModalEditUser = () => {
        setUser(null);
        setIsOpenUserEdit(false);
    };

    return (
        <div>
            <TableRegister
                columns={columns}
                data={data}
                sorting={sorting}
                setSorting={setSorting}
                pagination={pagination}
                setPagination={setPagination}
                paginationData={paginationData}
                classes={{
                    row: cn['table-row'],
                    col: cn['table-col'],
                    columns: {
                        id: cn['table-col-id'],
                        name: cn['table-col-name'],
                        email: cn['table-col-email'],
                        phone: cn['table-col-phone'],
                        last_active_at: cn['table-col-last_active_at'],
                        roles: cn['table-col-roles'],
                        managers: cn['table-col-managers'],
                        action: cn['table-col-action'],
                    },
                }}
            />

            {user && (
                <Modal
                    width={400}
                    title={<div>Edit User</div>}
                    closeIcon={<AntDCloseIcon />}
                    open={isOpenUserEdit}
                    footer={null}
                    onCancel={handleOnCancelModalEditUser}
                    destroyOnClose
                >
                    <EditUser user={user} onAccept={handleClickAcceptEdit} onClose={handleOnCancelModalEditUser} />
                </Modal>
            )}
        </div>
    );
};

export default TableUsers;
