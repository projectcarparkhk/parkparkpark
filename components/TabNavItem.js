export default function TabNavItem({ id, href, isActive, children, onClick }) {
  return (
    <li onClick={onClick}>
      <span
        data-tab-id={id} 
        className={`block px-4 py-2 rounded-md ${isActive ? 'bg-amber-100 text-amber-700' : ''}`}
      >
        {children}
      </span>
    </li>
  )
}