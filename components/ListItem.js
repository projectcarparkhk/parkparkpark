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
    <section className="p-4 flex space-x-4">
      <ListItemImage link={link} imageObject={coverImage} title={title} url={coverImage} />
      <div className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100" width="144" height="144">
      </div>
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h3 className="text-lg font-semibold text-black mb-0.5">
            <Link href={link}>
              <a className="hover:underline">{title}</a>
            </Link>
        </h3>
        <div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
