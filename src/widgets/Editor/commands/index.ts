import { InsertTableCommandPayload } from '@lexical/table';
import { LexicalCommand, createCommand } from 'lexical';
import { InlineImagePayload } from '../nodes/custom/InlineImageNode';

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> = createCommand(
    'INSERT_NEW_TABLE_COMMAND',
);

export const RIGHT_CLICK_IMAGE_COMMAND: LexicalCommand<MouseEvent> = createCommand(
    'RIGHT_CLICK_IMAGE_COMMAND',
);

export const INSERT_INLINE_IMAGE_COMMAND: LexicalCommand<InlineImagePayload> = createCommand(
    'INSERT_INLINE_IMAGE_COMMAND',
);
