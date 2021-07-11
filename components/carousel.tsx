import { Paper, Button, Theme } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

interface IProps {
  items: {
    image: string
    postSlug: string
  }[]
  className?: string
}
const useStyles = makeStyles((theme: Theme) => ({
  carousel: {
    height: '25vh',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },

  },
  carouselContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const CarouselBanner = ({ items, className: klasses = "" }: IProps) => {
  const classes = useStyles()
  return (
    <div className={`${classes.carouselContainer} ${klasses}`}>
      <Carousel className={classes.carousel}>
        {items.map(({ image, postSlug }, i) => (
          <Paper key={postSlug}>
            <Link href={postSlug}>
              <div>
                <Image src={image} layout="fill" objectFit="cover" />
              </div>
            </Link>
          </Paper>
        ))}
      </Carousel>
    </div>
  )
}
