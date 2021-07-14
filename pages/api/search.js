import carparks from '../../cache/carparks.json'
import subDistricts from '../../cache/subDistricts.json'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&')
}

export default (req, res) => {
  const query = req.query.q
  const locale = req.locale || 'zh'

  const escapedValue = escapeRegexCharacters(query.trim())
  const regex = new RegExp('^' + escapedValue, 'i')

  const data = [...carparks, ...subDistricts]
    .filter((item) => regex.test(item.name.zh) || regex.test(item.name.en))
    .map((dat) => ({
      ...dat,
      name: dat.name[locale],
      slug: dat.slug[`${locale}Slug`].current,
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
