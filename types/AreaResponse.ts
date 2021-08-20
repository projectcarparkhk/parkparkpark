export interface AreaResponse {
  _id: string
  name: { [key: string]: string }
  subDistricts: { _id: string; name: { [key: string]: string } }[]
}
