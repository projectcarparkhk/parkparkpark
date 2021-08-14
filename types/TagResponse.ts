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