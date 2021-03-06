import { Paper } from '@material-ui/core'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

interface IProps {
  items: {
    imagePath: string
    slug: string
  }[]
  className?: string
  subPath?: string
}
const useStyles = makeStyles(() => ({
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

export const CarouselBanner = ({
  items,
  subPath,
  className: klasses = '',
}: IProps) => {
  const classes = useStyles()
  return (
    <div className={`${classes.carouselContainer} ${klasses}`}>
      <Carousel className={classes.carousel}>
        {items.map(({ imagePath, slug }) => (
          <Paper key={slug}>
            <Link href={`${subPath}/${slug}`}>
              <div style={{ height: '20vh' }}>
                <Image src={imagePath} layout="fill" objectFit="cover" />
              </div>
            </Link>
          </Paper>
        ))}
      </Carousel>
    </div>
  )
}
