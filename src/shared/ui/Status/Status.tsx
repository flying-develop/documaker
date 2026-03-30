import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import cn from './Status.module.scss';
import { TemplateStatus } from '&/entities/Template/model/types/TemplateStatus';
import { TemplateCaseStatus } from '&/entities/Template/model/types/TemplateCaseStatus';

interface StatusProps {
    status?: TemplateStatus | TemplateCaseStatus;
}

const Status: FC<PropsWithChildren<StatusProps>> = (props) => {
    const { status, children } = props;
    return (
        <div
            className={classNames(cn.status, {
                [cn.ready]: status === TemplateStatus.READY,
                [cn.inWork]: status === TemplateStatus.IN_WORK,

                [cn.done]: status === TemplateCaseStatus.DONE,
                [cn.moderation]: status === TemplateCaseStatus.MODERATION,
                [cn.inProgress]: status === TemplateCaseStatus.IN_PROGRESS,
                [cn.deleted]: status === TemplateCaseStatus.DELETED,
            })}
        >
            {children}
        </div>
    );
};

export default Status;
