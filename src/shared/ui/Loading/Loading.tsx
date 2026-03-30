import {FC} from "react";
import {Spin} from "antd";
import cn from './Loading.module.scss';

const Loading:FC = () => {
    return (
        <div className={cn.loading}>
            <Spin size="large"/>
        </div>
    );
};

export default Loading;