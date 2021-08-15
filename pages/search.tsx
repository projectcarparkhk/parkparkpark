import React from 'react';
import { useRouter } from 'next/router';
import SearchInput from '../components/search/input'
import { Suggestion } from '../components/search/type'
import { TagResponse } from '../types'
import Header from '../components/header'
import { getHotTags } from '../sanityApi/tags'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { SupportedLanguages } from '../constants/SupportedLanguages';

interface IProps {
  hotTags: TagResponse[]
}


const useStyles = makeStyles((theme: Theme) => ({
  searchWrapper: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}))

function Search({ hotTags }: IProps) {
  const router = useRouter()
  const classes = useStyles()
  const {locale} = useRouter()
  const fallBackLocale = (locale as SupportedLanguages) || 'zh'

  function onSuggestionClick(suggestion: Suggestion) {
    router.push(`/${suggestion.type}/${suggestion.slug}`, undefined, { shallow: true })
  }
  return (
    <Container>
      <Header imageToTop={false} />
      <div className={classes.searchWrapper}>
      <SearchInput
        onSuggestionClick={onSuggestionClick}
      >
        <>
          <h3>熱門</h3>
          <div>
            {hotTags
              .map((tag) => (
                <Link 
                  key={tag[locale as SupportedLanguages].name}
                  href={{
                    pathname: '/carparks',
                    query: { tags: tag[fallBackLocale].slug },
                  }}
                >
                  <Chip
                    className={classes.chip}
                    key={tag[locale as SupportedLanguages].name}
                    label={tag[locale as SupportedLanguages].name}
                  />
                </Link>
              ))}
          </div>
        </>
      </SearchInput>
      </div>
    </Container>
  )
}

export default Search

export async function getStaticProps({ preview = false }) {
  const hotTags = await getHotTags(preview)
  return {
    props: { hotTags, preview },
    revalidate: 1,
  }
}