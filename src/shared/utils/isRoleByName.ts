import { Role } from '&/entities/Profile/model/types/Role';

export const isRoleByName = (roles: Role[], roleName: string | string[]) => {
    if (typeof roleName === 'string') {
        return roles.some(({ name }) => name === roleName);
    }

    return roles
        .map(({name}) => name)
        .some((item) => roleName.includes(item));
};
