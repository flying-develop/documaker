import { FC, useMemo } from 'react';
import { TemplateStatus } from '&/entities/Template/model/types/TemplateStatus';
import { TemplateCaseStatus } from '&/entities/Template/model/types/TemplateCaseStatus';
import { getStatusTitle } from '&/shared/utils/getStatusTitle';
import cn from './DropdownStatus.module.scss';
import classNames from 'classnames';

interface Props {
    status: TemplateStatus | TemplateCaseStatus;
    selected?: boolean;
}

const DropdownStatus: FC<Props> = (props) => {
    const { status, selected = false } = props;

    const statusTitle = useMemo(() => {
        return getStatusTitle(status);
    }, []);

    return (
        <div
            className={classNames(cn.status, {
                [cn.selected]: selected,
            })}
        >
            <div
                className={classNames(cn.indicator, {
                    [cn.inWork]: status === TemplateStatus.IN_WORK,
                    [cn.ready]: status === TemplateStatus.READY,
                    [cn.done]: status === TemplateCaseStatus.DONE,
                    [cn.moderation]: status === TemplateCaseStatus.MODERATION,
                    [cn.inProgress]: status === TemplateCaseStatus.IN_PROGRESS,
                    [cn.deleted]: status === TemplateCaseStatus.DELETED,
                })}
            />
            <div>{statusTitle}</div>
        </div>
    );
};

export default DropdownStatus;
