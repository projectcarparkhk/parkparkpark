import { makeStyles, Theme, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { useMediaQuery } from '@material-ui/core'
import { RenderCards } from './RenderCards'
import { RenderSlidingCards } from './RenderSlidingCards'

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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(6),
    },
  },
}))

export interface PostItem {
  slug: string
  title?: string
  subtitle?: string
  location?: string
  comments?: number
  likes?: number
  tags?: { label: string }[]
  imagePath: string
  shortDescription?: string
}
export interface SectionProps {
  sectionHeader: string
  postItems: PostItem[]
  fullWidth?: boolean
  slidingCard?: boolean
  fullImage?: boolean
  limited?: boolean
  subPath?: string
  renderButton?: () => JSX.Element
  renderSideLink?: () => JSX.Element
}
export const Section = ({
  sectionHeader,
  postItems,
  slidingCard = false,
  fullImage = false,
  fullWidth = false,
  limited = false,
  subPath,
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

  return (
    <div>
      <div className={classes.titleContainer}>
        <StyledText size={smOrAbove ? 'h3' : 'h4'} bold>
          {sectionHeader}
        </StyledText>
        {renderSideLink && renderSideLink()}
      </div>
      {slidingCard ? (
        <div><RenderSlidingCards page={postItems} option={{ fullImage: true }}/></div>
      ) : fullImage ? (
        <div><RenderCards subPath={subPath} page={postItems} option={ {fullImage: true, fullWidth, smOrAbove} } /></div>
      ) : smOrAbove ? (
        <Carousel
          swipe
          animation="slide"
          className={classes.carousel}
          autoPlay={false}
          indicators={false}
        >
          {windowPosts.map((page) => (
            <div key={page.map(elem => elem.slug).join(',')}><RenderCards subPath={subPath} page={page} option= {{ fullImage, fullWidth, smOrAbove }}/></div>
          ))}
        </Carousel>
      ) : (
        <><RenderCards subPath={subPath} page={limited ? smPosts : postItems} option={{ fullImage, fullWidth, smOrAbove }}/></>
      )}
      {renderButton && (
        <div className={classes.buttonContainer}>{renderButton()}</div>
      )}
    </div>
  )
}

