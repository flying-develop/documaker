import useTemplates from '&/entities/Template/hooks/useTemplates';
import { TableRegister } from '&/shared/lib/Table';
import { FC } from 'react';
import AntDCloseIcon from '&/shared/assets/icons/AntDCloseIcon.svg?react';
import EditTemplate from '&/features/Template/EditTemplate/EditTemplate';
import { Modal } from 'antd';

import cn from './TableTemplates.module.scss';

const TableTemplates: FC = () => {
    const {
        data,
        columns,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
        handleClickAcceptRename,
        isOpenTemplateEdit,
        setIsOpenTemplateEdit,
    } = useTemplates();

    const handleOnCancelModalEditTemplate = () => {
        setIsOpenTemplateEdit(false);
    };

    return (
        <div className={cn.container}>
            <TableRegister
                columns={columns}
                data={data}
                className={cn['table-templates']}
                sorting={sorting}
                setSorting={setSorting}
                pagination={pagination}
                setPagination={setPagination}
                paginationData={paginationData}
                classes={{
                    row: cn['table-row'],
                    col: cn['table-col'],
                    columns: {
                        id: cn['table-col-id'],
                        title: cn['table-col-title'],
                        updated_at: cn['table-col-updated_at'],
                        created_at: cn['table-col-created_at'],
                        status: cn['table-col-status'],
                        action: cn['table-col-action'],
                    },
                }}
            />

            {isOpenTemplateEdit && (
                <Modal
                    width={400}
                    title={<div>Rename Template</div>}
                    closeIcon={<AntDCloseIcon />}
                    open={isOpenTemplateEdit}
                    footer={null}
                    onCancel={handleOnCancelModalEditTemplate}
                    destroyOnClose
                >
                    <EditTemplate
                        onClose={handleOnCancelModalEditTemplate}
                        onAccept={handleClickAcceptRename}
                    />
                </Modal>
            )}
        </div>
    );
};

export default TableTemplates;
