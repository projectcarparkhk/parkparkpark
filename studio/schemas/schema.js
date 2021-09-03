// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import localeString from './components/localeString'
import localeTable from './components/localeTable'
import localeBlockContent from './components/localeBlockContent'
import startAndExpiryDates from './components/startAndExpiryDates'
import carpark from './documents/carpark'
import vehicleType from './documents/vehicleType'
import blockContent from './components/blockContent'
import post from './documents/post'
import author from './documents/author'
import comment from './components/comment'
import subDistrict from './documents/subDistrict'
import area from './documents/area'
import paymentMethod from './documents/paymentMethod'
import postType from './documents/postType'
import tag from './documents/tag'
import category from './documents/category'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    localeString,
    localeTable,
    startAndExpiryDates,
    localeBlockContent,
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    carpark,
    vehicleType,
    blockContent,
    comment,
    subDistrict,
    area,
    paymentMethod,
    tag,
    category,
    postType,
  ]),
})
