import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { HomePage, NotFoundPage } from '&/pages';
import { BaseLayout } from '&/widgets/Layouts';
import AuthLayout from '&/widgets/Layouts/AuthLayout/AuthLayout';
import { Roles } from '&/shared/config/roles/roles';
import ProtectedRoute from './ProtectedRoute';
import { authRoutes, routes } from './routes';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path={AppRoutes.HOME}
                element={<BaseLayout />}
                errorElement={
                    <BaseLayout>
                        <div>Error!</div>
                    </BaseLayout>
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            roles={[Roles.ADMIN, Roles.MODERATOR, Roles.SUPER_ADMIN, Roles.USER]}
                        >
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                {routes.map(({ path, element, roles }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            !!roles ? (
                                <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
                            ) : (
                                element
                            )
                        }
                    />
                ))}
                <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
            </Route>
            <Route
                path={AppRoutes.AUTH}
                element={<AuthLayout />}
                errorElement={
                    <AuthLayout>
                        <div>Error!</div>
                    </AuthLayout>
                }
            >
                <Route index element={<Navigate to={AppRoutes.LOGIN} replace />} />
                {authRoutes.map(({ path, element, roles }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            !!roles ? (
                                <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
                            ) : (
                                element
                            )
                        }
                    />
                ))}
                <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
            </Route>
        </>,
    ),
);
