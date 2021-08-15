import { SimpleLink } from './common'

export interface FilterOption {
    _id: string
    name: string
    slug: string
    isHot?: boolean
    checked?: boolean
}

export interface Area {
    subDistricts: FilterOption[];
}
export interface Category {
    tags: FilterOption[];
}

export interface FilterResponse {
    areas: Area[]
    categories: Category[]
}


export interface FilterConfig {
    areas?: string,
    categories?: string
}

export interface SubFilterConfig {
    subDistricts?: string,
    tags?: string
}


export interface FilterCatelogueProps {
    config: FilterConfig
    applyFilterCatelogue(activeItem: string): void
}

export interface FilterSectionProps {
    title: string
    filterOptions: FilterOption[]
    updateSelection(selectedOptions: FilterOption[]): void
}

export interface FilterDrawerProps {
    filters: FilterOption[]
    child: keyof SubFilterConfig
    applyFilters(option: FilterOption[]): void
    applyFilterCatelogue(filterType: string): void
}

export interface FilterableItem {
    _id: string
    name: string
    subDistricts: SimpleLink[]
    tags: SimpleLink[]
    slug: string
}