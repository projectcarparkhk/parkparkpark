import { makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import React from 'react'
import theme from '../styles/theme'
import { PostItem } from './Section'
import { StyledCard } from './StyledCard'
import { StyledText } from './StyledText'

const usePostStyles = makeStyles((theme: Theme) => ({
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      flex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '44vw',
      maxWidth: '45vw',
    },
  },
  cardContainerFull: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  cardContainerNoMargin: {
    marginRight: 0,
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
  const classes = usePostStyles(theme)
  const smOrAbove = useMediaQuery(theme.breakpoints.up('sm'))

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
              className={`${classes.cardContainer} 
              ${option?.fullWidth && classes.cardContainerFull} 
              ${
                smOrAbove &&
                i === page.length - 1 &&
                classes.cardContainerNoMargin
              }
              ${!smOrAbove && i % 2 !== 0 && classes.cardContainerNoMargin}
              `}
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
