import React, { useMemo, useCallback } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import translations from '../locales'
import { useRouter } from 'next/router'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import {
  FilterOption,
  Filters,
  FilterSection,
} from '../types/components/filters'
import { useState } from 'react'
import { cloneDeep } from 'lodash'

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
    '& svg': {
      cursor: 'pointer',
    },
  },
  filterOptionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiChip-root': {
      margin: theme.spacing(0, 1, 0.75, 0),
    },
  },
  selectedChip: {
    color: 'white',
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))

interface SubFilterSectionProps {
  title: string
  subFilterState: boolean[]
  index: number
  subFilters: FilterOption[]
  onFilterStateUpdate(subFilterState: boolean[], index: number): void
}

function SubFilterSection({
  title,
  subFilterState,
  subFilters,
  index,
  onFilterStateUpdate,
}: SubFilterSectionProps) {
  const classes = useStyles()
  const { locale } = useRouter()

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
      onFilterStateUpdate(
        subFilterState.map(() => false),
        index
      )
    } else {
      onFilterStateUpdate(
        subFilterState.map(() => true),
        index
      )
    }
  }, [subFilterState, parentCheckBoxStatus, index])

  const onSubFilterUpdate = (subIndex: number) => {
    const newSubFilterState = subFilterState.slice()
    newSubFilterState[subIndex] = !newSubFilterState[subIndex]
    onFilterStateUpdate(newSubFilterState, index)
  }

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
              onClick={() => onSubFilterUpdate(subIndex)}
              variant={subFilterState[subIndex] ? 'default' : 'outlined'}
              className={subFilterState[subIndex] ? classes.selectedChip : ''}
              color={subFilterState[subIndex] ? 'primary' : 'default'}
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

export interface FilterDrawerProps {
  filters: FilterSection[]
  filterStateProps: boolean[][]
  onUpdateRoute: (subFilterState: boolean[][]) => void
  setActivePanel(filterType: keyof Filters | null): void
  locale: SupportedLanguages
}

export function FilterDrawer({
  filters,
  filterStateProps,
  onUpdateRoute,
  setActivePanel,
  locale,
}: FilterDrawerProps) {
  const classes = useStyles()
  const { filterContinueBtnLabel } = translations[locale]
  const [filterState, setFilterState] = useState(filterStateProps)

  const onFilterStateUpdate = useCallback(
    (subFilterState: boolean[], index: number) => {
      const newFilterState = cloneDeep(filterState)
      newFilterState[index] = subFilterState
      setFilterState(newFilterState)
    },
    [filterState]
  )
  return (
    <Drawer className={classes.panelDrawer} anchor={'bottom'} open={true}>
      <Container maxWidth="lg">
        <div className={classes.filterDrawerHeader}>
          <CloseIcon onClick={() => setActivePanel(null)} />
        </div>
        <div>
          {filters.map((filter, i) => {
            return (
              <SubFilterSection
                key={filter.name[locale]}
                title={filter.name[locale]}
                subFilters={filter.subFilters}
                subFilterState={filterState[i]}
                index={i}
                onFilterStateUpdate={onFilterStateUpdate}
              />
            )
          })}
        </div>
        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              onUpdateRoute(filterState)
              setActivePanel(null)
            }}
          >
            {filterContinueBtnLabel}
          </Button>
        </div>
      </Container>
    </Drawer>
  )
}
