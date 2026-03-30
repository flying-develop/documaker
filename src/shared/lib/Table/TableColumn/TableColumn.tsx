import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Avatar, Dropdown, MenuProps, Select, Space } from 'antd';
import { Role } from '&/entities/User/model/types/Role';
import { User } from '&/entities/User/model/types/User';
import { getAvatarInitials } from '&/shared/utils/getAvatarInitials';
import { useAppSelector } from '&/app/providers/Store';
import { getRoles } from '&/entities/User/model/selectors/getRoles';
import { isRoleByName } from '&/shared/utils';
import { Roles } from '&/shared/config/roles/roles';
import { BaseOptionType } from 'antd/es/select';
import TableActionButton from '&/shared/assets/icons/TableActionButton.svg?react';
import classNames from 'classnames';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useProfile } from '&/entities/Profile/hooks/useProfile';

import cn from './TableColumn.module.scss';

interface TableColumnRootProps {}

interface TableColumnUserProps {
    name: string;
    avatar: {
        id: number;
        url: string;
    } | null;
}

interface TableColumnRoleProps {
    values: Role[];
    user: User;
    onChange: (data: Record<string, unknown>) => void
}

interface TableColumnActionProps {
    items: MenuProps['items'];
}

interface TableColumnManagersProps {
    user: User;
    setSelectedUser: (user: User | null) => void;
}

const TableColumnUser: FC<TableColumnUserProps> = ({ name, avatar }) => {
    return (
        <div className={cn['table-cell-user']}>
            {name && !avatar && (
                <Avatar className={cn['table-cell-user-avatar-text']}>
                    {getAvatarInitials(name)}
                </Avatar>
            )}
            {name && avatar && (
                <Avatar className={cn['table-cell-user-avatar-image']} src={avatar.url} />
            )}

            <span className={cn['table-cell-user-avatar-name']}>{name}</span>
        </div>
    );
};

const TableColumnRole: FC<TableColumnRoleProps> = ({ values, user, onChange }) => {
    const { profile, isAdmin, isSuperAdmin, isModerator } = useProfile();
    const roles = useAppSelector(getRoles);
    const [displayRoles, setDisplayRoles] = useState<BaseOptionType[] | null>(null);
    const [defaultRoles, setDefaultRoles] = useState<any | BaseOptionType[] | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (user.roles) {
            const isCurrentUser = user.id === profile?.id;

            if (isSuperAdmin) {
                setDisplayRoles(
                    roles
                        .map(({ name, displayName }: Role) => ({
                            value: name,
                            label: displayName,
                            className: cn['table-roles-item'],
                        }))
                        .filter(({ value }) => value !== Roles.SUPER_ADMIN),
                );

                setDisabled(isCurrentUser || false);
            }

            if (isAdmin) {
                setDisplayRoles(
                    roles.map(({ name, displayName }: Role) => ({
                        value: name,
                        label: displayName,
                    })),
                );

                setDisabled(isCurrentUser || isRoleByName(user.roles, Roles.SUPER_ADMIN));
            }

            if (isModerator) {
                setDisplayRoles(
                    roles
                        .filter(({ name }: Role) =>
                            [Roles.MODERATOR, Roles.USER].includes(name as Roles),
                        )
                        .map(({ name, displayName }: Role) => ({
                            value: name,
                            label: displayName,
                        })),
                );

                setDisabled(
                    isCurrentUser ||
                        isRoleByName(user.roles, [Roles.ADMIN, Roles.MODERATOR, Roles.SUPER_ADMIN]),
                );
            }
        }

        setDefaultRoles(values.map(({ name }: Role) => name));
    }, [
        isAdmin,
        isModerator,
        roles,
        values,
        profile,
        user.roles,
        user.id,
        user.name,
        isSuperAdmin,
    ]);

    const handlerChangeUserRole = (value: string[]) => {
        const selectedRoles = roles
            .filter(({ name }: Role) => value.includes(name))
            .map(({ id }: Role) => id);

        onChange({ id: user.id, roles: selectedRoles });
    };

    return (
        displayRoles &&
        defaultRoles && (
            <Select
                disabled={disabled}
                className={cn['table-roles']}
                popupClassName={cn['table-roles-popup']}
                defaultValue={defaultRoles}
                showSearch={false}
                onChange={handlerChangeUserRole}
                options={displayRoles}
            />
        )
    );
};

const TableColumnAction: FC<TableColumnActionProps> = ({ items }) => {
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    useEffect(() => {
        if (items) {
            setMenuItems(
                items.map((item: ItemType) => {
                    if (item) {
                        const replaceClasses = item?.className?.split(' ').map((item) => {
                            return item === 'danger'
                                ? cn['table-action-dropdown-item-danger']
                                : item;
                        });

                        item.className = classNames(
                            cn['table-action-dropdown-item'],
                            replaceClasses,
                        );
                    }

                    return item;
                }),
            );
        }
    }, [items]);

    return (
        <Dropdown
            menu={{ items: menuItems, rootClassName: cn['table-action-dropdown-menu'] }}
            trigger={['click']}
            rootClassName={cn['table-action-dropdown']}
            overlayClassName="123"
        >
            <Space>
                <div className={cn['table-action-button']}>
                    <TableActionButton />
                </div>
            </Space>
        </Dropdown>
    );
};

const TableColumnRoot: FC<PropsWithChildren & TableColumnRootProps> = ({ children }) => {
    return <>{children}</>;
};

const TableColumnManagers: FC<TableColumnManagersProps> = ({ user, setSelectedUser }) => {
    const { isAdmin, isSuperAdmin } = useProfile();
    const [isUser, setIsUser] = useState(false);
    const [managers, setManagers] = useState<User[] | null>(null);

    const onClick = () => {
        setSelectedUser(user);
    };

    useEffect(() => {
        if (user && user.roles) {
            setIsUser(isRoleByName(user.roles, Roles.USER));
        }
        if (user && user.managers) {
            setManagers(user.managers);
        }
    }, [user]);

    if (isUser && (isAdmin || isSuperAdmin)) {
        if (managers && managers?.length > 1) {
            return (
                <div className={cn['set-manager']} onClick={onClick}>
                    {managers.length} managers
                </div>
            );
        }

        if (managers && managers?.length === 1 && managers[0]?.name) {
            return (
                <div className={cn['set-manager']} onClick={onClick}>
                    {managers[0]?.name}
                </div>
            );
        }

        return (
            <>
                <div className={cn['set-manager-default']} onClick={onClick}>
                    Set manager
                </div>
            </>
        );
    }

    return <></>;
};

const TableColumn = TableColumnRoot as typeof TableColumnRoot & {
    Action: typeof TableColumnAction;
    Manager: typeof TableColumnManagers;
    Role: typeof TableColumnRole;
    User: typeof TableColumnUser;
    Root: typeof TableColumnRoot;
};

TableColumn.Action = TableColumnAction;
TableColumn.Manager = TableColumnManagers;
TableColumn.Role = TableColumnRole;
TableColumn.User = TableColumnUser;
TableColumn.Root = TableColumnRoot;

export default TableColumn;
