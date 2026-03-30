import { FC } from 'react';
import LogoWhite from '&/shared/assets/icons/LogoWhite.svg';
import LoginProvider from '../../config/LoginProvider';

import sn from './style.module.scss';

interface AuthProps {
    children?: JSX.Element;
    title?: string;
}

const withAuth = (Component: FC<AuthProps>) => {
    return function withAuthComponent(props: AuthProps): JSX.Element {
        return (
            <div className={sn.auth}>
                <div className={sn['auth-column']}>
                    <div className={sn['auth-logo']}>
                        <img src={LogoWhite} alt="" />
                    </div>

                    <div className={sn['auth-box']}>
                        <div className={sn['auth-title']}>{props.title}</div>

                        <div className={sn['auth-content']}>
                            <LoginProvider>
                                <Component {...props} />
                            </LoginProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default withAuth;
