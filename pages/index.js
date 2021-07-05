import { useState } from 'react'
import Link from 'next/link'
import { getPostsForHome, getSubDistrictsGroupByArea } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Header from '../components/header'
import {Container} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';



export default function Index({ posts, areas, preview }) {
  const [activeAreaId, setActiveAreaId] = useState(areas[0]._id)

  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: theme.light.primaryText,
      height: 48,
      padding: '0 30px',
    },
  });
  const classes = useStyles();
  console.log({posts, areas, preview })
  console.log(CMS_NAME)
  return (
    <>
      <Container maxWidth="lg">
        <Header/>
        <div class={classes.root} >
            hahaha
        </div>

      </Container>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = await getPostsForHome(preview)
  const areas = await getSubDistrictsGroupByArea()
  return {
    props: { posts, areas, preview },
    revalidate: 1,
  }
}
