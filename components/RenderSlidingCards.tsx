import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import theme from '../styles/theme'
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

const useCardStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}))

interface RenderCardsProps {
  subPath?: string
  page: PostItem[]
  option?: {
    fullImage: boolean
  }
}

export const RenderSlidingCards = ({
  subPath,
  page,
  option,
}: RenderCardsProps) => {
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
          const classes = useCardStyles(theme)
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
                subPath={subPath}
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
