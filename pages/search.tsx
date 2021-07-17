import React from 'react';
import { useRouter } from 'next/router';
import SearchInput from '../components/search/input'
import { Suggestion } from '../components/search/type'
import Header from '../components/header'

function Search() {
    const router = useRouter()

    function onSuggestionClick(suggestion: Suggestion) {
        router.push(`/${suggestion.type}/${suggestion.slug}`, undefined , { shallow: true })
    }
    return (
        <>
            <Header />
            <SearchInput
                onSuggestionClick={onSuggestionClick}
            />
        </>
    )
}

export default Search