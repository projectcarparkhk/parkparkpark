import Link from 'next/link'

export default function Header() {
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mt-8">
        <Link href="/">
          <span className="hover:underline">ParkParkPark!</span>
        </Link>
      </h1>
      <div className="mb-6">全港商場免費泊車及停車場優惠</div>
    </>
  )
}
