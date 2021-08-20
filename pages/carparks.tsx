import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Header from '../components/header'
import { StyledText } from '../components/StyledText'
import { getCarparks, getCarparksforFilters } from '../sanityApi/carparks'
import Container from '@material-ui/core/Container'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { useRouter } from 'next/router'
import { cloneDeep } from 'lodash'
import { FilterConfig, FilterableItem } from '../types/FilterResponse'
import {
  FilterDrawer,
  filterItems,
  FilterCatalogue,
} from '../components/FilterDrawer'
import { getTags } from '../sanityApi/tags'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import {
  Filters,
  structureCarparks,
  structureFilters,
} from '../sanityApi/toApplication/carparks'
import { SupportedLanguages } from '../constants/SupportedLanguages'

const FILTER_CONFIG: FilterConfig = {
  areas: 'subDistricts',
  categories: 'tags',
}

interface CarparkItem {
  name: {
    [key: string]: string
  }
  subDistricts: {
    name: {
      [key: string]: string
    }
  }[]
}

interface CarparkListProps {
  carpark: CarparkItem
  locale: SupportedLanguages
}
interface IProps {
  filters: Filters
  carparks: CarparkItem[]
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

function CarparkListItem({ carpark, locale }: CarparkListProps) {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <StyledText size="h4" bold inline={false}>
        {carpark.name[locale]}
      </StyledText>

      <div>
        {carpark.subDistricts.map((subDistrict) => {
          return (
            <span key={subDistrict.name[locale]}>
              <StyledText size="body1" inline={true}>
                {subDistrict.name[locale]}
              </StyledText>
            </span>
          )
        })}
      </div>
    </Card>
  )
}

function Carparks({ carparks, filters }: IProps) {
  const [filterState, setFilterState] = useState({
    areas: filters.areas.map((area) => area.subFilters.map((_) => false)),
    categories: filters.categories.map((category) =>
      category.subFilters.map((_) => false)
    ),
  })
  const [activePanel, setActivePanel] = useState<null | keyof FilterConfig>(
    null
  )

  const onFilterUpdate = useCallback(
    (subFilters: boolean[], index: number) => {
      if (activePanel) {
        const newFilterState = cloneDeep(filterState)
        newFilterState[activePanel][index] = subFilters
        setFilterState(newFilterState)
      }
    },
    [filterState]
  )

  return (
    <Container>
      <Header imageToTop={false} />
      <FilterCatalogue
        applyFilterCatalogue={(activeItem: keyof FilterConfig) =>
          setActivePanel(activeItem)
        }
        config={FILTER_CONFIG}
      />
      {activePanel && (
        <FilterDrawer
          filters={activePanel && filters[activePanel]}
          filterState={activePanel && filterState[activePanel]}
          updateFilters={onFilterUpdate}
          applyFilters={setActivePanel}
        />
      )}
      <div>
        {filterItems(carparks, masterFilter, FILTER_CONFIG).map(
          (carpark: FilterableItem) => {
            return <CarparkListItem key={carpark._id} carpark={carpark} />
          }
        )}
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
