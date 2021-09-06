import React from 'react'
import translations from '../../locales'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, Theme } from '@material-ui/core'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { Filters, FilterCounts } from '../../types/components/filters'

export interface FilterCatalogueProps {
  filterTypes: (keyof Filters)[]
  locale: SupportedLanguages
  applyFilterCatalogue(activeItem?: keyof Filters | null): void
  filterCounts: FilterCounts
}

const useStyles = makeStyles((theme: Theme) => ({
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
  active: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  count: {
    marginLeft: theme.spacing(1),
  },
}))

export function FilterCatalogue({
  applyFilterCatalogue,
  filterCounts,
  filterTypes,
  locale,
}: FilterCatalogueProps) {
  const classes = useStyles()
  return (
    <div className={classes.filterCatalogue}>
      {filterTypes.map((type) => {
        return (
          <div
            key={type}
            className={`${classes.filterTypeButton} ${
              filterCounts[type] > 0 && classes.active
            }`}
            onClick={() => applyFilterCatalogue(type)}
          >
            <div>{translations[locale][type]}</div>
            {filterCounts[type] > 0 && (
              <span className={classes.count}>({filterCounts[type]})</span>
            )}
            <ExpandMoreIcon />
          </div>
        )
      })}
    </div>
  )
}
