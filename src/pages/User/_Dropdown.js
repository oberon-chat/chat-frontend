import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import UserLogout from './_Logout'
import { Dropdown, Icon, Menu } from 'antd'

export const UserDropdown = ({ currentUser }) => {
  if (isEmpty(currentUser)) { return null }

  const content = (
    <Menu>
      <Menu.Item>
        <UserLogout />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={content}>
      <a className='ant-dropdown-link'>
        {currentUser.name} <Icon type='down' />
      </a>
    </Dropdown>
  )
}

UserDropdown.displayName = 'UserDropdown'

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps)(UserDropdown)
