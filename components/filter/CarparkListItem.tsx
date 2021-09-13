import { Theme, makeStyles, CardActionArea } from '@material-ui/core'
import React from 'react'
import Card from '@material-ui/core/Card'
import { StyledText } from '../StyledText'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { CarparkItem } from '../../types/components/filters'
import { StyledChip } from '../StyledChip'
import { imageBuilder } from '../../sanityApi/sanity'
import { useRouter } from 'next/router'

interface CarparkListProps {
  carpark: CarparkItem
  locale: SupportedLanguages
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  cardActionArea: {
    display: 'flex',
    padding: theme.spacing(2, 1),
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'center center',
    width: '80px',
    height: '80px',
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  cardContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: '5px',
    padding: theme.spacing(0),
  },
}))

export default function CarparkListItem({ carpark, locale }: CarparkListProps) {
  const classes = useStyles()
  const router = useRouter()
  const { name, imagePath, subDistricts, tags, slug } = carpark
  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => router.push(`/carpark/${slug}`)}
      >
        <img
          className={classes.image}
          src={
            imageBuilder(imagePath).width(144).height(144).url() || '/hk.webp'
          }
        />
        <div className={classes.cardContent}>
          <div>
            <StyledText size="body1" inline={true}>
              {subDistricts
                .map((subDistrict) => subDistrict.name[locale])
                .join('/')}
            </StyledText>
            <StyledText size="h4" bold inline={false}>
              {name[locale]}
            </StyledText>
          </div>
          <div>
            {tags &&
              tags.map((tag) => (
                <StyledChip
                  key={tag._id}
                  className={classes.chip}
                  label={tag.name[locale]}
                />
              ))}
          </div>
        </div>
      </CardActionArea>
    </Card>
  )
}
