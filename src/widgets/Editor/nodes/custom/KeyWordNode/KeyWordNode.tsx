// @ts-nocheck

import lexical, {
    DOMConversionMap,
    DOMConversionOutput,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from 'lexical';

import { $applyNodeReplacement, DecoratorNode, DOMExportOutput } from 'lexical';
import KeyWordComponent from './ui/KeyWordComponent/KeyWordComponent';

export type SerializedKeyWordNode = Spread<
    {
        text: string;
        id: string;
    },
    SerializedLexicalNode
>;

function convertKeyWordNodeElement(domNode: HTMLElement): null | DOMConversionOutput {
    let text = domNode.getAttribute('data-lexical-text');
    let id = domNode.getAttribute('data-lexical-id');
    text = atob(text || '');
    if (text) {
        const node = $createKeyWordNode(text, id);
        return { node };
    }

    return null;
}

// export class KeyWordNode extends DecoratorNode<JSX.Element> {
export class KeyWordNode extends DecoratorNode<JSX.Element> {
    __text: string;
    __id: string;

    static getType(): string {
        return 'keyword';
    }

    static clone(node: KeyWordNode): KeyWordNode {
        return new KeyWordNode(node.__text, node.__id, node.__key);
    }

    constructor(text: string, id: string, key?: NodeKey) {
        super(key);
        this.__text = text;
        this.__id = id;
    }

    static importJSON(serializedNode: SerializedKeyWordNode): KeyWordNode {
        const node = $createKeyWordNode(serializedNode.text, serializedNode.id);
        // node.setFormat(serializedNode.format);
        // node.setDetail(serializedNode.detail);
        // node.setMode(serializedNode.mode);
        // node.setStyle(serializedNode.style);
        return node;
    }

    exportJSON(): SerializedKeyWordNode {
        return {
            text: this.getKeyWord(),
            id: this.__id,
            // ...super.exportJSON(),
            type: 'keyword',
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
                    conversion: convertKeyWordNodeElement,
                    priority: 2,
                };
            },
            span: (domNode: HTMLElement) => {
                if (!domNode.hasAttribute('data-lexical-text')) {
                    return null;
                }
                return {
                    conversion: convertKeyWordNodeElement,
                    priority: 1,
                };
            },
        };
    }

    updateDOM(prevNode: KeyWordNode): boolean {
        // If the inline property changes, replace the element
        return this.__id !== prevNode.__id;
    }

    getTextContent(): string {
        return this.__text;
    }

    getKeyWord(): string {
        return this.__text;
    }

    setKeyWord(text: string): void {
        const writable = this.getWritable();
        writable.__text = text;
    }

    decorate(): JSX.Element {
        return <KeyWordComponent keyWord={this.__text} nodeKey={this.__key} />;
    }
}

export function $createKeyWordNode(text = '', id = ''): KeyWordNode {
    const keyWordNode = new KeyWordNode(text, id);
    return $applyNodeReplacement(keyWordNode);
}

export function $isKeyWordNode(node: LexicalNode | null | undefined): node is KeyWordNode {
    return node instanceof KeyWordNode;
}
