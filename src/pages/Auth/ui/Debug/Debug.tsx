import { getIdUser } from '&/entities/Auth/model/selectors/getIdUser';
import { useAuth } from '&/app/providers/auth/ui/AuthProvider';
import { useAppSelector } from '&/app/providers/Store';
import { Button, Input } from 'antd';
import { Services, api, getUrl } from '&/shared/api';
import { useState } from 'react';

const userDataCheck = {
    // id: 27,
    email: 'maslakov@rosogroup.ru',
    password: '123456',
    confirmPassword: '123456',
    phone: '+79969462052',
    name: 'Paul Maslakov',
};

const Debug = () => {
    const idUser = useAppSelector(getIdUser);
    const { isAuth, checkLogin, login, logout, register, forgot, reset } = useAuth();
    const [token, setToken] = useState('99c4375a81df7c87ce8e3e4cdda796807cecaf5f4d1cdf51cb3b5a59bce3340a');
    const newPassword = '123456';

    const onClickCheckLogin = () => {
        checkLogin({ login: userDataCheck.email });
    };

    const onClickLogin = () => {
        if (idUser) {
            login({ id: idUser, password: userDataCheck.password });
        }
    };

    const onClickLogout = () => {
        logout();
    };

    const onClickLoadProfile = async () => {
        const data = await api.get(getUrl({ service: Services.PROFILE, endpoint: '' }));
        // eslint-disable-next-line no-console
        console.log(data);
    };

    const onClickRegister = () => {
        register(userDataCheck);
    };

    const onClickForgot = () => {
        forgot({ email: userDataCheck.email });
    };

    const onClickReset = () => {
        reset({ email: userDataCheck.email, token, password: newPassword, confirmPassword: newPassword });
    };

    return (
        <div>
            {isAuth ? (
                <>
                    <Button type="primary" onClick={onClickLoadProfile}>
                        Load profile
                    </Button>
                    <Button type="primary" onClick={onClickLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button type="primary" onClick={onClickCheckLogin}>
                        CheckLogin
                    </Button>

                    <Button type="primary" onClick={onClickLogin}>
                        Login
                    </Button>

                    <Button type="primary" onClick={onClickRegister}>
                        Register
                    </Button>
                    <Button type="primary" onClick={onClickForgot}>
                        Forgot
                    </Button>
                    <Input
                        addonBefore="Insert token from email reset password"
                        value={token}
                        onChange={({ target }) => setToken(target.value)}
                    />
                    <Button type="primary" onClick={onClickReset}>
                        Reset
                    </Button>
                </>
            )}
        </div>
    );
};

export default Debug;
