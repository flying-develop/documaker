import { HashtagNode } from '@lexical/hashtag';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import {
    AnchorLinkNode,
    AnchorNode,
    KeyWordNode,
    YouTubeNode,
} from '&/widgets/Editor/nodes/custom';
import { InlineImageNode } from '../nodes/custom/InlineImageNode';
import lexicalEditorTheme from '../themes/theme';

function onError(error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
}

export const initialConfig = {
    namespace: 'Editor',
    theme: lexicalEditorTheme,
    onError,
    className: 'editor',
    nodes: [
        HashtagNode,
        HeadingNode,
        QuoteNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        InlineImageNode,
        AutoLinkNode,
        LinkNode,
        AnchorNode,
        AnchorLinkNode,
        YouTubeNode,
        KeyWordNode,
    ],
};
