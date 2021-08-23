import React from "react"
import translations from "../../locales"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { makeStyles, Theme } from "@material-ui/core"
import { SupportedLanguages } from "../../constants/SupportedLanguages"
import { Filters } from "../../types/components/filters"

export interface FilterCatalogueProps {
  filterTypes: (keyof Filters)[]
  locale: SupportedLanguages
  applyFilterCatalogue(activeItem?: keyof Filters | null): void
}

const useStyles = makeStyles((theme: Theme) => ({
  filterCatalogue: {
    display: "flex",
  },
  filterTypeButton: {
    display: "flex",
    padding: theme.spacing(1),
    "& .MuiFormControlLabel-label": {
      fontSize: "1rem",
    },
  },
}))

export function FilterCatalogue({
  applyFilterCatalogue,
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
            className={classes.filterTypeButton}
            onClick={() => applyFilterCatalogue(type)}
          >
            <div>{translations[locale][type]}</div>
            <ExpandMoreIcon />
          </div>
        )
      })}
    </div>
  )
}
