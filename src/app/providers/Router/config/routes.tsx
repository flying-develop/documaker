import { RouteObject } from 'react-router-dom';

import { CasesId, Templates, TemplatesId, TemplatesIdBlank, Users } from '&/pages';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Forgot, Login, Register, Reset } from '&/pages/Auth';
import Debug from '&/pages/Auth/ui/Debug/Debug';
import { Roles } from '&/shared/config/roles/roles';
import { CasesPage } from '&/pages';
import CasesIdBlank from '&/pages/Cases/ui/CasesIdBlank/CasesIdBlank';

export type RouteProps = RouteObject & {
    path?: AppRoutes | `${AppRoutes}/${string}`;
    roles?: string[];
    group?: string[];
};

export const routes: RouteProps[] = [
    {
        path: AppRoutes.TEMPLATES,
        element: <Templates />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
    },
    {
        path: `${AppRoutes.TEMPLATES}/:id`,
        element: <TemplatesId />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
    },
    {
        path: `${AppRoutes.TEMPLATES}/:id/blank`,
        element: <TemplatesIdBlank />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
    },
    {
        path: AppRoutes.CASES,
        element: <CasesPage />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR, Roles.USER],
    },
    {
        path: `${AppRoutes.CASES}/:id`,
        element: <CasesId />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR, Roles.USER],
    },
    {
        path: `${AppRoutes.CASES}/:id/blank`,
        element: <CasesIdBlank />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
    },
    {
        path: AppRoutes.USERS,
        element: <Users />,
        roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MODERATOR],
    },
];

export const authRoutes: RouteProps[] = [
    { path: AppRoutes.LOGIN, element: <Login /> },
    { path: AppRoutes.REGISTER, element: <Register /> },
    { path: AppRoutes.RESET, element: <Reset /> },
    { path: AppRoutes.FORGOT, element: <Forgot /> },
    { path: AppRoutes.DEBUG, element: <Debug /> },
];
