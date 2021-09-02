import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { PostItem } from './Section'
import { StyledCard } from './StyledCard'
import { StyledText } from './StyledText'

const usePostStyles = makeStyles((theme: Theme) => ({
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flex: '1 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '40%',
      maxWidth: '49%',
      flex: '1 0 auto',
    },
  },
  cardContainerFull: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}))

interface RenderCardsProps {
  subPath?: string
  page: PostItem[]
  option?: {
    fullImage: boolean
    fullWidth: boolean
    smOrAbove: boolean
  }
}

export const RenderCards = ({ subPath, page, option }: RenderCardsProps) => {
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
          return (
            <div
              className={`${classes.cardContainer} ${
                option?.fullWidth && classes.cardContainerFull
              }`}
              key={slug}
              style={i % 2 === 0 ? {} : { marginRight: 0 }}
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
                subPath={subPath}
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
