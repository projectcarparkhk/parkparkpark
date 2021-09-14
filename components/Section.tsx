import { makeStyles, SvgIconProps, Theme, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import Carousel from 'react-material-ui-carousel'
import { StyledText } from './StyledText'
import { useMediaQuery } from '@material-ui/core'
import { RenderCards } from './RenderCards'
import { RenderSlidingCards } from './RenderSlidingCards'
import translations from '../locales'
import FilterHdrIcon from '@material-ui/icons/FilterHdr'
import GestureIcon from '@material-ui/icons/Gesture'
import NatureIcon from '@material-ui/icons/Nature'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import locale from '../locales/zh'
import { useRouter } from 'next/router'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import Link from 'next/link'
import { AreaResponse } from '../types/api/AreaResponse'

interface IndexStyleProps {
  iconColor?: string
}

const useIconCircleStyle = makeStyles<Theme, IndexStyleProps>(
  (theme: Theme) => ({
    iconCircle: {
      padding: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(6),
      background: (props) => props.iconColor,
      '& svg': {
        fill: '#666',
        width: '0.95rem',
        height: '0.95rem',
        [theme.breakpoints.up('sm')]: {
          height: '2rem',
          width: '2rem',
        },
      },
    },
  })
)

const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3, 0),
    },
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
  areaIconContainer: {
    margin: theme.spacing(2, 0),
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
    textAlign: 'center',
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
  const classes = useStyles()
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
      {postItems.length > 0 ? (
        <div>
          <div className={classes.titleContainer}>
            <div className={classes.sectionTitle}>
              <StyledText size="h3" bold>
                {sectionHeader}
              </StyledText>
            </div>
            {renderSideLink && renderSideLink()}
          </div>
          {slidingCard ? (
            <div>
              <RenderSlidingCards
                subPath={subPath}
                page={postItems}
                option={{ fullImage: true }}
              />
            </div>
          ) : fullImage ? (
            <div>
              <RenderCards
                subPath={subPath}
                page={postItems}
                option={{ fullImage: true, fullWidth, smOrAbove }}
              />
            </div>
          ) : smOrAbove ? (
            <Carousel
              swipe
              animation="slide"
              className={classes.carousel}
              autoPlay={false}
              indicators={false}
            >
              {windowPosts.map((page) => (
                <div key={page.map((elem) => elem.slug).join(',')}>
                  <RenderCards
                    subPath={subPath}
                    page={page}
                    option={{ fullImage, fullWidth, smOrAbove }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <>
              <RenderCards
                subPath={subPath}
                page={limited ? smPosts : postItems}
                option={{ fullImage, fullWidth, smOrAbove }}
              />
            </>
          )}
          {renderButton && (
            <div className={classes.buttonContainer}>{renderButton()}</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

interface AreaCategoryProps {
  areas: AreaResponse[]
}

const areaConfig = [
  {
    icon: FilterHdrIcon,
    color: '#e4f3ea',
  },
  {
    icon: GestureIcon,
    color: '#ffece8',
  },
  {
    icon: NatureIcon,
    color: '#fff6e4',
  },
  {
    icon: MoreHorizIcon,
    color: '#f0edfc',
  },
]

interface IconCircleProps {
  color: string
  children: React.ReactElement<SvgIconProps>
}

function IconCircle({ color, children }: IconCircleProps) {
  const classes = useIconCircleStyle({
    iconColor: color,
  })

  return <div className={classes.iconCircle}>{children}</div>
}

export const AreaCategory = ({ areas }: AreaCategoryProps) => {
  const classes = useStyles()
  const { locale } = useRouter()
  const fallbackLocale = (locale as SupportedLanguages) || 'zh'
  const { areaSelection } = translations[fallbackLocale]
  return (
    <div>
      <div className={classes.sectionTitle}>
        <StyledText size="h3" bold>
          {areaSelection}
        </StyledText>
      </div>
      <div className={classes.areaIconContainer}>
        {[
          ...areas,
          {
            _id: 'more',
            name: {
              en: 'More',
              zh: '更多',
            },
            slug: 'more',
          },
        ].map((area, i) => {
          const { icon: Icon, color } = areaConfig[i]
          return (
            <Link
              href={{
                pathname: '/search-all',
                query: { ['sub-district']: area.slug },
              }}
              key={area._id}
            >
              <div>
                <IconCircle color={color}>
                  <Icon />
                </IconCircle>
                {area.name[fallbackLocale]}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
