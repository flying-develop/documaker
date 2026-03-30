import { FC, useMemo } from 'react';
import { Template } from '&/entities/Template/model/types/Template';
import Status from '&/shared/ui/Status/Status';
import { Dropdown, MenuProps } from 'antd';
import { getStatusTitle } from '&/shared/utils/getStatusTitle';
import { TemplateStatuses } from '&/entities/Template/model/types/TemplateStatus';
import DropdownStatus from '&/features/Template/SetTemplateStatus/ui/DropdownStatus/DropdownStatus';
import { TemplateCaseStatuses } from '&/entities/Template/model/types/TemplateCaseStatus';
import { useAppDispatch } from '&/app/providers/Store';
import { setTemplateStatus } from '&/entities/Template/model/services/setTemplateStatus';
import { setTemplateCaseStatus } from '&/entities/Template/model/services/setTemplateCaseStatus';
import cn from './SetTemplateStatus.module.scss';

interface Props {
    template: Template;
    isCase?: boolean;
}

const SetTemplateStatus: FC<Props> = (props) => {
    const { template, isCase } = props;
    const dispatch = useAppDispatch();
    const statusTitle = useMemo(() => {
        return getStatusTitle(template.status) || 'NEW';
    }, [template]);

    const items: MenuProps['items'] = useMemo(() => {
        const statuses = isCase ? TemplateCaseStatuses : TemplateStatuses;
        return statuses.map((status) => {
            return {
                key: status.code,
                label: (
                    <DropdownStatus
                        status={status.code}
                        selected={template.status === status.code}
                    />
                ),
                onClick: () => {
                    if (template?.id) {
                        dispatch(
                            isCase
                                ? setTemplateCaseStatus({ id: template.id, status: status.code })
                                : setTemplateStatus({ id: template.id, status: status.code }),
                        );
                    }
                },
                disabled: template.status === status.code,
            };
        });
    }, [dispatch, isCase, template]);
    return (
        <>
            <Dropdown
                className={cn.dropdown}
                menu={{ items }}
                placement="bottomLeft"
                trigger={['click']}
            >
                <div className={cn.button}>
                    <Status status={template.status}>{statusTitle}</Status>
                </div>
            </Dropdown>
        </>
    );
};

export default SetTemplateStatus;
