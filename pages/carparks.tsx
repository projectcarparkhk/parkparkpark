import React, { useState, useMemo, useCallback } from 'react'
import Header from '../components/header'
import { getCarparks} from '../sanityApi/carparks'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import { cloneDeep } from 'lodash'
import {
  FilterDrawer,
} from '../components/FilterDrawer'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import {
  structureCarparks,
  structureFilters,
} from '../sanityApi/toApplication/carparks'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import CarparkListItem from '../components/filter/CarparkListItem'
import { FilterCatalogue } from '../components/filter/FilterCatalogue'
import { CarparkItem, FilterSection } from '../types/filters'
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

interface FilterState {
  areas: boolean[][]
  categories: boolean[][]
}

function Carparks({ carparks, filters }: IProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    areas: filters.areas.map((area) => area.subFilters.map((_) => false)),
    categories: filters.categories.map((category) =>
      category.subFilters.map((_) => false)
    ),
  })
  const [activePanel, setActivePanel] = useState<null | keyof FilterState>(
    null
  )

  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'

  const onFilterUpdate = useCallback(
    (subFilters: boolean[], index: number) => {
      if (activePanel) {
        const newFilterState = cloneDeep(filterState)
        newFilterState[activePanel][index] = subFilters
        setFilterState(newFilterState)
      }
    },
    [filterState, activePanel]
  )

  const filteredCarparkList = useMemo(() => {
    const filterKeys = Object.keys(filterState) as Array<keyof FilterState>
    const filteredIds: { areas: string[]; categories: string[] } = {
      areas: [],
      categories: [],
    }
    for (const key of filterKeys) {
      const subSections = filters[key]
      for (let index = 0; index < subSections.length; index++) {
        const subFilters = subSections[index].subFilters
        const filteredSubFilters = subFilters.filter(
          (_, subIndex) => filterState[key][index][subIndex]
        )
        filteredIds[key].push(
          ...filteredSubFilters.map((subFilter) => subFilter._id)
        )
      }
    }

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
  }, [filterState, filters, carparks])

  return (
    <Container>
      <Header imageToTop={false} />
      <FilterCatalogue
        applyFilterCatalogue={(activeItem: keyof Filters) =>
          setActivePanel(activeItem)
        }
        filterTypes={FILTER_TYPES}
        locale = {fallbackLocale as SupportedLanguages}
      />
      {activePanel && (
        <FilterDrawer
          filters={activePanel && filters[activePanel]}
          filterState={activePanel && filterState[activePanel]}
          updateFilters={onFilterUpdate}
          applyFilters={setActivePanel}
          locale = {fallbackLocale as SupportedLanguages}
        />
      )}
      <div>
        {filteredCarparkList.map((carpark) => (
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
