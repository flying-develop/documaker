import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { createColumnHelper, PaginationState, SortingState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { Template } from '&/entities/Template/model/types/Template';
import { Link } from 'react-router-dom';
import TableColumn from '&/shared/lib/Table/TableColumn/TableColumn';
import { MenuProps } from 'antd';
import Trash from '&/shared/assets/icons/Trash.svg?react';
import { getTemplateCases } from '&/entities/Template/model/selectors/getTemplateCases';
import { getTemplateFilters } from '&/entities/Template/model/selectors/getTemplateFilters';
import { fetchCases } from '../model/services/fetchCases';
import { getPagination } from '../model/selectors/getPagination';
import { deleteTemplateCase } from '../model/services/deleteTemplateCase';
import SetTemplateStatus from '../../../features/Template/SetTemplateStatus/SetTemplateStatus';
import SearchTemplateByUser from '../../../features/Template/SearchTemplateByUser/SearchTemplateByUser';
import { fetchCaseDrafts } from '../model/services/fetchCaseDrafts';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const useTemplateCases = () => {
    dayjs.extend(calendar);
    const memoFilters = useRef({});
    const dispatch = useAppDispatch();
    const templateCases = useAppSelector(getTemplateCases);
    const filters = useAppSelector(getTemplateFilters);
    const paginationMeta = useAppSelector(getPagination);
    const [paginationData, setPaginationData] = useState({ total: 0, current: 0, pageSize: 0 });
    const columnHelper = createColumnHelper<Template & { action: unknown }>();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
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
        const params = {
            dir: sorting[0].desc ? 'desc' : 'asc',
            sort: sorting[0].id,
            page: pagination.pageIndex,
            ...filters,
        };
        if (JSON.stringify(memoFilters.current) !== JSON.stringify(params)) {
            dispatch(
                fetchCases({
                    dir: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    page: pagination.pageIndex,
                    ...filters,
                }),
            );
            memoFilters.current = params;
        }
    }, [dispatch, pagination.pageIndex, filters, sorting]);

    const handleClickDelete = (template: Template) => {
        dispatch(deleteTemplateCase(template.id as number));
        dispatch(
            fetchCases({
                dir: sorting[0].desc ? 'desc' : 'asc',
                sort: sorting[0].id,
                page: pagination.pageIndex,
                ...filters,
            }),
        );
    };

    const handleClickShowDrafts = useCallback(
        (data: Template) => {
            dispatch(fetchCaseDrafts(data));
        },
        [dispatch],
    );

    const columns = [
        columnHelper.accessor('id', {
            header: () => <>ID</>,
            cell: (prop) => <>{prop.getValue()}</>,
        }),
        columnHelper.accessor('title', {
            header: () => <>Name</>,
            cell: (prop) => (
                <div style={{ width: 200 }}>
                    <Link to={`../${AppRoutes.CASES}/${prop.row.original.id}`}>
                        {prop.getValue()}
                    </Link>
                </div>
            ),
        }),
        columnHelper.accessor('status', {
            header: () => <></>,
            cell: (prop) => (
                <div style={{ width: 100 }}>
                    <SetTemplateStatus isCase template={prop.row.original} />
                </div>
            ),
        }),
        columnHelper.accessor('drafts', {
            header: () => <></>,
            cell: ({ row }) => {
                console.log(row.original);
                return (
                    <div
                        style={{
                            color: '#FF6C50',
                            cursor: 'pointer',
                            width: 80,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            userSelect: 'none',
                        }}
                        onClick={() => {
                            row.toggleExpanded();
                            handleClickShowDrafts(row.original);
                        }}
                    >
                        {!!row.original?.drafts?.length && (
                            <>
                                {row.original.drafts.length} drafts{' '}
                                {row.getIsExpanded() ? <FaAngleUp /> : <FaAngleDown />}
                            </>
                        )}
                    </div>
                );
            },
        }),
        columnHelper.accessor('client', {
            header: () => <>User</>,
            cell: (prop) => {
                return prop.row.original.client ? (
                    <SearchTemplateByUser user={prop.row.original.client} />
                ) : (
                    <TableColumn.User
                        avatar={prop.getValue()?.avatar ?? null}
                        name={prop.getValue()?.name ?? '-'}
                    />
                );
            },
        }),
        columnHelper.accessor('updated_at', {
            header: () => <>Last modified</>,
            cell: (prop) => {
                const activeDate = dayjs(prop.getValue());
                return prop.getValue() && dayjs().calendar(activeDate);
            },
        }),
        columnHelper.accessor('created_at', {
            header: () => <>Created</>,
            cell: (prop) => {
                const activeDate = dayjs(prop.getValue());
                return prop.getValue() && dayjs().calendar(activeDate);
            },
        }),
        columnHelper.accessor('action', {
            header: () => <></>,
            cell: (prop) => {
                const items: MenuProps['items'] = [
                    {
                        icon: <Trash />,
                        label: 'Delete',
                        key: '0',
                        className: 'danger',
                        onClick: () => handleClickDelete(prop.row.original),
                    },
                ];
                return <TableColumn.Action items={items} />;
            },
        }),
    ];
    const data = useMemo(() => [...templateCases], [templateCases]);

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

export default useTemplateCases;
