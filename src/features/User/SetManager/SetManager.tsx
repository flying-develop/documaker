import AntDCloseIcon from '&/shared/assets/icons/AntDCloseIcon.svg?react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Avatar, Checkbox, Input, Modal, Button, CheckboxProps, Pagination } from 'antd';
import { api, combineUrl, Services } from '&/shared/api';
import { User } from '&/entities/User/model/types/User';
import classNames from 'classnames';
import { getAvatarInitials } from '&/shared/utils/getAvatarInitials';
import { useAppDispatch } from '&/app/providers/Store';
import { useNavigate } from 'react-router';
import { changeUserManagers } from '&/entities/User/model/services/changeUserManagers';

import cn from './SetManager.module.scss';

interface SetManagerProps {
    user: User;
    setSelectedUser: (user: User | null) => void
}

const SetManager: FC<SetManagerProps> = ({ user, setSelectedUser }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [users, setUsers] = useState<User[]>();
    const [total, setTotal] = useState<number>(0);
    const [selected, setSelected] = useState<number[]>(user && user.managers ? user?.managers.map(({ id }) => id) : []);
    const dispatch = useAppDispatch();

    const onSelected: CheckboxProps['onChange'] = ({ target }) => {
        const { value, checked } = target;
        if (checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((item) => item !== value));
        }
    };

    const getUsers = useCallback(async () => {
        try {
            const url = combineUrl({
                endpoint: Services.USERS,
                params: {
                    search,
                    perpage: 8,
                },
            });
            const { data } = await api.get(`${url}&role[]=2&role[]=3`);

            setUsers(data.data);
            setTotal(data.total);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }, [search]);

    const onSearch = () => {
        if (search && search.length > 3) getUsers();
    };
    useDebounce(onSearch, 300, [search]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const onClose = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    const onDone = () => {
        dispatch(changeUserManagers({
            id: user.id,
            managers: selected
        })).then(() => {
            setIsOpen(true);
            setSelectedUser(null);
            navigate(0);
        });

    }

    const handleChangePagination = async (page: number) => {
        try {
            const url = combineUrl({
                endpoint: Services.USERS,
                params: {
                    search,
                    page,
                    perpage: 8,
                },
            });
            const { data } = await api.get(`${url}&role[]=2&role[]=3`);

            setUsers(data.data);
            setTotal(data.total);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }

    return (
        <Modal
            width={800}
            title={<div className={cn['modal-title']}>Set manager</div>}
            className={cn.modal}
            classNames={{
                content: cn['modal-content'],
            }}
            closeIcon={<AntDCloseIcon />}
            open={isOpen}
            footer={null}
            onCancel={onClose}
            destroyOnClose
        >
            <div>
                <Input
                    className={cn.search}
                    onChange={({ currentTarget }) => {
                        const { value } = currentTarget;
                        setSearch(value);
                    }}
                />
            </div>

            <div className={cn.content}>
                <ul className={cn.list}>
                    {users &&
                        users.map(({ id, name, avatar, email }) => {
                            return (
                                <li className={cn['list-item']} key={id}>
                                    <div
                                        className={classNames(
                                            cn['list-item-col'],
                                            cn['list-item-user'],
                                        )}
                                    >
                                        {name && !avatar && (
                                            <Avatar className={cn['list-item-user-avatar-text']}>
                                                {getAvatarInitials(name)}
                                            </Avatar>
                                        )}
                                        {name && avatar && (
                                            <Avatar
                                                className={cn['list-item-user-avatar-image']}
                                                src={avatar.url}
                                            />
                                        )}

                                        <span className={cn['list-item-user-avatar-name']}>
                                            {name}
                                        </span>
                                    </div>
                                    <div
                                        className={classNames(
                                            cn['list-item-col'],
                                            cn['list-item-avatar'],
                                        )}
                                    >
                                        {email}
                                    </div>
                                    <div className={cn['list-item-choice']}>
                                        <Checkbox
                                            checked={selected.includes(id)}
                                            value={id}
                                            onChange={onSelected}
                                            className={cn.checkbox}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                </ul>

                <Pagination
                    pageSize={8}
                    total={total}
                    onChange={handleChangePagination}
                    hideOnSinglePage
                />

                <Button type="primary" size="large" className={cn.button} onClick={onDone}>
                    Done
                </Button>
            </div>
        </Modal>
    );
};

export default SetManager;
