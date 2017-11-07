import React from 'react'
import RoomsSidebar from './_SidebarRooms'
import UserDropdown from '../User/_Dropdown'

const Sidebar = ({ children }) => (
  <div id='sidebar' className='window-height'>
    <div id='logo'>
      Oberon
    </div>
    <UserDropdown />
    <div className='scroll-container'>
      <RoomsSidebar />
      { children }
    </div>
  </div>
)

Sidebar.displayName = 'Sidebar'

export default Sidebar
