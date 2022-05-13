import './Dropdown.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import headerImage from '../../../assets/header2.png'

const DropDown = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <>
      <img src={headerImage} alt="Header image with Hamster Wars logo." />
      <nav className="navigation">
        <button className="hamburger" onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}>
          {/* icon from heroicons.com */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div
          className={ isNavExpanded ? "navigation-menu expanded" : "navigation-menu" }>
          <ul>
            <li>
              <NavLink to='/'> Home </NavLink>
            </li>
            <li>
              <NavLink to='/cart'> Battle </NavLink>
            </li>
            <li>
              <NavLink to='/settings'> Gallery </NavLink>
            </li>
            <li>
              <NavLink to='/about'> Statistics </NavLink>
            </li>
            <li>
              <NavLink to='/about'> History </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default DropDown
