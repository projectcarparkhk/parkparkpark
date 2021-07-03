export default function TabNavItem({ id, isActive, children, onClick }) {
  return (
    <li
      onClick={onClick}>
      <button
        data-tab-id={id} 
        className={`block flex-1 px-4 py-2 rounded-md ${isActive ? 'bg-yellow-100 text-yellow-700' : ''}`}
      >
        {children}
      </button>
    </li>
  )
}