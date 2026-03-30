import {FC} from "react";
import {Spin} from 'antd';
import cn from './BlockPage.module.scss';

const BlockPage: FC = () => {
    return (
        <div className={cn.layout}>
            <Spin size="large"/>
        </div>
    );
};

export default BlockPage;
