export default function TabNav({ children }) {
    return (
      <nav className="py-4">
        <ul className="flex space-x-2">
          {children}
        </ul>
      </nav>
    )
  }