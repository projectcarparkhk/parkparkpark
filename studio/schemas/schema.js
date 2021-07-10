// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import localeString from './localeString'
import localeSlug from './localeSlug'
import carpark from './carpark'
import blockContent from './blockContent'
import post from './post'
import author from './author'
import comment from './comment'
import subDistrict from './subDistrict'
import district from './district'
import tag from './tag'
import subTag from './subTag'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    localeString,
    localeSlug,
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    carpark,
    blockContent,
    comment,
    subDistrict,
    district,
    tag,
    subTag
  ]),
})