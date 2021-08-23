import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  ClientConfig,
} from "next-sanity"

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "staging",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "project-id",
  useCdn: process.env.NODE_ENV === "production",
}

export const imageBuilder = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const client = createClient(config)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const SanityClient = (usePreview?: boolean) => (usePreview ? previewClient : client)
export default client
