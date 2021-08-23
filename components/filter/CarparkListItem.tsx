import { Theme, makeStyles } from "@material-ui/core"
import React from "react"
import Card from "@material-ui/core/Card"
import { StyledText } from "../StyledText"
import { SupportedLanguages } from "../../constants/SupportedLanguages"
import { CarparkItem } from "../../types/components/filters"


interface CarparkListProps {
  carpark: CarparkItem
  locale: SupportedLanguages
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))


export default function CarparkListItem({ carpark, locale }: CarparkListProps) {
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