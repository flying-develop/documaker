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
import LinkComponent from './ui/LinkComponent/LinkComponent';

export type SerializedLinkNode = Spread<
    {
        text: string;
        id: string;
    },
    SerializedLexicalNode
>;

function convertLinkElement(domNode: HTMLElement): null | DOMConversionOutput {
    let text = domNode.getAttribute('data-lexical-text');
    let id = domNode.getAttribute('data-lexical-id');
    text = atob(text || '');
    if (text) {
        const node = $createLinkNode(text, id);
        return { node };
    }

    return null;
}

export class LinkNode extends DecoratorNode<JSX.Element> {
    __text: string;
    __id: string;

    static getType(): string {
        return 'link';
    }

    static clone(node: LinkNode): LinkNode {
        return new LinkNode(node.__text, node.__id, node.__key);
    }

    constructor(text: string, id: string, key?: NodeKey) {
        super(key);
        this.__text = text;
        this.__id = id;
    }

    static importJSON(serializedNode: SerializedLinkNode): LinkNode {
        const node = $createLinkNode(serializedNode.text, serializedNode.id);
        return node;
    }

    exportJSON(): SerializedLinkNode {
        return {
            text: this.getLink(),
            id: this.__id,
            type: 'link',
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
                    conversion: convertLinkElement,
                    priority: 2,
                };
            },
            span: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute('data-lexical-text')) {
                    return null;
                }
                return {
                    conversion: convertLinkElement,
                    priority: 1,
                };
            },
        };
    }

    updateDOM(prevNode: LinkNode): boolean {
        // If the inline property changes, replace the element
        return this.__id !== prevNode.__id;
    }

    getTextContent(): string {
        return this.__text;
    }

    getLink(): string {
        return this.__text;
    }

    setLink(text: string): void {
        const writable = this.getWritable();
        writable.__text = text;
    }

    decorate(): JSX.Element {
        return <LinkComponent link={this.__text} nodeKey={this.__key} />;
    }
}

export function $createLinkNode(text = '', id = ''): LinkNode {
    const linkNode = new LinkNode(text, id);
    return $applyNodeReplacement(linkNode);
}

export function $isLinkNode(node: LexicalNode | null | undefined): node is LinkNode {
    return node instanceof LinkNode;
}
