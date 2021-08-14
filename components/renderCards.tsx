import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { PostItem } from './Section'
import { StyledCard } from './StyledCard'
import { StyledText } from './StyledText'

const usePostStyles = makeStyles(() => ({
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

interface StyleProps {
  index: number
}

const useCardStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  cardContainer: {
    marginBottom: theme.spacing(2),
    marginRight: (props) => (props.index % 2 === 0 ? theme.spacing(2) : '0'),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flex: 1,
      maxWidth: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: `calc(50% - ${theme.spacing(1)}px)`,
    },
  },
  cardContainerFull: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}))

interface RenderCardsProps {
  page: PostItem[]
  option?: {
    fullImage: boolean
    fullWidth: boolean
    smOrAbove: boolean
  }
}

export const RenderCards = ({ page, option }: RenderCardsProps) => {
  const classes = usePostStyles()

  return (
    <div className={`${classes.postContainer}`}>
      {page.map(
        (
          {
            slug,
            subtitle,
            title,
            location,
            tags,
            comments,
            likes,
            imagePath,
            shortDescription,
          },
          i
        ) => {
          const classes = useCardStyles({index: i})
          return (
            <div
              className={`${classes.cardContainer} ${
                option?.fullWidth && classes.cardContainerFull
              }`}
              key={slug}
            >
              <StyledCard
                slug={slug}
                imagePath={imagePath}
                subHeader={title}
                fullImage={option?.fullImage}
                tags={tags}
                likes={likes}
                comments={comments}
                header={location}
                index={i}
                renderCaption={() => (
                  <div style={{ color: option?.fullImage ? 'white' : 'black' }}>
                    <StyledText size="h4" bold>
                      {subtitle}
                    </StyledText>{' '}
                    <StyledText size="h6">{shortDescription}</StyledText>
                  </div>
                )}
              />
            </div>
          )
        }
      )}
    </div>
  )
}
