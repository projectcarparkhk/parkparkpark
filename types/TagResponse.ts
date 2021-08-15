import { SimpleLink } from './common'
export interface TagResponse {
    _id: string;
    en: TagTranslation;
    zh: TagTranslation;
    slug: string;
    isHot: boolean;
    imagePath: string;
}

export interface TagTranslation {
    name: string;
}

export interface Tag extends SimpleLink {
    isHot?: boolean
}
export interface Category extends Tag {
    tags: Tag[]
}