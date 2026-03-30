import { FC } from 'react';
import { TableRegister } from '&/shared/lib/Table';
import useProfileCases from '&/entities/Profile/hooks/useProfileCases';
import cn from './TableProfileCases.module.scss';

interface TableProfileCasesProps {
    search: string;
}

const TableProfileCases: FC<TableProfileCasesProps> = ({ search }) => {
    const { data, columns, sorting, setSorting, pagination, setPagination, paginationData } =
        useProfileCases({ search });

    return (
        <div>
            <TableRegister
                columns={columns}
                data={data}
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
                        client: cn['table-col-client'],
                        updated_at: cn['table-col-updated_at'],
                        created_at: cn['table-col-created_at'],
                        status: cn['table-col-status'],
                        action: cn['table-col-action'],
                    },
                }}
            />
        </div>
    );
};

export default TableProfileCases;
