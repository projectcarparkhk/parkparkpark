import { PostResponse, PromotionDetail } from '../../types/api/PostResponse'
import { isToday } from '../../utils/isToday'

const minSpendingPerHr = (promotionDetails: PromotionDetail[]) => {
  const spendingPerHr = promotionDetails.map((details) => {
    const { spending, movie, dining, hr } = details
    let total = 0
    if (spending) {
      total += parseInt(spending)
    }
    if (dining) {
      total += parseInt(dining)
    }
    if (movie) {
      total += 80 * parseInt(movie)
    }
    return total / parseInt(hr)
  })
  return Math.min(...spendingPerHr)
}

export const orderCarparkPosts = (
  carparkPosts: PostResponse[]
): PostResponse[] => {
  return carparkPosts
    .map((carpark) => {
      return {
        ...carpark,
        promotionDetails: carpark.promotionDetails.filter((item) => {
          const { day } = item
          return isToday(day)
        }) as PromotionDetail[],
      }
    })
    .sort((a, b) => {
      const aMinSpendingPerHr = minSpendingPerHr(a.promotionDetails)
      const bMinSpendingPerHr = minSpendingPerHr(b.promotionDetails)
      return aMinSpendingPerHr - bMinSpendingPerHr
    })
}
