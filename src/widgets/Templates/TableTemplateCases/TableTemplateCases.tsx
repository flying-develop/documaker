import { TableRegister } from '&/shared/lib/Table';
import { FC } from 'react';
import ExpandCaseDrafts from '&/features/Template/ExpandCaseDrafts/ExpandCaseDrafts';
import useTemplateCases from '&/entities/Template/hooks/useTemplateCases';

import cn from './TableTemplatesCases.module.scss';

const TableTemplateCases: FC = () => {
    const { data, columns, sorting, setSorting, pagination, setPagination, paginationData } =
        useTemplateCases();

    return (
        <TableRegister
            columns={columns}
            data={data}
            sorting={sorting}
            setSorting={setSorting}
            pagination={pagination}
            setPagination={setPagination}
            paginationData={paginationData}
            getRowCanExpand={() => true}
            classes={{
                row: cn['table-row'],
                col: cn['table-col'],
                columns: {
                    id: cn['table-col-id'],
                    title: cn['table-col-title'],
                    client: cn['table-col-client'],
                    updated_at: cn['table-col-updated_at'],
                    created_at: cn['table-col-created_at'],
                    action: cn['table-col-action'],
                },
            }}
            renderExpandComponent={ExpandCaseDrafts}
        />
    );
};

export default TableTemplateCases;
