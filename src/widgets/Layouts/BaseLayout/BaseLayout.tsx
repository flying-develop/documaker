import classNames from 'classnames';
import { FC, PropsWithChildren, Suspense, useContext, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';
import { Metadata } from '&/shared/config/meta/Metadata';
import HeaderLogo from '&/shared/assets/icons/HeaderLogo.svg';
import { HeaderContextProps, HeaderContext } from '&/app/providers/Header/HeaderProvider';
import { HeaderProfile } from '&/widgets/Profile';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { getOrientation } from '&/shared/utils/getOrientation';
import { useMediaQueries } from '@react-hook/media-query';
import Blockage from '&/shared/ui/Blockage/Blockage';

import cn from './BaseLayout.module.scss';

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isShow } = useContext<HeaderContextProps>(HeaderContext);
    const [isBlockage, setIsBlockage] = useState<boolean>(false);

    const { matchesAll } = useMediaQueries({
        screen: 'screen',
        width: '(min-width: 1024px)',
    });

    useLayoutEffect(() => {
        setIsBlockage(isMobileOnly || (getOrientation() === 'portrait' && isTablet) || !matchesAll);
    }, [matchesAll]);

    return (
        <>
            <Helmet
                titleTemplate={`${Metadata.TITLE} | %s`}
                defaultTitle={Metadata.TITLE}
                meta={[{ name: 'description', content: Metadata?.DESCRIPTION }]}
            />

            <div className={classNames(cn.layout)}>
                <Suspense fallback="">
                    {isBlockage && <Blockage />}

                    {!isBlockage && (
                        <>
                            {isShow && (
                                <header className={cn.header}>
                                    <Link to="/" className={cn['header-logo']}>
                                        <img src={HeaderLogo} alt="" />
                                    </Link>

                                    <div className={cn['header-pofile']}>
                                        <HeaderProfile />
                                    </div>
                                </header>
                            )}
                            <main className={cn.main}>
                                <Outlet />
                                {children}
                            </main>
                        </>
                    )}
                </Suspense>
            </div>
        </>
    );
};

export default BaseLayout;
