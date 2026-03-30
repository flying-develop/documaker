import { User } from '&/entities/User/model/types/User';
import { FC } from 'react';
import { Button } from 'antd';

import cn from './SuccessMessage.module.scss';

interface SuccessMessageProps {
    user: User;
    onClose: () => void
}

const SuccessMessage: FC<SuccessMessageProps> = ({ user, onClose }) => {
    return (
        <>
            <div className={cn.message}>Password sent to {user.email}</div>
            <Button type="default" size="large" className={cn.button} onClick={onClose}>
                Done
            </Button>
        </>
    );
};

export default SuccessMessage;
