import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'

export default function ListItemImage({ title, url, imageObject, slug, link, width = '144', height = '144' }) {
  const image = (
    <img
      width={width}
      height={height}
      alt={`Cover Image for ${title}`}
      className="flex-none w-16 h-16 rounded-lg object-cover bg-gray-100"
      src={imageBuilder(imageObject).width(width).height(height).url()}
    />
  )

  return (
    <div>
      {link ? (
        <Link href={link}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
