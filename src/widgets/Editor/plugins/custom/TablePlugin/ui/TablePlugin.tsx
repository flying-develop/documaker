import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTableNodeWithDimensions, TableNode } from '@lexical/table';

import { INSERT_NEW_TABLE_COMMAND } from '&/widgets/Editor/commands';
import type { CellContextShape, CellEditorConfig, InsertTableCommandPayload } from '../types';

import invariant from '../../../../utils/invariant';

export const CellContext = createContext<CellContextShape>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
    set: () => {
        // Empty
    },
});

export function TableContext({ children }: { children: JSX.Element }) {
    const [contextValue, setContextValue] = useState<{
        cellEditorConfig: null | CellEditorConfig;
        cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
    }>({
        cellEditorConfig: null,
        cellEditorPlugins: null,
    });
    return (
        <CellContext.Provider
            value={useMemo(
                () => ({
                    cellEditorConfig: contextValue.cellEditorConfig,
                    cellEditorPlugins: contextValue.cellEditorPlugins,
                    set: (cellEditorConfig, cellEditorPlugins) => {
                        setContextValue({ cellEditorConfig, cellEditorPlugins });
                    },
                }),
                [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
            )}
        >
            {children}
        </CellContext.Provider>
    );
}

export function TablePlugin({
    cellEditorConfig,
    children,
}: {
    cellEditorConfig: CellEditorConfig;
    children: JSX.Element | Array<JSX.Element>;
}): JSX.Element | null {
    const [editor] = useLexicalComposerContext();
    const cellContext = useContext(CellContext);

    useEffect(() => {
        if (!editor.hasNodes([TableNode])) {
            invariant(false, 'TablePlugin: TableNode is not registered on editor');
        }

        cellContext.set(cellEditorConfig, children);

        return editor.registerCommand<InsertTableCommandPayload>(
            INSERT_NEW_TABLE_COMMAND,
            ({ columns, rows, includeHeaders }) => {
                const tableNode = $createTableNodeWithDimensions(
                    Number(rows),
                    Number(columns),
                    includeHeaders,
                );
                $insertNodes([tableNode]);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [cellContext, cellEditorConfig, children, editor]);

    return null;
}
