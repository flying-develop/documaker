import { useAppDispatch, useAppSelector } from '&/app/providers/Store';
import { createColumnHelper, PaginationState, SortingState } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppRoutes } from '&/shared/config/route/AppRoutes';
import { getTemplates } from '&/entities/Template/model/selectors/getTemplates';
import { Template } from '&/entities/Template/model/types/Template';
import { Link } from 'react-router-dom';
import TableColumn from '&/shared/lib/Table/TableColumn/TableColumn';
import Copy from '&/shared/assets/icons/Copy.svg?react';
import Edit from '&/shared/assets/icons/Edit.svg?react';
import Trash from '&/shared/assets/icons/Trash.svg?react';
import { MenuProps } from 'antd';
import { getTemplateFilters } from '&/entities/Template/model/selectors/getTemplateFilters';
import { fetchTemplates } from '../model/services/fetchTemplates';
import { getPagination } from '../model/selectors/getPagination';
import { getTemplate } from '../model/selectors/getTemplate';
import { templatesActions } from '../model/slice/templatesSlice';
import { copyTemplate } from '../model/services/copyTemplate';
import { updateTemplate } from '../model/services/updateTemplate';
import { deleteTemplate } from '../model/services/deleteTemplate';
import SetTemplateStatus from '../../../features/Template/SetTemplateStatus/SetTemplateStatus';

const useTemplates = () => {
    const memoFilters = useRef({});
    const dispatch = useAppDispatch();
    const template = useAppSelector(getTemplate);
    const templates = useAppSelector(getTemplates);
    const filters = useAppSelector(getTemplateFilters);
    const columnHelper = createColumnHelper<Template & { action: any }>();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const paginationMeta = useAppSelector(getPagination);
    const [paginationData, setPaginationData] = useState({ total: 0, current: 0, pageSize: 0 });

    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: paginationData.pageSize,
        pageIndex: paginationData.current,
    });

    const [isOpenTemplateEdit, setIsOpenTemplateEdit] = useState<boolean>(false);

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
            dispatch(fetchTemplates(params));
            memoFilters.current = params;
        }
    }, [dispatch, filters, pagination.pageIndex, sorting]);

    const handleClickRename = (data: Template) => {
        dispatch(templatesActions.updateTemplate(data));
        setIsOpenTemplateEdit(true);
    };

    const handleClickCopy = useCallback(
        (data: Template) => {
            dispatch(templatesActions.updateTemplate(data));
            dispatch(copyTemplate());
            dispatch(
                fetchTemplates({
                    dir: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    page: pagination.pageIndex,
                    ...filters,
                }),
            );
        },
        [dispatch, filters, pagination.pageIndex, sorting],
    );

    const handleClickDelete = useCallback(
        (data: Template) => {
            dispatch(deleteTemplate(data.id as number));
            dispatch(
                fetchTemplates({
                    dir: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    page: pagination.pageIndex,
                    ...filters,
                }),
            );
        },
        [dispatch, filters, pagination.pageIndex, sorting],
    );

    const handleClickAcceptRename = useCallback(
        (data: Template) => {
            dispatch(templatesActions.updateTemplate({...template, ...data}));
            dispatch(updateTemplate());
            dispatch(
                fetchTemplates({
                    dir: sorting[0].desc ? 'desc' : 'asc',
                    sort: sorting[0].id,
                    page: pagination.pageIndex,
                    ...filters,
                }),
            );
        },
        [dispatch, filters, pagination.pageIndex, sorting, template],
    );

    const columns = [
        columnHelper.accessor('id', {
            header: () => {
                return <>ID</>;
            },
            cell: (prop) => {
                return <>{prop.getValue()}</>;
            },
        }),
        columnHelper.accessor('title', {
            header: () => <>Name</>,
            cell: (prop) => (
                <Link to={`../${AppRoutes.TEMPLATES}/${prop.row.original.id}`}>
                    {prop.getValue()}
                </Link>
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
            enableSorting: false,
            header: () => <>Status</>,
            cell: (prop) => <SetTemplateStatus template={prop.row.original} />,
        }),
        columnHelper.accessor('action', {
            header: () => <></>,
            cell: (prop) => {
                const items: MenuProps['items'] = [
                    {
                        icon: <Copy />,
                        label: 'Create a copy',
                        key: 0,
                        onClick: () => handleClickCopy(prop.row.original),
                    },
                    {
                        icon: <Edit />,
                        label: 'Rename',
                        key: 1,
                        onClick: () => handleClickRename(prop.row.original),
                    },
                    {
                        icon: <Trash />,
                        label: 'Delete',
                        key: 2,
                        className: 'danger',
                        onClick: () => handleClickDelete(prop.row.original),
                    },
                ];

                return (
                    <>
                        <TableColumn.Action items={items} />
                    </>
                );
            },
        }),
    ];
    const data = useMemo(() => [...templates], [templates]);

    return {
        columns,
        data,
        sorting,
        setSorting,
        pagination,
        setPagination,
        paginationData,
        handleClickAcceptRename,
        isOpenTemplateEdit,
        setIsOpenTemplateEdit
    };
};

export default useTemplates;
