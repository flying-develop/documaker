import { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import AntDCloseIcon from '&/shared/assets/icons/AntDCloseIcon.svg?react';
import { User } from '&/entities/User/model/types/User';
import { useAppDispatch } from '&/app/providers/Store';
import { fetchUsers } from '&/entities/User/model/services/fetchUsers';
import CreateUser from '../CreateUser/CreateUser';

import cn from './AddUser.module.scss';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const AddUser: FC = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isSuccess, setSuccess] = useState<boolean>(false);
    const [createdUser, setCreatedUser] = useState<User | null>(null);

    const successCreate = (user: User) => {
        setSuccess(true);
        setCreatedUser(user);
    };

    const onClose = () => {
        if (isSuccess && createdUser) {
            dispatch(fetchUsers({}));
        }
        setOpen(false);
        setSuccess(false);
        setCreatedUser(null);
    };

    return (
        <>
            <Button type="primary" size="large" onClick={() => setOpen(true)} className={cn.button}>
                Create User
            </Button>

            <Modal
                width={400}
                title={
                    <div className={cn['user-add-modal-title']}>
                        {!isSuccess && 'New User'}
                        {isSuccess && createdUser && 'User created'}
                    </div>
                }
                classNames={{
                    content: cn['user-add-modal-content'],
                }}
                closeIcon={<AntDCloseIcon />}
                open={isOpen}
                footer={null}
                onCancel={onClose}
                destroyOnClose
            >
                {!isSuccess && <CreateUser successCreate={successCreate} />}
                {isSuccess && createdUser && (
                    <SuccessMessage user={createdUser} onClose={onClose} />
                )}
            </Modal>
        </>
    );
};

export default AddUser;
