import Avatar from '../components/avatar'
import Date from '../components/date'
import ListItemImage from '../components/ListItemImage'
import Link from 'next/link'

export default function ListItem({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  link,
}) {
  return (
    <section className="py-4 flex space-x-4">
      <ListItemImage
        link={link}
        imageObject={coverImage}
        title={title}
        url={coverImage}
      />
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h3 className="text-lg font-semibold mb-0.5">
          <Link href={link}>
            <span className="hover:underline">{title}</span>
          </Link>
        </h3>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
