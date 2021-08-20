import { SimpleLink } from './common'

interface FilterOption {
    _id: string
    name: { [key: string]: string }
}

export interface Area {
    subDistricts: FilterOption[];
    [key: string]: any
}
export interface Category {
    tags: FilterOption[];
    [key: string]: any
}

export interface FilterResponse {
    areas: Area[]
    categories: Category[]
    [key: string]: any
}


export interface FilterConfig {
    areas?: string,
    categories?: string
}

export interface SubFilterConfig {
    subDistricts?: string,
    tags?: string
}


export interface FilterCatalogueProps {
    config: FilterConfig
    applyFilterCatalogue(activeItem?: keyof FilterConfig | string | null): void
}

export interface FilterSectionProps {
    title: string
    subFilterState: boolean[]
    index: number
    subFilters: FilterOption[]
    updateFilters(subFilterState: boolean[], index: number): void
}

export interface FilterableItem {
    _id: string
    name: string
    subDistricts: SimpleLink[]
    tags: SimpleLink[]
    slug: string
}