import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { SortDirection } from '@tanstack/react-table';

import TableSortArrowDown from '&/shared/assets/icons/TableSortArrowDown.svg?react';
import TableSortArrowUp from '&/shared/assets/icons/TableSortArrowUp.svg?react';

import cn from './TableHeader.module.scss';

type HeaderTableRootProps = {
    className?: string | undefined;
    onClick?: ((event: unknown) => void) | undefined;
    canSorted?: boolean;
    sort: false | SortDirection;
};

const TableHeaderRoot: FC<PropsWithChildren & HeaderTableRootProps> = ({
    children,
    className,
    onClick,
    canSorted,
    sort,
}) => {
    return (
        <div
            className={classNames(cn['table-col'], className, {
                [cn['table-col-sorting']]: canSorted,
            })}
            onClick={onClick}
        >
            <div className={cn['table-col-label']}>
                <span>{children}</span>

                {canSorted && !!sort && (
                    <div className={cn['table-col-sort']}>
                        {{ asc: <TableSortArrowDown />, desc: <TableSortArrowUp /> }[sort]}
                    </div>
                )}
            </div>
        </div>
    );
};

const TableHeader = TableHeaderRoot as typeof TableHeaderRoot & {
    Root: typeof TableHeaderRoot;
};

TableHeader.Root = TableHeaderRoot;

export default TableHeader;
