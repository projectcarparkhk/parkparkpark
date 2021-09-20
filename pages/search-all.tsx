import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Header from '../components/header'
import { getSubDistrictsGroupByArea } from '../sanityApi/subDistricts'
import { getTags } from '../sanityApi/tags'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import { StyledText } from '../components/StyledText'
import { getArrayData } from '../sanityApi/helper'
import { SupportedLanguages } from '../constants/SupportedLanguages'
import { AreaResponse } from '../types/api/AreaResponse'
import { TagResponse } from '../types/api/TagResponse'
import translations from '../locales'
import { ResponseElement } from '../types/api/ResponseElement'

interface ListProps {
  preview?: boolean
  locale: SupportedLanguages
}
interface SubDistrictListProps extends ListProps {
  areas: AreaResponse[]
}
interface TagListProps extends ListProps {
  tags: TagResponse[]
}

interface SearchAllPageProps extends ListProps {
  areas: AreaResponse[]
  tags: TagResponse[]
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    margin: theme.spacing(2, 0),
  },
  flexItem: {
    margin: theme.spacing(0, 1, 1, 0),
  },
  pageTypeButtonContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    height: theme.spacing(5),
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  currentPageTypeButton: {
    fontWeight: 700,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  pageTypeButton: {
    fontWeight: 700,
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
}))

function TagList({ tags, locale }: TagListProps) {
  const classes = useStyles()
  return (
    <>
      <div>
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={{
              pathname: '/carparks',
              query: { tags: tag.slug },
            }}
          >
            <Button
              className={classes.flexItem}
              variant="outlined"
              color="primary"
            >
              <StyledText size="subtitle1">{tag.name[locale]}</StyledText>
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}

function SubDistrictList({ areas, locale }: SubDistrictListProps) {
  const classes = useStyles()
  const { query } = useRouter()
  const [selectedArea, setSelectedArea] = useState(
    query['sub-district'] || areas[0].slug
  )

  const { subDistricts: subDistrictsLabel } = translations[locale]
  const subDistricts = useMemo(
    () =>
      getArrayData(areas.find((area) => area.slug === selectedArea))
        .subDistricts,
    [areas, selectedArea]
  )
  return (
    <>
      <div className={classes.section}>
        {areas.map((area) => (
          <Chip
            key={area._id}
            className={classes.flexItem}
            color="primary"
            label={
              <StyledText size="subtitle1">{area.name[locale]}</StyledText>
            }
            variant={area.slug === selectedArea ? 'default' : 'outlined'}
            onClick={() => setSelectedArea(area.slug)}
          />
        ))}
      </div>
      <div>
        <StyledText size="h3" bold inline={false} className={classes.section}>
          {subDistrictsLabel}
        </StyledText>
        {subDistricts.map((subDistrict) => (
          <Link
            key={subDistrict.slug}
            href={{
              pathname: '/carparks',
              query: { subDistricts: subDistrict.slug },
            }}
          >
            <Button
              className={classes.flexItem}
              variant="outlined"
              color="primary"
            >
              <StyledText size="subtitle1">
                {subDistrict.name[locale]}
              </StyledText>
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}

function SearchAll({ areas, tags }: SearchAllPageProps) {
  const classes = useStyles()
  const router = useRouter()
  const fallbackLocale = router.locale || 'zh'
  const { allSubDistricts, allCategories } = translations[fallbackLocale]
  const tabConfig = [
    {
      type: 'sub-districts',
      label: allSubDistricts,
    },
    {
      type: 'categories',
      label: allCategories,
    },
  ]

  const [pageType, setPageType] = useState(tabConfig[0].type)

  const areaList = useMemo(() => {
    const allSubDistricts: ResponseElement[] = []
    areas.forEach((area) => allSubDistricts.push(...area.subDistricts))
    const all = {
      _id: 'all',
      name: {
        en: 'All',
        zh: '全部',
      },
      slug: 'all',
      subDistricts: allSubDistricts,
    }
    return [all, ...areas]
  }, [areas])
  return (
    <>
      <Header position="sticky" />
      <Container className={classes.content} maxWidth="lg">
        <div className={classes.pageTypeButtonContainer}>
          {tabConfig.map((tab) => {
            return (
              <ButtonBase
                key={tab.type}
                className={
                  pageType === tab.type
                    ? classes.currentPageTypeButton
                    : classes.pageTypeButton
                }
                onClick={() => {
                  setPageType(tab.type)
                  router.push({
                    query: { type: tab.type },
                  })
                }}
              >
                <StyledText size="h6">{tab.label}</StyledText>
              </ButtonBase>
            )
          })}
        </div>
        {pageType === 'sub-districts' && (
          <SubDistrictList
            areas={areaList}
            locale={fallbackLocale as SupportedLanguages}
          />
        )}
        {pageType === 'categories' && (
          <TagList tags={tags} locale={fallbackLocale as SupportedLanguages} />
        )}
      </Container>
    </>
  )
}

export default SearchAll

export async function getStaticProps({ preview = false }) {
  const areas = await getSubDistrictsGroupByArea(preview)
  const tags = await getTags(preview)
  return {
    props: { areas, tags, preview },
    revalidate: 1,
  }
}
