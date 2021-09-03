import { Theme, makeStyles } from '@material-ui/core'
import React from 'react'
import Card from '@material-ui/core/Card'
import { StyledText } from '../StyledText'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { CarparkItem } from '../../types/components/filters'
import { StyledChip } from '../StyledChip'
import { imageBuilder } from '../../sanityApi/sanity'

interface CarparkListProps {
  carpark: CarparkItem
  locale: SupportedLanguages
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    padding: theme.spacing(2, 1),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'center center',
    width: '80px',
    height: '80px',
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  subDistricts: {
    marginRight: theme.spacing(1),
  },
  chipContainer: {
    marginTop: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: '5px',
    padding: theme.spacing(0),
  },
}))

export default function CarparkListItem({ carpark, locale }: CarparkListProps) {
  const classes = useStyles()
  const { name, imagePath, subDistricts, tags } = carpark
  return (
    <Card className={classes.card}>
      <img
        className={classes.image}
        src={imageBuilder(imagePath).width(144).height(144).url() || '/hk.webp'}
      />
      <div>
        <div className={classes.subDistricts}>
          <StyledText size="subtitle2" inline={true}>
            {subDistricts
              .map((subDistrict) => subDistrict.name[locale])
              .join('/')}
          </StyledText>
        </div>
        <StyledText size="h4" bold inline={false}>
          {name[locale]}
        </StyledText>
        <div className={classes.chipContainer}>
          {tags &&
            tags.map((tag) => (
              <StyledChip className={classes.chip} label={tag.name[locale]} />
            ))}
        </div>
      </div>
    </Card>
  )
}
