import { makeStyles, Theme, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { useRouter } from 'next/router'
import { StyledCard, StyledCardProps } from './StyledCard'
import { useMediaQuery } from '@material-ui/core'
import UndecoratedLink from './UndecoratedLink'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
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
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3),
      flex: 1,
      maxWidth: '25%',

    },
    [theme.breakpoints.down('sm')]: {
      flex: '0.5',
      maxWidth: '45%',
      marginRight: theme.spacing(1.5),
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
      marginRight: theme.spacing(3),
      width: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1.5),
      width: '45%',

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
  parkingHours?: string
  comments?: number
  minimumSpending?: string
  likes?: number
  tags?: { label: string }[]
  imagePath: string
}
export interface PostSectionProps {
  sectionHeader: string
  fullWidth?: boolean
  fullCarousel?: boolean
  postItems: PostItem[]
  limited?: boolean
  renderButton?: () => JSX.Element
  renderSideLink?: () => JSX.Element
}
export const PostSection = ({
  sectionHeader,
  postItems,
  fullCarousel = false,
  fullWidth = false,
  limited = false,
  renderSideLink,
  renderButton,
}: PostSectionProps) => {
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

  const renderPosts = (page: PostItem[], fullImage = false, noWrap = false) => {
    return (
      <div
        className={`${classes.postContainer} ${
          noWrap && classes.postContainerWrap
        }`}
      >
        {page.map(
          (
            {
              slug,
              title,
              location,
              parkingHours,
              tags,
              comments,
              likes,
              imagePath,
              minimumSpending,
            },
            i
          ) => {
            const minSpendingCaption = `滿$${minimumSpending}`
            const hoursCaption = `泊${parkingHours}個鐘`
            return (
              <div
                className={`
                ${classes.cardContainer} 
                ${!noWrap && classes.cardContainerWrap} 
                ${fullWidth && classes.cardContainerFull} 
                ${(i + 1) % 2 === 0 && !noWrap && classes.cardContainerEven}
                ${noWrap && classes.cardContainerNoWrap}
                `}
              >
                <StyledCard
                  slug={slug}
                  imagePath={imagePath}
                  subHeader={title}
                  fullImage={fullImage}
                  tags={tags}
                  likes={likes}
                  comments={comments}
                  header={location}
                  renderCaption={() => (
                    <div>
                      <StyledText size="h6" inline={smOrAbove || fullWidth}>
                        {minSpendingCaption}
                      </StyledText>{' '}
                      <StyledText
                        size="h6"
                        inline={smOrAbove || fullWidth}
                        bold
                      >
                        {hoursCaption}
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
    <div className={classes.section}>
      <div className={classes.titleContainer}>
        <StyledText size={smOrAbove ? 'h3' : 'h4'} bold>
          {sectionHeader}
        </StyledText>
        {renderSideLink && renderSideLink()}
      </div>
      {fullCarousel ? (
        <div>{renderPosts(postItems, true, true)}</div>
      ) : smOrAbove ? (
        <Carousel
          swipe
          animation="slide"
          className={classes.carousel}
          autoPlay={false}
          indicators={false}
        >
          {windowPosts.map((page) => (
            <div>{renderPosts(page)}</div>
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
