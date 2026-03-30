import { FC } from 'react';
import { NavItem } from '&/shared/types/Nav';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { NavLink } from 'react-router-dom';
import MenuTemplates from '&/shared/assets/icons/MenuTemplates.svg?react';
import MenuCases from '&/shared/assets/icons/MenuCases.svg?react';
import MenuUsers from '&/shared/assets/icons/MenuUsers.svg?react';
import Chip from '&/shared/ui/Chip/Chip';
import classNames from 'classnames';
import { Roles } from '&/shared/config/roles/roles';
import { isRoleByName } from '&/shared/utils';
import { useProfile } from '&/entities/Profile/hooks/useProfile';

import cn from './Menu.module.scss';

const items: NavItem[] = [
    {
        icon: <MenuTemplates />,
        label: 'Templates',
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
        path: AppRoutes.TEMPLATES,
    },
    {
        icon: <MenuCases />,
        label: 'Cases',
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR, Roles.USER],
        path: AppRoutes.CASES,
    },
    {
        icon: <MenuUsers />,
        label: 'Users',
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
        path: AppRoutes.USERS,
    },
];

interface MenuProps {
    className?: string | undefined;
}

const Menu: FC<MenuProps> = ({ className }: MenuProps) => {
    const { profile } = useProfile();

    return (
        <nav className={classNames(className, cn.menu)}>
            <ul className={cn.list}>
                {items.map(
                    (item, idx) =>
                        (profile && profile.roles) &&
                        isRoleByName(profile.roles, item.roles) && (
                            <NavLink
                                key={item.path}
                                to={`../${item.path}`}
                                style={{ width: '100%' }}
                                onClick={(e) => item.disabled && e.preventDefault()}
                            >
                                {({ isActive }) => (
                                    <Chip
                                        classes={{ chip: cn.item, chipActive: cn['item-active'] }}
                                        key={idx}
                                        active={isActive}
                                        title={
                                            <div className={cn['item-wrapper']}>
                                                <div className={cn['item-icon']}>{item.icon}</div>
                                                <div className={cn['item-label']}>{item.label}</div>
                                            </div>
                                        }
                                    />
                                )}
                            </NavLink>
                        ),
                )}
            </ul>
        </nav>
    );
};

export default Menu;
