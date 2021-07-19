import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import { Chip } from '@material-ui/core'
import { useRouter } from 'next/router'
import { StyledCard, StyledCardProps } from './StyledCard'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
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
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  cardContainer: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3),
      width: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '40%',
      flex: 1,
      margin: theme.spacing(1, 1),
    },
  },
  cardContainerMargin: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(0),
    },
  },
}))

interface PostItem {
  slug: string
  title: string
  location: string
  parkingHours: string
  comments: number
  minimumSpending: string
  likes: number
  tags: { label: string }[]
  imagePath: string
}
const postItems: PostItem[] = [
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
  {
    slug: 'harborcity',
    location: '太古廣場',
    title: '3小時免費泊車優惠',
    parkingHours: '3',
    minimumSpending: '300',
    comments: 10,
    likes: 20,
    tags: [{ label: '寵物友善' }, { label: '有贈品' }],
    imagePath: '/taikoo.webp',
  },
]

interface IProps {}
export const PostSection = ({}: IProps) => {
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
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

  const renderPosts = (page: PostItem[]) => {
    return (
      <div className={classes.postContainer}>
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
                className={`${classes.cardContainer} ${
                  i === page.length - 1 && classes.cardContainerMargin
                }`}
              >
                <StyledCard
                  slug={slug}
                  imagePath={imagePath}
                  subHeader={title}
                  tags={tags}
                  likes={likes}
                  comments={comments}
                  header={location}
                  renderCaption={() => (
                    <div>
                      <StyledText size="h6">
                        {minSpendingCaption}
                      </StyledText>{' '}
                      <StyledText size="h6" bold>
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
      <StyledText className={classes.sectionTitle} size="h3" bold>
        鄰近你的泊車優惠
      </StyledText>
      {smOrAbove ? (
        <Carousel
          animation="slide"
          className={classes.carousel}
          autoPlay={false}
        >
          {windowPosts.map((page) => (
            <div>{renderPosts(page)}</div>
          ))}
        </Carousel>
      ) : (
        <>{renderPosts(smPosts)}</>
      )}
    </div>
  )
}
