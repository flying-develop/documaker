// @ts-nocheck

import type {
    DOMConversionMap,
    DOMConversionOutput,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from 'lexical';

import { $applyNodeReplacement, DecoratorNode, DOMExportOutput } from 'lexical';
import AnchorComponent from './ui/AnchorComponent/AnchorComponent';

export type SerializedAnchorNode = Spread<
    {
        text: string;
        id: string;
    },
    SerializedLexicalNode
>;

function convertAnchorElement(domNode: HTMLElement): null | DOMConversionOutput {
    let text = domNode.getAttribute('data-lexical-text');
    let id = domNode.getAttribute('data-lexical-id');
    text = atob(text || '');
    if (text) {
        const node = $createAnchorNode(text, id);
        return { node };
    }

    return null;
}

export class AnchorNode extends DecoratorNode<JSX.Element> {
    __text: string;
    __id: string;

    static getType(): string {
        return 'anchor';
    }

    static clone(node: AnchorNode): AnchorNode {
        return new AnchorNode(node.__text, node.__id, node.__key);
    }

    constructor(text: string, id: string, key?: NodeKey) {
        super(key);
        this.__text = text;
        this.__id = id;
    }

    static importJSON(serializedNode: SerializedAnchorNode): AnchorNode {
        const node = $createAnchorNode(serializedNode.text, serializedNode.id);
        return node;
    }

    exportJSON(): SerializedAnchorNode {
        return {
            text: this.getAnchor(),
            id: this.__id,
            type: 'anchor',
            version: 1,
        };
    }

    createDOM(): HTMLElement {
        const element = document.createElement('span');
        element.className = 'editor-text';
        return element;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement('span');
        const text = btoa(this.__text);
        const id = btoa(this.__id);
        element.setAttribute('data-lexical-text', text);
        element.setAttribute('data-lexical-id', id);
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            div: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute('data-lexical-text')) {
                    return null;
                }
                return {
                    conversion: convertAnchorElement,
                    priority: 2,
                };
            },
            span: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute('data-lexical-text')) {
                    return null;
                }
                return {
                    conversion: convertAnchorElement,
                    priority: 1,
                };
            },
        };
    }

    updateDOM(prevNode: AnchorNode): boolean {
        // If the inline property changes, replace the element
        return this.__id !== prevNode.__id;
    }

    getTextContent(): string {
        return this.__text;
    }

    getAnchor(): string {
        return this.__text;
    }

    setAnchor(text: string): void {
        const writable = this.getWritable();
        writable.__text = text;
    }

    decorate(): JSX.Element {
        return <AnchorComponent anchor={this.__text} nodeKey={this.__key} />;
    }
}

export function $createAnchorNode(text = '', id = ''): AnchorNode {
    const anchorNode = new AnchorNode(text, id);
    console.log('anchorNode', anchorNode);
    return $applyNodeReplacement(anchorNode);
}

export function $isAnchorNode(node: LexicalNode | null | undefined): node is AnchorNode {
    return node instanceof AnchorNode;
}
