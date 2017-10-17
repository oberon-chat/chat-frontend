import React from 'react'
import RoomsList from '../Rooms/_List'
import UserDropdown from '../User/_Dropdown'

const Sidebar = ({ children }) => (
  <div id='sidebar' className='window-height'>
    <div id='logo'>
      Oberon
    </div>
    <UserDropdown />
    <div className='scroll-container'>
      <RoomsList type='public' />
      <RoomsList type='private' />
      <RoomsList type='direct' />
      { children }
    </div>
  </div>
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
