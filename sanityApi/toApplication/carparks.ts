import { CarparkContextToday, CarparkResponse, PriceDetail } from '../../types/CarparkResponse'

export const orderCarparkByPriceToday = (
  carparkResponse: CarparkResponse[]
):CarparkContextToday[] => {
  const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return carparkResponse
    .map((carpark) => {
      return {
        ...carpark,
        priceDetail: carpark.priceDetails?.find((item) => {
          const { day } = item
          const today = new Date().getDay()
          if (day === 'all') {
            return true
          } else if (day.includes('-')) {
            const [startDay, endDay] = day.split('-')
            return (
              today >= week.indexOf(startDay) && today <= week.indexOf(endDay)
            )
          } else {
            const dates = day.split(',')
            return dates.some((date) => date === week[today])
          }
        }) as PriceDetail,
      }
    })
    .sort((a, b) => {
      const aHr = parseInt((a.priceDetail as PriceDetail).hr)
      const aPrice = parseInt((a.priceDetail as PriceDetail).price)
      const bHr = parseInt((b.priceDetail as PriceDetail).hr)
      const bPrice = parseInt((b.priceDetail as PriceDetail).price)
      return aPrice / aHr - bPrice / bHr
    })
}
