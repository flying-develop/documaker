import { FC } from 'react';
import { Pagination } from 'antd';
import { Updater } from '@tanstack/react-table';
import classNames from 'classnames';

interface TablePaginationProps {
    total: number;
    pageSize: number;
    current: number;
    className?: string | undefined;
    changePageIndex: (updater: Updater<number>) => void;
}

export const TablePagination: FC<TablePaginationProps> = ({
    total,
    pageSize,
    current,
    className,
    changePageIndex,
}) => {
    const handleChangePagination = (pageIndex: number) => {
        changePageIndex(pageIndex);
    };

    return (
        <Pagination
            className={classNames(className)}
            pageSize={pageSize}
            total={total}
            current={current}
            onChange={handleChangePagination}
            hideOnSinglePage
        />
    );
};
