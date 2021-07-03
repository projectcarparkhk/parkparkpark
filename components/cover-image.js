import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'

export default function CoverImage({ title, url, imageObject, slug, link }) {
  const image = (
    <img
      width={1240}
      height={540}
      alt={title}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={imageBuilder(imageObject).width(1240).height(540).url()}
    />
  )

  return (
    <div className="-mx-5 sm:mx-0">
      {link ? (
        <Link href={link}>
          <span aria-label={title}>{image}</span>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
