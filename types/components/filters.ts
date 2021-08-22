export interface FilterSection {
  _id: string
  name: { [key: string]: string }
  subFilters: FilterOption[]
}

export interface FilterOption {
  _id: string
  name: { [key: string]: string }
}

export interface Filters {
  areas: FilterSection[]
  categories: FilterSection[]
}
export interface CarparkItem extends FilterOption{
  subDistricts: FilterOption[]
  tags: FilterOption[]
}