import IconDesktop from '&/shared/assets/icons/IconDesktop.svg?react';
import cn from './Blockage.module.scss';

const Blockage = () => {
    return (
        <div className={cn.blockage}>
            <IconDesktop />
            <div className={cn.message}>This web app only works on the desktop</div>
        </div>
    );
};

export default Blockage;
