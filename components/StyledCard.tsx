import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core'
import React from 'react'
import { StyledText } from './StyledText'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import { Chip } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '90%',
    height: 'min-content',
  },
  media: {
    height: 140,
    position: 'relative',
    filter: 'blur(1.5px)'
  },
  mediaText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  fullImageMedia: {
    [theme.breakpoints.down('sm')]: {
      height: '10rem',
    },
    [theme.breakpoints.up('sm')]: {
      height: '20rem',
    },
  },
  iconSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9rem',
    },
  },
  iconContainerStart: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
    },
    marginRight: theme.spacing(0.5),
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
  titles: {
    marginBottom: theme.spacing(1),
  },
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
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
}))

export interface StyledCardProps {
  slug: string
  imagePath?: string
  fullImage?: boolean
  subHeader: string
  header?: string
  tags?: { label: string }[]
  renderCaption: () => JSX.Element
  likes?: number
  comments?: number
}

const StyledChip = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      height: '1.5rem',
    },
  },
  label: {
    padding: theme.spacing(0, 1),
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0.7),
      fontSize: '0.6rem',
    },
  },
}))(Chip)

const StyledCardContent = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
}))(CardContent)

export const StyledCard = ({
  slug,
  imagePath,
  fullImage,
  subHeader,
  header,
  tags,
  renderCaption,
  likes,
  comments,
}: StyledCardProps) => {
  const classes = useStyles(fullImage)
  const router = useRouter()
  return (
    <Card className={`${classes.card}`}>
      <CardActionArea onClick={() => router.push(`/${slug}`)}>
        <CardMedia
          className={`${classes.media} ${fullImage && classes.fullImageMedia}`}
          image={imagePath}
        />
        {fullImage ? (
          <div className={classes.mediaText}>{renderCaption()}</div>
        ) : (
          <StyledCardContent>
            <StyledText size="body1">{header}</StyledText>
            <StyledText className={classes.titles} size="h6" bold>
              {subHeader}
            </StyledText>
            <div>
              {tags &&
                tags.map((tag) => (
                  <StyledChip
                    className={classes.chip}
                    key={tag.label}
                    label={tag.label}
                  />
                ))}
            </div>

            <div className={classes.captionContainer}>
              {renderCaption()}
              <div className={classes.iconSection}>
                <div
                  className={`${classes.iconContainer} ${classes.iconContainerStart}`}
                >
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
          </StyledCardContent>
        )}
      </CardActionArea>
    </Card>
  )
}
