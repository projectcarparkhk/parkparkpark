import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Header from '../components/header'
import { getCarparks } from '../sanityApi/carparks'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import { FilterDrawer } from '../components/FilterDrawer'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import {
  structureCarparks,
  structureFilters,
} from '../sanityApi/toApplication/carparks'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import CarparkListItem from '../components/filter/CarparkListItem'
import { FilterCatalogue } from '../components/filter/FilterCatalogue'
import { CarparkItem, FilterSection } from '../types/components/filters'
import { getTags } from '../sanityApi/tags'

const FILTER_TYPES: Array<keyof Filters> = ['areas', 'categories']

export interface Filters {
  areas: FilterSection[]
  categories: FilterSection[]
}
interface IProps {
  filters: Filters
  carparks: CarparkItem[]
}

export interface FilterState {
  areas: boolean[][]
  categories: boolean[][]
}

function filterCarparksByQuery(
  subDistrictsString: string | string[] | undefined,
  categoriesString: string | string[] | undefined,
  carparks: CarparkItem[]
) {
  const filteredIds: { areas: string[]; categories: string[] } = {
    areas: [],
    categories: [],
  }
  filteredIds.areas = subDistrictsString
    ? subDistrictsString.toString().split(',')
    : []
  filteredIds.categories = categoriesString
    ? categoriesString.toString().split(',')
    : []

  let filteredCarparks

  if (!filteredIds.areas.length && !filteredIds.categories.length) {
    filteredCarparks = carparks
  } else if (!filteredIds.categories.length) {
    filteredCarparks = carparks.filter((carpark) =>
      carpark.subDistricts.some((district) =>
        filteredIds.areas.includes(district._id)
      )
    )
  } else if (!filteredIds.areas.length) {
    filteredCarparks = carparks.filter((carpark) =>
      carpark.tags.some((tag) => filteredIds.categories.includes(tag._id))
    )
  } else {
    filteredCarparks = carparks
      .filter((carpark) =>
        carpark.subDistricts.some((district) =>
          filteredIds.areas.includes(district._id)
        )
      )
      .filter((carpark) =>
        carpark.tags.some((tag) => filteredIds.categories.includes(tag._id))
      )
  }
  return filteredCarparks
}

function Carparks({ carparks, filters }: IProps) {
  const router = useRouter()
  const { locale, query } = router
  const { subDistricts: subDistrictsString, categories: categoriesString } =
    query
  const subDistricts = ((subDistrictsString as string) || '').split(',')
  const categories = ((categoriesString as string) || '').split(',')

  const [filterState, setFilterState] = useState<FilterState>({
    areas: filters.areas.map((area) => area.subFilters.map(() => false)),
    categories: filters.categories.map((category) =>
      category.subFilters.map(() => false)
    ),
  })

  // set filter state based on url path
  useEffect(() => {
    setFilterState({
      areas: filters.areas.map((area) =>
        area.subFilters.map((subFilter) => subDistricts.includes(subFilter._id))
      ),
      categories: filters.categories.map((category) =>
        category.subFilters.map((subFilter) =>
          categories.includes(subFilter._id)
        )
      ),
    })
  }, [filters, query])

  const [activePanel, setActivePanel] = useState<null | keyof FilterState>(null)

  const fallbackLocale = locale || 'zh'

  const filteredCarparks = useMemo(
    () => filterCarparksByQuery(subDistrictsString, categoriesString, carparks),
    [subDistrictsString, categoriesString, carparks]
  )

  // set filter state based on url path
  const onUpdateRoute = useCallback(
    (subFilterState: boolean[][]) => {
      if (activePanel) {
        const filteredIds = filters[activePanel].reduce((acc, filter, i) => {
          const filtered = filter.subFilters.filter(
            (_, subI) => subFilterState[i][subI]
          )
          acc.push(...filtered.map((elem) => elem._id))
          return acc
        }, [] as string[])
        const queryString = filteredIds.join(',')
        const queryObject =
          activePanel === 'areas'
            ? { subDistricts: queryString }
            : { categories: queryString }
        router.push({
          query: {
            ...query,
            ...queryObject,
          },
        })
      }
    },
    [activePanel, filters, query]
  )

  return (
    <Container>
      <Header imageToTop={false} />
      <FilterCatalogue
        applyFilterCatalogue={(activeItem: keyof Filters) =>
          setActivePanel(activeItem)
        }
        filterTypes={FILTER_TYPES}
        locale={fallbackLocale as SupportedLanguages}
      />
      {activePanel && (
        <FilterDrawer
          filters={activePanel && filters[activePanel]}
          filterStateProps={activePanel && filterState[activePanel]}
          onUpdateRoute={onUpdateRoute}
          setActivePanel={setActivePanel}
          locale={fallbackLocale as SupportedLanguages}
        />
      )}
      <div>
        {filteredCarparks.map((carpark) => (
          <CarparkListItem
            key={carpark._id}
            carpark={carpark}
            locale={fallbackLocale as SupportedLanguages}
          />
        ))}
      </div>
    </Container>
  )
}

export default Carparks

export async function getStaticProps({ preview = false }) {
  const carparkResponse = await getCarparks(preview)
  const tagResponse = await getTags(preview)
  const areaResponse = await getSubDistrictsGroupByArea(preview)
  const filters = structureFilters(tagResponse, areaResponse)
  const carparks = structureCarparks(carparkResponse)
  return {
    props: { carparks, filters },
    revalidate: 1,
  }
}
