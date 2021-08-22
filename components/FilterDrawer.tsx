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
import { FilterOption, Filters, FilterSection } from '../types/components/filters'

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
    padding: theme.spacing(1.5 ,1.5 ,1.5, 0),
    '& svg': {
        cursor: 'pointer',
    }
  },
  filterCatalogue: {
    display: 'flex',
  },

  filterOptionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiChip-root': {
      margin: theme.spacing(0, 1, 0.75, 0),
    },
  },
    filterTypeButton: {
        display: 'flex',
        padding: theme.spacing(1),
        '& .MuiFormControlLabel-label': {
            fontSize: '1rem',
        },
        cursor: 'pointer',
    },
    checkedItem: {
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
   
}))


interface SubFilterSectionProps {
  title: string
  subFilterState: boolean[]
  index: number
  subFilters: FilterOption[]
  updateFilters(subFilterState: boolean[], index: number): void
}

function SubFilterSection({
  title,
  subFilterState,
  subFilters,
  index,
  updateFilters,
}: SubFilterSectionProps) {
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
        subFilterState.map(() => false),
        index
      )
    } else {
      updateFilters(
        subFilterState.map(() => true),
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

export interface FilterDrawerProps {
  filters: FilterSection[]
  filterState: boolean[][]
  updateFilters(subFilters: boolean[], index: number): void
  applyFilters(filterType: keyof Filters | null): void
  locale: SupportedLanguages
}

export function FilterDrawer({
  filters,
  filterState,
  updateFilters,
  applyFilters,
  locale,
}: FilterDrawerProps) {
  const classes = useStyles()
  const { filterContinueBtnLabel } = translations[locale]
  return (
    <Drawer
      className={classes.panelDrawer}
      anchor={'bottom'}
      open={true}
    >
      <Container maxWidth="lg">
        <div className={classes.filterDrawerHeader}>
          <CloseIcon onClick={() => applyFilters(null)} />
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
          >
            {filterContinueBtnLabel}
          </Button>
        </div>
      </Container>
    </Drawer>
  )
}
