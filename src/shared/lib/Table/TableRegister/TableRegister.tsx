import { Fragment } from 'react';
import classNames from 'classnames';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    PaginationState,
    getSortedRowModel,
    OnChangeFn,
    getExpandedRowModel,
} from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import cn from './TableRegister.module.scss';
import { TablePagination } from '../TablePagination/TablePagination';
import TableHeader from '../TableHeader/TableHeader';

interface TableClassNames {
    row?: string | undefined;
    col?: string | undefined;
    columns: Record<string, string>;
}

interface TableProps<T extends object> {
    data: any;
    columns: ColumnDef<T, any>[];
    className?: string;
    classes?: TableClassNames;
    sorting?: SortingState;
    setSorting?: OnChangeFn<SortingState>;
    pagination: PaginationState;
    setPagination?: OnChangeFn<PaginationState>;
    paginationData?: {
        total: number;
        current: number;
        pageSize: number;
    };
    renderExpandComponent?: (props: any) => React.ReactElement;
    getRowCanExpand?: (data: unknown) => boolean;
}

const TableRegister = <T extends object>(props: TableProps<T>) => {
    const {
        data,
        columns,
        className = '',
        classes,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
        renderExpandComponent,
        getRowCanExpand,
    } = props;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true,
        manualPagination: true,
        enableSortingRemoval: false,
        initialState: {
            sorting,
            pagination,
        },
    });

    return (
        <>
            <ul className={classNames(cn.table, className)}>
                <li className={classNames(cn['table-row'], cn['table-header'], classes?.row)}>
                    {table.getHeaderGroups().map((headerGroup: any) =>
                        headerGroup.headers.map((header: any) => {
                            return (
                                <TableHeader.Root
                                    key={`${headerGroup.id}-${header.id}`}
                                    onClick={header.column.getToggleSortingHandler()}
                                    canSorted={header.column.getCanSort()}
                                    sort={header.column.getIsSorted()}
                                    className={classNames(
                                        cn['table-col'],
                                        classes?.col,
                                        classes?.columns[header.column.id],
                                    )}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHeader.Root>
                            );
                        }),
                    )}
                </li>

                {table.getRowModel().rows.map((row: any) => (
                    <Fragment key={row.id}>
                        <li className={classNames(cn['table-row'], classes?.row)}>
                            {row.getVisibleCells().map((cell: any) => (
                                <div
                                    className={classNames(
                                        cn['table-col'],
                                        classes?.col,
                                        classes?.columns[cell.column.id],
                                    )}
                                    data-label={cell.column.columnDef.header().props.children}
                                    key={cell.id}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            ))}
                        </li>
                        {row.getIsExpanded() && typeof renderExpandComponent !== 'undefined' && (
                            <li className={cn['row-expand']}>{renderExpandComponent({row})}</li>
                        )}
                    </Fragment>
                ))}
            </ul>

            {paginationData && (
                <TablePagination
                    {...paginationData}
                    changePageIndex={table.setPageIndex}
                    className={cn['table-pagination']}
                />
            )}
        </>
    );
};

export default TableRegister;
