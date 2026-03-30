import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { createColumnHelper, PaginationState, SortingState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Template } from '&/entities/Template/model/types/Template';
import { Link } from 'react-router-dom';
import Status from '&/shared/ui/Status/Status';
import { fetchCases } from '../model/services/fetchCases';
import { getCases } from '../model/selectors/getCases';
import { getPagination } from '../model/selectors/getPagination';
import { TemplateStatus } from '&/entities/Template/model/types/TemplateStatus';

const useProfileCases = ({ search }: { search: string }) => {
    const dispatch = useAppDispatch();
    const cases = useAppSelector(getCases);
    const columnHelper = createColumnHelper<Template>();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const paginationMeta = useAppSelector(getPagination);
    const [paginationData, setPaginationData] = useState({ total: 0, current: 0, pageSize: 0 });
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: paginationData.pageSize,
        pageIndex: paginationData.current,
    });

    useEffect(() => {
        setPaginationData({
            total: paginationMeta.total,
            current: paginationMeta.current,
            pageSize: paginationMeta.pageSize,
        });
    }, [paginationMeta]);

    useEffect(() => {
        dispatch(
            fetchCases({
                dir: sorting[0].desc ? 'desc' : 'asc',
                sort: sorting[0].id,
                page: pagination.pageIndex,
                search,
            }),
        );
    }, [dispatch, pagination.pageIndex, search, sorting]);

    const columns = [
        columnHelper.accessor('title', {
            header: () => <>Name</>,
            cell: (prop) => (
                <Link to={`../${AppRoutes.CASES}/${prop.row.original.id}`}>{prop.getValue()}</Link>
            ),
        }),
        columnHelper.accessor('updated_at', {
            header: () => <>Last modified</>,
            cell: (prop) =>
                prop.getValue() && dayjs(prop.getValue()).isValid()
                    ? dayjs(prop.getValue()).format('DD.MM.YYYY HH:mm')
                    : '-',
        }),
        columnHelper.accessor('created_at', {
            header: () => <>Created</>,
            cell: (prop) =>
                prop.getValue() && dayjs(prop.getValue()).isValid()
                    ? dayjs(prop.getValue()).format('DD.MM.YYYY')
                    : '-',
        }),
        columnHelper.accessor('status', {
            header: () => <>Status</>,
            cell: (prop) => (
                <Status status={prop.getValue() as TemplateStatus}>{prop.getValue()}</Status>
            ),
        }),
    ];
    const data = useMemo(() => [...cases], [cases]);

    return {
        columns,
        data,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
    };
};

export default useProfileCases;
