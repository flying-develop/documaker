/* eslint-disable no-underscore-dangle */
import { Suspense, lazy } from 'react';
import { $applyNodeReplacement, DecoratorNode } from 'lexical';

import type {
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
} from 'lexical';

import type { Position } from '&/widgets/Editor/plugins/custom/InlineImagePlugin';
import type {
    InlineImagePayload,
    SerializedInlineImageNode,
    UpdateInlineImagePayload,
} from '../types';

import './InlineImageNode.css';

// eslint-disable-next-line import/no-cycle, react-refresh/only-export-components
const InlineImageComponent = lazy(() => import('./InlineImageComponent'));

function convertInlineImageElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLImageElement) {
        const { src, width, height } = domNode;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const node = $createInlineImageNode({ height, src, width });
        return { node };
    }
    return null;
}

export class InlineImageNode extends DecoratorNode<JSX.Element> {
    __src: string;

    __width: 'inherit' | number;

    __height: 'inherit' | number;

    __maxWidth: number;

    __position: Position;

    static getType(): string {
        return 'inline-image';
    }

    static clone(node: InlineImageNode): InlineImageNode {
        return new InlineImageNode(
            node.__src,
            node.__maxWidth,
            node.__position,
            node.__width,
            node.__height,
            node.__key,
        );
    }

    static importJSON(serializedNode: SerializedInlineImageNode): InlineImageNode {
        const { height, width, src, position, maxWidth } = serializedNode;
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const node = $createInlineImageNode({
            maxWidth,
            height,
            position,
            src,
            width,
        });
        return node;
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: () => ({
                conversion: convertInlineImageElement,
                priority: 0,
            }),
        };
    }

    constructor(
        src: string,
        maxWidth: number,
        position: Position,
        width?: 'inherit' | number,
        height?: 'inherit' | number,
        key?: NodeKey,
    ) {
        super(key);
        this.__src = src;
        this.__maxWidth = maxWidth;
        this.__width = width || 'inherit';
        this.__height = height || 'inherit';
        this.__position = position;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('width', this.__width.toString());
        element.setAttribute('height', this.__height.toString());
        return { element };
    }

    exportJSON(): SerializedInlineImageNode {
        return {
            height: this.__height === 'inherit' ? 0 : this.__height,
            position: this.__position,
            maxWidth: this.__maxWidth,
            src: this.getSrc(),
            type: 'inline-image',
            version: 1,
            width: this.__width === 'inherit' ? 0 : this.__width,
        };
    }

    getSrc(): string {
        return this.__src;
    }

    setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }

    getPosition(): Position {
        return this.__position;
    }

    setPosition(position: Position): void {
        const writable = this.getWritable();
        writable.__position = position;
    }

    getHeight() {
        return this.__height;
    }

    getWidth() {
        return this.__width;
    }

    update(payload: UpdateInlineImagePayload): void {
        const writable = this.getWritable();
        const { position } = payload;

        if (position !== undefined) {
            writable.__position = position;
        }
    }

    // View

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement('span');
        const className = `${config.theme.inlineImage} position-${this.__position}`;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }

    updateDOM(prevNode: InlineImageNode, dom: HTMLElement, config: EditorConfig): false {
        const position = this.__position;
        if (position !== prevNode.__position) {
            const className = `${config.theme.inlineImage} position-${position}`;
            if (className !== undefined) {
                dom.className = className;
            }
        }
        return false;
    }

    decorate(): JSX.Element {
        return (
            <Suspense fallback={null}>
                <InlineImageComponent
                    src={this.__src}
                    width={this.__width}
                    height={this.__height}
                    nodeKey={this.getKey()}
                    maxWidth={this.__maxWidth}
                    position={this.__position}
                    resizable
                />
            </Suspense>
        );
    }
}

export function $createInlineImageNode({
    position,
    height,
    src,
    width,
    key,
    maxWidth = 500
}: InlineImagePayload): InlineImageNode {
    return $applyNodeReplacement(new InlineImageNode(src, maxWidth, position, width, height, key));
}

export function $isInlineImageNode(node: LexicalNode | null | undefined): node is InlineImageNode {
    return node instanceof InlineImageNode;
}
