import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../components/header'
import { getSubDistrictsGroupByArea } from '../lib/api'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { Area, SubDistrict } from '../types/DistrictResponse'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import { StyledText } from '../components/StyledText'

interface IProps {
  areas: Area[]
  preview?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: theme.spacing(3),
  },
  flexItem: {
    margin: theme.spacing(0, 1, 1, 0),
  },
  pageTypeButtonContainer: {
    display: 'grid',
    gridTemplateColumns: `1fr 1fr`,
    width: '100%',
    height: theme.spacing(5),
    textAlign: 'center',
  },
  currentPageTypeButton: {
    fontWeight: 700,
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },
  pageTypeButton: {
    fontWeight: 700,
    borderBottom: `2px solid ${theme.palette.divider}`
  }
}))

function SubDistrictList({ areas }: IProps) {
  const classes = useStyles()
  const [selectedArea, setSelectedArea] = useState(areas[0]._id)

  return (
    <>
      <div>
        {areas.map((area) => (
          <Chip
            key={area._id}
            className={classes.flexItem}
            color="primary"
            label={area.name}
            variant={area._id === selectedArea ? 'default' : 'outlined'}
            onClick={() => setSelectedArea(area._id)}
          />
        ))}
      </div>
      <div>
        <StyledText size="h3" inline={false}>分區</StyledText>
        {
          areas
            .find((area: Area) => area._id === selectedArea)
            .subDistricts
            .map((subDistrict: SubDistrict) => {
              return (
                <Link 
                  key={subDistrict.slug}
                  href={`/sub-districts/${subDistrict.slug}`}>
                  <Button
                    className={classes.flexItem}
                    variant="outlined"
                    color="primary"
                  >
                    {subDistrict.name}
                  </Button>
                </Link>

              )
            })
        }
      </div>
    </>
  )
}

function All({ areas }: IProps) {
  const classes = useStyles()
  const router = useRouter()
  const tabConfig = [
    {
      type: 'sub-districts',
      label: '地區'
    },
    {
      type: 'categories',
      label: '所有分類'
    },
  ]


  const [pageType, setPageType] = useState(tabConfig[0].type)

  return (
    <>
      <Header imageToTop={false} />
      <div className={classes.pageTypeButtonContainer}>
        {tabConfig.map(tab => {
          return (
            <ButtonBase
              key={tab.type}
              className={pageType === tab.type ? classes.currentPageTypeButton : classes.pageTypeButton}
              onClick={() => {
                setPageType(tab.type)
                router.push({
                  query: { type: tab.type },
                })

              }}
            >
              {tab.label}
            </ButtonBase>
          )
        })}
      </div>
      <Container className={classes.content} maxWidth="lg">
        {
          pageType === 'sub-districts' && <SubDistrictList areas={[
            {
              _id: 'all',
              name: '全部',
              slug: "all",
              subDistricts: areas.reduce((a: SubDistrict[], c: Area) => [...a, ...c.subDistricts], [])
            },
            ...areas
          ]} />
        }
        {
          pageType === 'categories' && <>All cats</>
        }
      </Container>
    </>
  )
}

export default All

export async function getStaticProps({ preview = false }) {
  const areas = await getSubDistrictsGroupByArea(preview)
  return {
    props: { areas, preview },
    revalidate: 1,
  }
}
