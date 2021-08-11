export interface PostTranslation {
    shortDescription: string;
    title: string;
}

export interface PostResponse {
    _id: string;
    en: PostTranslation;
    imagePath: string;
    slug: string;
    zh: PostTranslation;
}
