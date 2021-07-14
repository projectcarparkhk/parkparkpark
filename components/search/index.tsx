import React from 'react';
import { useRouter } from 'next/router';
import SearchInput from './Input'
import { Suggestion } from './types'

function Search() {
    const router = useRouter()

    function onSuggestionClick(suggestion: Suggestion) {
        router.push(`/${suggestion.type}/${suggestion.slug}`, undefined , { shallow: true })
    }
    return (
        <>
            <SearchInput
                onSuggestionClick={onSuggestionClick}
            />
        </>
    )
}

export default Search