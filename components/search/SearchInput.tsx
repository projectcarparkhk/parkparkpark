import React, { memo, useState } from 'react'
import Autosuggest, {
  ChangeEvent,
  InputProps,
  RenderInputComponentProps,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation'
import InputBase from '@material-ui/core/InputBase'
import { Suggestion } from './type'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import translations from '../../locales'
import { SupportedLanguages } from '../../constants/SupportedLanguages'
import { useRouter } from 'next/router'
import { StyledText } from '../StyledText'

interface StyleType {
  size: 'sm' | 'lg'
}
export const useStyles = makeStyles<Theme, StyleType>((theme: Theme) => ({
  searchBox: {
    borderRadius: '30px',
    backgroundColor: '#EEEEEE',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: ({ size }) => (size === 'sm' ? '3rem' : '4rem'),
      borderRadius: ({ size }) => (size === 'sm' ? '30px' : '10px'),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingRight: theme.spacing(2.5),
    width: '100%',
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(1, 1),
      fontSize: ({ size }) => (size === 'sm' ? '1rem' : '1.5rem'),
    },
  },
  suggestionItem: {
    '& .MuiAvatar-root': {
      background: theme.palette.primary.main,
    },
  },
  listItem: {
    padding: theme.spacing(1, 1.5),
  },
  suggestionList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: theme.palette.background.default,
    borderRadius: '5px',
    boxShadow: '0 6px 20px rgb(0 0 0 / 8%)',
    height: '40vh',
    overflowY: 'scroll',
  },
  container: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: ({ size }) => (size === 'sm' ? '30%' : '40%'),
    },
  },
  list: {
    paddingTop: theme.spacing(1),
    position: 'absolute',
    width: '100%',
  },
}))

const searchEndpoint = (query: string) => `/api/search?q=${query}`

const getSuggestions = async (query: string) => {
  const inputValue = query.trim().toLowerCase()
  const inputLength = inputValue.length

  if (!inputLength) {
    return []
  }

  return fetch(searchEndpoint(query))
    .then((res) => res.json())
    .then((res) => res)
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Suggestion) => suggestion.name

// Use your imagination to render suggestions.

interface ISearchProps {
  size?: 'sm' | 'lg'
  children?: React.ReactChild
}

function SearchInput({ children, size = 'lg' }: ISearchProps) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const classes = useStyles({ size })
  const { push, locale } = useRouter()
  const fallBackLocale = locale as SupportedLanguages

  const renderSuggestion = (
    suggestion: Suggestion,
    locale: SupportedLanguages
  ) => {
    return (
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar>
            {suggestion.type === 'subDistrict' && <LocationOnIcon />}
            {suggestion.type === 'carpark' && <EmojiTransportationIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <StyledText size="h5" bold>
              {suggestion.name}
            </StyledText>
          }
          secondary={translations[locale][suggestion.type]}
        />
      </ListItem>
    )
  }
  const { searchPlaceholder } = translations[fallBackLocale]

  function onChange(
    event: React.FormEvent<HTMLElement>,
    { newValue }: ChangeEvent
  ) {
    setValue(newValue)
  }

  async function onSuggestionsFetchRequested({
    value,
  }: SuggestionsFetchRequestedParams) {
    const res = await getSuggestions(value)
    setSuggestions(res.result.data)
  }

  function onSuggestionsClearRequested() {
    setSuggestions([])
  }

  function onSuggestionSelected(
    event: React.FormEvent<any>,
    { suggestion }: SuggestionSelectedEventData<Suggestion>
  ) {
    onSuggestionClick(suggestion)
  }
  // Autosuggest will pass through all these props to the input.
  const inputProps: InputProps<Suggestion> = {
    placeholder: searchPlaceholder,
    value,
    'aria-label': 'search',
    onChange,
  }

  function onSuggestionClick(suggestion: Suggestion) {
    switch (suggestion.type) {
      case 'subDistrict':
        push({
          pathname: '/carparks',
          query: { subDistricts: suggestion.slug },
        })
        break
      case 'carpark':
        push({
          pathname: `/carpark/${suggestion.slug}`,
        })
        break
    }
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={(suggestion) =>
        renderSuggestion(suggestion, fallBackLocale)
      }
      renderSuggestionsContainer={({ containerProps, children }) => {
        const { className, ...rest } = containerProps
        return (
          <List className={`${className} ${classes.list}`} {...rest}>
            {children}
          </List>
        )
      }}
      renderInputComponent={(inputProps: RenderInputComponentProps) => {
        return (
          <div style={{ position: 'relative' }}>
            <div className={classes.searchBox}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="搜尋地區 / 停車場"
                className={classes.inputInput}
                inputProps={inputProps}
              />
            </div>
            {!suggestions.length && <div>{children}</div>}
          </div>
        )
      }}
      inputProps={inputProps}
      theme={{
        container: classes.container,
        suggestion: classes.suggestionItem,
        suggestionsList: classes.suggestionList,
      }}
    />
  )
}

export default memo(SearchInput)
