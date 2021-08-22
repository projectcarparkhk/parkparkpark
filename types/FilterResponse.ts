export interface FilterOption {
    _id: string
    name: string
    slug: string
    isHot?: boolean
    checked?: boolean
    [key: string]: any
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
    [key: string]: any
}

export interface SubFilterConfig {
    subDistricts?: string,
    tags?: string
}


export interface FilterCatelogueProps {
    config: FilterConfig
    applyFilterCatelogue(activeItem?: keyof FilterConfig | string | null): void,
    filters: FilterResponse,
}

export interface FilterSectionProps {
    title: string
    filterOptions: FilterOption[]
    updateSelection(selectedOptions?: FilterOption[]): void
}

export interface FilterDrawerProps {
    filters: Area[] | Category[] | null
    child: keyof FilterOption | string | undefined 
    applyFilters(option: (Area | Category)[] | null): void
    applyFilterCatelogue(filterType: keyof FilterConfig | string | null): void
}