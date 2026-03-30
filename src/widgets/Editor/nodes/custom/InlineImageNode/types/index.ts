import type { Position } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import type { NodeKey, SerializedLexicalNode, Spread } from 'lexical';

export type SerializedInlineImageNode = Spread<
    {
        height?: number;
        src: string;
        width?: number;
        maxWidth: number;
        position?: Position;
    },
    SerializedLexicalNode
>;

export interface UpdateInlineImagePayload {
    position: Position;
}

export interface InlineImagePayload {
    height?: number;
    key?: NodeKey;
    src: string;
    width?: number;
    maxWidth?: number;
    position?: Position;
}
