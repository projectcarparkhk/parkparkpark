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
} from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import { Chip } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold'
  },
  carousel: {
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  postContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    marginRight: theme.spacing(3),
    width: '25%',
  },
  media: {
    height: 140,
  },
  iconSection: {
    display: 'flex',
    alignItems: 'center',
    width: '35%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    flex: 1,
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
  titles: {},
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: '5px',
    padding: theme.spacing(0),
  },
  caption: {
    fontWeight: 'bold',
  },
  captionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(4),
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

  return (
    <div className={classes.section}>
      <StyledText className={classes.sectionTitle} size="h3">鄰近你的泊車優惠</StyledText>
      <Carousel animation="slide" className={classes.carousel} autoPlay={false}>
        {windowPosts.map((page) => (
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
                const caption = `滿$${minimumSpending} 泊${parkingHours}個鐘`
                return (
                  <Card
                    className={classes.card}
                    style={i === page.length - 1 ? { marginRight: 0 } : {}}
                  >
                    <CardActionArea onClick={() => router.push(`/${slug}`)}>
                      <CardMedia className={classes.media} image={imagePath} />
                      <CardContent>
                        <StyledText size="body1">{location}</StyledText>
                        <StyledText className={classes.titles} size="h6">
                          {title}
                        </StyledText>
                        <div>
                          {tags.map((tag) => (
                            <Chip
                              className={classes.chip}
                              key={tag.label}
                              label={tag.label}
                            />
                          ))}
                        </div>

                        <div className={classes.captionContainer}>
                          <StyledText className={classes.caption} size="h6">
                            {caption}
                          </StyledText>
                          <div className={classes.iconSection}>
                            <div className={classes.iconContainer}>
                              <div className={classes.icons}>
                                <FavoriteBorderIcon fontSize="inherit" />
                              </div>
                              <div>{likes}</div>
                            </div>
                            <div className={classes.iconContainer}>
                              <div className={classes.icons}>
                                <ChatBubbleOutlineIcon fontSize="inherit" />
                              </div>
                              <div>{comments}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}
