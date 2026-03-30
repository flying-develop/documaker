import {Tag, TagScope} from './Tag';

export interface TagSchema {
    error: string | null;
    loading: boolean;
    loadingSection: number | null;
    tags: Tag[];
    tag: Tag;
    tagInit: TagScope | null;
}
