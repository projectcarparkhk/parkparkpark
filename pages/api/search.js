import { getCarparks, getSubDistricts } from '../../sanityApi/search'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&')
}

async function constructSearchResult() {
  const [allCarparks, allSubDistricts] = await Promise.all([
    getCarparks(),
    getSubDistricts(),
  ])
  return [...allCarparks, ...allSubDistricts]
}

export default async (req, res) => {
  const query = req.query.q
  const locale = req.locale || 'zh'

  const escapedValue = escapeRegexCharacters(query.trim())
  const regex = new RegExp('^' + escapedValue, 'i')
  const allSearchResults = await constructSearchResult()

  const data = allSearchResults
    .filter((item) => regex.test(item.name.zh) || regex.test(item.name.en))
    .map((dat) => ({
      ...dat,
      name: dat.name[locale],
      slug: dat.slug.current,
    }))

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      error: {
        code: '',
        message: '',
      },
      result: {
        data,
      },
    })
  )
}
