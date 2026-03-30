import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Segmented } from 'antd';
import { useAppDispatch } from '&/app/providers/Store';
import { templatesActions } from '&/entities/Template/model/slice/templatesSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TemplateCaseStatus } from '&/entities/Template/model/types/TemplateCaseStatus';
import classNames from 'classnames';
import cn from './SearchTemplateByStatus.module.scss';

interface Props {
    statuses: Record<string, string>[];
    isCase?: boolean;
}

const SearchTemplateByStatus: FC<Props> = (props) => {
    const { statuses, isCase } = props;
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<string>('ALL');

    const options = useMemo(() => {
        return [
            { label: 'All', value: 'ALL' },
            ...statuses
                .filter((status) => status.code !== TemplateCaseStatus.DELETED)
                .map((status) => ({
                    label: status.title,
                    value: status.code,
                })),
        ];
    }, [statuses]);

    useEffect(() => {
        if (status === 'ALL') {
            dispatch(templatesActions.deleteTemplateFilter('status'));
        } else {
            dispatch(templatesActions.setTemplateFilter({ status }));
        }
    }, [dispatch, status]);

    return (
        <div
            className={classNames(cn.container, {
                [cn.isCase]: isCase,
            })}
        >
            <div className={cn.segments}>
                <Segmented options={options} value={status} onChange={setStatus} />
            </div>
            {isCase && (
                <Button
                    onClick={() => setStatus(TemplateCaseStatus.DELETED)}
                    type="primary"
                    icon={<FaRegTrashAlt size={20} />}
                    className={cn.button}
                />
            )}
        </div>
    );
};

export default SearchTemplateByStatus;
