import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { PostItem } from './Section'
import { StyledCard } from './StyledCard'
import { StyledText } from './StyledText'

const usePostStyles = makeStyles(() => ({
  postContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
  },
}))

interface StyleProps {
  index: number
}

const useCardStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  cardContainer: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}))

interface RenderCardsProps {
  page: PostItem[]
  option?: {
    fullImage: boolean
  }
}

export const RenderSlidingCards = ({ page, option }: RenderCardsProps) => {
  const classes = usePostStyles()
  return (
    <div className={`${classes.postContainer}`}>
      {page.map(
        (
          {
            slug,
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
          const classes = useCardStyles({ index: i })
          return (
            <div className={classes.cardContainer} key={slug}>
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
                  <div>
                    <div style={{ color: 'white' }}>
                      <StyledText size="h4" bold>
                        {title}
                      </StyledText>{' '}
                      <StyledText size="h6" bold>
                        {shortDescription &&
                          shortDescription.slice(0, 35) + '...'}
                      </StyledText>
                    </div>
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
