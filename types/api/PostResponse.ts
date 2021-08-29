export interface PostTranslation {
    shortDescription: string;
    title: string;
}

export interface PostResponse {
    _id: string;
    title: {[key: string]: string}
    shortDescription: {[key: string]: string}
    imagePath: string;
    slug: string;
}

export interface TranslatedPost {
    _id: string;
    shortDescription: string;
    title: string;
    imagePath: string;
    slug: string;
}
