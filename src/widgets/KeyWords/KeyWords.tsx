import { FC, useEffect } from 'react';
import { Card, Typography } from 'antd';
import KeyWordsList from '&/widgets/KeyWords/ui/KeyWordsList/KeyWordsList';
import { useAppDispatch } from '&/app/providers/Store';
import { fetchTemplateKeyWords } from '&/entities/Template/model/services/fetchTemplateKeyWords';
import cn from './KeyWords.module.scss';

const KeyWords: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTemplateKeyWords());
    }, []);
    return (
        <Card styles={{ body: { padding: 0 } }}>
            <div className={cn.container}>
                <Typography.Title level={5}>Keys</Typography.Title>
                <KeyWordsList />
            </div>
        </Card>
    );
};

export default KeyWords;
