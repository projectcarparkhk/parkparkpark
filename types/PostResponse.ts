export interface Author {
    name: string;
    picture: string;
}

export interface Asset {
    _ref: string;
    _type: string;
}

export interface Crop {
    _type: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
}

export interface Hotspot {
    _type: string;
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface CoverImage {
    _type: string;
    asset: Asset;
    crop: Crop;
    hotspot: Hotspot;
}

export interface PostResponse {
    _id: string;
    author: Author;
    coverImage: CoverImage;
    date: Date;
    slug: string;
    title: string;
}