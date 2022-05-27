import './Dropdown.css'
import { fixUrl } from '../../utils'

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const DropDown = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <>
      <Link to='/'><img src={fixUrl('/assets/' + 'header.png')} alt='Header image with Hamster Wars logo.' /></Link>
      <nav className='navigation'>
        <button className='hamburger' onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}>
          {/* icon from heroicons.com */}
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='white' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
        <div
          className={ isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu' }>
          <ul>
            <li>
              <NavLink to='/'> Home </NavLink>
            </li>
            <li>
              <NavLink to='/battle'> Battle </NavLink>
            </li>
            <li>
              <NavLink to='/gallery'> Gallery </NavLink>
            </li>
            <li>
              <NavLink to='/statistics'> Statistics </NavLink>
            </li>
            <li>
              <NavLink to='/history'> History </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default DropDown
