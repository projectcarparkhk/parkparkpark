import React, { useState, useEffect, useMemo, useCallback } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {
  Area,
  Category,
  FilterResponse,
  FilterConfig,
  SubFilterConfig,
  FilterCatalogueProps,
  FilterSectionProps,
  FilterableItem,
} from '../types/FilterResponse'
import translations from '../locales/components/filterDrawer'
import { useRouter } from 'next/router'
import { FilterSection } from '../sanityApi/toApplication/carparks'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  panelDrawer: {
    '& .MuiDrawer-paper': {
      height: '100vh',
    },
  },
  filterDrawerHeader: {
    height: theme.spacing(6),
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
  },
  filterCatalogue: {
    display: 'flex',
  },
  filterTypeButton: {
    display: 'flex',
    padding: theme.spacing(1),
    '& .MuiFormControlLabel-label': {
      fontSize: '1rem',
    },
  },
  filterOptionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiChip-root': {
      margin: theme.spacing(0, 1, 0.75, 0),
    },
  },
}))

// const isAllChecked = (options: FilterOption[]) => options.every(option => option.checked)
// const isSomeChecked = (options: FilterOption[]) => options.some(option => option.checked)

function FilterSectionx({
  title,
  subFilterState,
  subFilters,
  index,
  updateFilters,
}: FilterSectionProps) {
  const classes = useStyles()
  const {locale} = useRouter();

  const fallbackLocale = locale || 'zh'
  // i think the selection should be the only source of truth and should govern the "prop" of the parent checkbox
  // therefore should not have its own state
  const parentCheckBoxStatus = useMemo(() => {
    if (subFilterState.every((checked) => checked)) {
      return 'all'
    } else if (subFilterState.some((checked) => checked)) {
      return 'some'
    } else {
      return 'none'
    }
  }, [subFilterState])

  const onFilterUpdate = useCallback(() => {
    if (parentCheckBoxStatus === 'all' || parentCheckBoxStatus === 'some') {
      updateFilters(
        subFilterState.map((_) => false),
        index
      )
    } else {
      updateFilters(
        subFilterState.map((_) => true),
        index
      )
    }
  }, [subFilterState, parentCheckBoxStatus, index])

  const onSubFilterUpdate = useCallback((index: number, subIndex: number) => {
    const newSubFilterState = subFilterState.slice();
    newSubFilterState[subIndex] = !newSubFilterState[subIndex];
    updateFilters(newSubFilterState, index);

  }, [subFilterState, index])

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={parentCheckBoxStatus === 'all'}
            onChange={onFilterUpdate}
            name="checkedF"
            indeterminate={parentCheckBoxStatus === 'some'}
          />
        }
        label={title}
      />
      <div className={classes.filterOptionContainer}>
        {subFilters.map((subFilter, subIndex: number) => {
          return (
            <Chip
              onClick={()=>onSubFilterUpdate(index, subIndex)}
              variant={subFilterState[subIndex] ? 'default' : 'outlined'}
              size="small"
              key={subFilter._id}
              label={subFilter.name[fallbackLocale]}
            />
          )
        })}
      </div>
    </div>
  )
}

function filteredCollected(filters: FilterResponse) {
  const collectedTrueKeys: {
    subDistricts: string[]
    tags: string[]
  } = {
    subDistricts: [],
    tags: [],
  }
  const { areas, categories } = filters

  for (const area of areas) {
    for (const subDistrict of area.subDistricts) {
      if (subDistrict.checked) {
        collectedTrueKeys.subDistricts.push(subDistrict.slug)
      }
    }
  }

  for (const category of categories) {
    for (const tag of category.tags) {
      if (tag.checked) {
        collectedTrueKeys.tags.push(tag.slug)
      }
    }
  }

  return collectedTrueKeys
}

export function FilterCatalogue({
  config,
  applyFilters,
}: FilterCatalogueProps) {
  const classes = useStyles()
  const { locale } = useRouter()
  return (
    <div className={classes.filterCatalogue}>
      {Object.keys(config).map((value) => {
        return (
          <div
            key={value}
            className={classes.filterTypeButton}
            onClick={() => applyFilters(value)}
          >
            <div>{translations[locale || 'zh'][value]}</div>
            <ExpandMoreIcon />
          </div>
        )
      })}
    </div>
  )
}

export function filterItems(
  items: FilterableItem[],
  filters: FilterResponse,
  config: FilterConfig
) {
  const filterKeys = Object.values(config)
  const collectedFilters = filteredCollected(filters)
  return items.filter((item: FilterableItem) => {
    return filterKeys.every((key: keyof SubFilterConfig) => {
      if (!collectedFilters[key].length) {
        return true
      }
      return item[key]
        .map((e) => e.slug)
        .some((keyEle: string) => {
          return collectedFilters[key].includes(keyEle)
        })
    })
  })
}

export interface FilterDrawerProps {
  filters: FilterSection[]
  filterState: boolean[][]
  updateFilters(subFilters: boolean[], index: number): void
  applyFilters(filterType: keyof FilterConfig | null): void
}

export function FilterDrawer({
  filters,
  filterState,
  updateFilters,
  applyFilters,
}: FilterDrawerProps) {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = locale || 'zh'
  return (
    <Drawer
      className={classes.panelDrawer}
      anchor={'bottom'}
      open={true}
      onClose={() => applyFilters(null)}
    >
      <Container maxWidth="lg">
        <div className={classes.filterDrawerHeader}>
          <CloseIcon onClick={() => applyFilters(null)} />
          {/* <Button
                    variant="outlined"
                    onClick={() => {
                        const newSelectedFilters = selectedFilter.map(parentItem => ({
                            ...parentItem,
                            [child]: parentItem[child].map(childItem => ({
                                ...childItem,
                                checked: false
                            }))
                        }))
                        setSelectedFilter(newSelectedFilters)
                        updateFilters(newSelectedFilters)
                    }}
                >
                    清除
                </Button> */}
        </div>
        <div>
          {filters.map((filter, i) => {
            return (
              <FilterSectionx
                key={filter.name[fallbackLocale]}
                title={filter.name[fallbackLocale]}
                subFilters={filter.subFilters}
                subFilterState={filterState[i]}
                index={i}
                updateFilters={updateFilters}
              />
            )
          })}
        </div>
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => applyFilters(null)}
          >
            繼續
          </Button>
        </div>
      </Container>
    </Drawer>
  )
}
