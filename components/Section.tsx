import { makeStyles, Theme, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { StyledCard } from './StyledCard'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  carousel: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  postContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  postContainerWrap: {
    flexWrap: 'nowrap',
    overflowX: 'scroll',
  },
  cardContainer: {
    marginBottom: theme.spacing(2),
  },
  cardContainerWrap: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flex: 1,
      maxWidth: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
  cardContainerEven: {
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0),
    },
  },
  cardContainerFull: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      margin: theme.spacing(1, 0),
    },
  },
  cardContainerNoWrap: {
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(6),
    },
  },
}))

interface PostItem {
  slug: string
  title: string
  location?: string
  comments?: number
  likes?: number
  tags?: { label: string }[]
  imagePath: string
  shortDescription?: string
}
export interface SectionProps {
  sectionHeader: string
  fullWidth?: boolean
  slidingCard?: boolean
  postItems: PostItem[]
  limited?: boolean
  renderButton?: () => JSX.Element
  renderSideLink?: () => JSX.Element
}
export const Section = ({
  sectionHeader,
  postItems,
  slidingCard = false,
  fullWidth = false,
  limited = false,
  renderSideLink,
  renderButton,
}: SectionProps) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const smOrAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const windowPosts = useMemo(() => {
    let window: PostItem[] = []
    return postItems.reduce((acc, item, i) => {
      if (window.length === 3 || i === postItems.length - 1) {
        window.push(item)
        acc.push(window)
        window = []
      } else {
        window.push(item)
      }
      return acc
    }, [] as PostItem[][])
  }, [postItems])

  const smPosts = useMemo(() => postItems.slice(0, 4), [postItems])

  const renderPosts = (
    page: PostItem[],
    option?: { fullImage: boolean; noWrap: boolean }
  ) => {
    return (
      <div
        className={`${classes.postContainer} ${
          option?.noWrap && classes.postContainerWrap
        }`}
      >
        {page.map(
          ({
            slug,
            title,
            location,
            tags,
            comments,
            likes,
            imagePath,
            shortDescription,
          }) => {
            return (
              <div
                className={`
                ${classes.cardContainer} 
                ${!option?.noWrap && classes.cardContainerWrap} 
                ${fullWidth && classes.cardContainerFull} 
                ${option?.noWrap && classes.cardContainerNoWrap}
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
                  renderCaption={() => (
                    <div style={{color: 'white', padding: '1rem'}}>
                      <StyledText size="h4" inline={smOrAbove || fullWidth} bold>
                        {title}
                      </StyledText>{' '}
                      <StyledText
                        size="h6"
                        inline={smOrAbove || fullWidth}
                        bold
                      >
                        {shortDescription && (shortDescription.slice(0,18) + '...')}
                      </StyledText>
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

  return (
    <div>
      <div className={classes.titleContainer}>
        <StyledText size={smOrAbove ? 'h3' : 'h4'} bold>
          {sectionHeader}
        </StyledText>
        {renderSideLink && renderSideLink()}
      </div>
      {slidingCard ? (
        <div>{renderPosts(postItems, { fullImage: true, noWrap: true })}</div>
      ) : smOrAbove ? (
        <Carousel
          swipe
          animation="slide"
          className={classes.carousel}
          autoPlay={false}
          indicators={false}
        >
          {windowPosts.map((page, i) => (
            <div key={i}>{renderPosts(page)}</div>
          ))}
        </Carousel>
      ) : (
        <>{renderPosts(limited ? smPosts : postItems)}</>
      )}
      {renderButton && (
        <div className={classes.buttonContainer}>{renderButton()}</div>
      )}
    </div>
  )
}
