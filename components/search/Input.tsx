import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Suggestion } from './types'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  searchBox: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    fontSize: '1.3rem',
  },
}))

const searchEndpoint = (query: string) => `/api/search?q=${query}`

const getSuggestions = async (query: string) => {
  const inputValue = query.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (!inputLength) {
    return []
  }

  return fetch(searchEndpoint(query))
    .then(res => res.json())
    .then(res => res)
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: Suggestion) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar>
        <LocationOnIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={suggestion.name} secondary={suggestion.type} />
  </ListItem>
);

const renderSuggestionsContainer = ({ containerProps, children }: any) => {
  return (
    <List {...containerProps}>
      {children}
    </List>
  );
}

function SearchInput({
  onSuggestionClick
}: any) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const classes = useStyles()


  function onChange(event: any, { newValue }: any) {
    setValue(newValue)
  }

  async function onSuggestionsFetchRequested({ value }: any) {
    const res = await getSuggestions(value)
    setSuggestions(res.result.data)
  }

  function onSuggestionsClearRequested() {
    setSuggestions([])
  };

  function onSuggestionSelected(event: any, { suggestion }: any) {
    onSuggestionClick(suggestion)

  }
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: '搜尋地區 / 停車場',
    value,
    'aria-label': 'search',
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      renderInputComponent={(inputProps: Autosuggest.RenderInputComponentProps) => {
        return (
        <TextField 
             {...inputProps} 
             size="medium"
            variant="filled"
            color="secondary"
            className={classes.searchBox}
            fullWidth />)
      }}
      inputProps={inputProps}
    />
  );
}

export default SearchInput