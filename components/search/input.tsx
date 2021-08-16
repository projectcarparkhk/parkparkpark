import React, { useState } from 'react'
import Autosuggest, {
  ChangeEvent,
  InputProps,
  RenderInputComponentProps,
  RenderSuggestionsContainerParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import InputBase from '@material-ui/core/InputBase'
import { Suggestion } from './type'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import translations from '../../locales/pages/search'
import { SupportedLanguages } from '../../constants/SupportedLanguages';
import { useRouter } from 'next/router';

export const useStyles = makeStyles((theme: Theme) => ({
  searchBox: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: '#EEEEEE',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '3rem',
      width: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
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
      fontSize: '1rem',
    },
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
const renderSuggestion = (
  suggestion: Suggestion,
  locale:  SupportedLanguages,
) => {
  return (
    <ListItem button>
    <ListItemAvatar>
      <Avatar>
        <LocationOnIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={suggestion.name} secondary={translations[locale][suggestion.type]} />
  </ListItem>
  )
}

const renderSuggestionsContainer = ({
  containerProps,
  children,
}: RenderSuggestionsContainerParams) => {
  return <List {...containerProps}>{children}</List>
}

interface IProps {
  onSuggestionClick: (suggestion: Suggestion) => void;
  children: React.ReactChild
}

function SearchInput({ onSuggestionClick, children }: IProps) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const classes = useStyles()
  const { locale } = useRouter()
  const fallBackLocale = (locale as SupportedLanguages) 

  const {
    searchPlaceholder,
  } = translations[fallBackLocale]

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

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={(suggestion) => renderSuggestion(suggestion, fallBackLocale)}
      renderSuggestionsContainer={renderSuggestionsContainer}
      renderInputComponent={(inputProps: RenderInputComponentProps) => {
        return (
          <div>
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
          {!suggestions.length && <div>
            {children}
          </div>}
          </div>
        )
      }}
      inputProps={inputProps}
    />
  )
}

export default SearchInput
