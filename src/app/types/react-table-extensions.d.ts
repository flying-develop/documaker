import {
    UseTableOptions,
    UseTableInstanceProps,
    UseTableState,
    ColumnInterface,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersState,
    UseFiltersInstanceProps,
    UseGlobalFiltersState,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersInstanceProps,
    UsePaginationState,
    UsePaginationInstanceProps,
} from 'react-table';

declare module 'react-table' {
    export interface TableOptions<D extends Record<string, unknown>>
        extends UseTableOptions<D>,
            UseFiltersColumnOptions<D>,
            UseGlobalFiltersColumnOptions<D> {}

    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseTableInstanceProps<D>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UsePaginationInstanceProps<D> {}

    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseTableState<D>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UsePaginationState<D> {}

    export interface Column<D extends Record<string, unknown> = Record<string, unknown>>
        extends ColumnInterface<D>,
            UseFiltersColumnProps<D> {}
}
