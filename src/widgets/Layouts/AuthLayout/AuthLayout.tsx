import { FC, PropsWithChildren, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Metadata } from '&/shared/config/meta/Metadata';
import classNames from 'classnames';
import { Outlet } from 'react-router';

import cn from './AuthLayout.module.scss';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Helmet
                titleTemplate={`${Metadata.TITLE} | %s`}
                defaultTitle={Metadata.TITLE}
                meta={[{ name: 'description', content: Metadata?.DESCRIPTION }]}
            />

            <div className={classNames(cn.layout)}>
                <Suspense fallback="">
                    <div className={cn.main}>
                        <Outlet />
                        {children}
                    </div>
                </Suspense>
            </div>
        </>
    );
};

export default AuthLayout;
