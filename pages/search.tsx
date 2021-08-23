import React from "react";
import { useRouter } from "next/router";
import SearchInput from "../components/search/input"
import { Suggestion } from "../components/search/type"
import { HotTagResponse } from "../types/pages"
import Header from "../components/header"
import { getHotTags } from "../sanityApi/tags"
import Link from "next/link"
import Container from "@material-ui/core/Container"
import Chip from "@material-ui/core/Chip"
import { Theme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import { SupportedLanguages } from "../constants/SupportedLanguages";
import translations from "../locales";

interface IProps {
  hotTags: HotTagResponse[]
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
  const { push, locale } = useRouter()

  const {
    hot,
  } = translations[locale || "zh"]

  const classes = useStyles()

  function onSuggestionClick(suggestion: Suggestion) {
    switch (suggestion.type) {
      case "subDistrict":
        push({
          pathname: "/carparks",
          query: { subDistricts: suggestion.slug },
        })
        break
      case "carpark":
        push({
          pathname: `/carparks/${suggestion.slug}`
        })
        break
    }
  }
  return (
    <Container>
      <Header imageToTop={false} />
      <div className={classes.searchWrapper}>
      <SearchInput
        onSuggestionClick={onSuggestionClick}
      >
        <>
          <h3>{hot}</h3>
          <div>
            {hotTags
              .map((tag) => (
                <Link 
                  key={tag[locale as SupportedLanguages].name}
                  href={{
                    pathname: "/carparks",
                    query: { tags: tag.slug },
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