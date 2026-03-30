import { TableCellNode } from '@lexical/table';

export type TableCellActionMenuProps = Readonly<{
    contextRef: { current: null | HTMLElement };
    onClose: () => void;
    setIsMenuOpen: (isOpen: boolean) => void;
    tableCellNode: TableCellNode;
    cellMerge: boolean;
}>;
