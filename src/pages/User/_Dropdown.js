import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { getCurrentUser } from '../../reducers/currentUser'
import UserLogout from './_Logout'
import { Dropdown, Icon } from 'antd'

export const UserDropdown = ({ currentUser }) => {
  if (isEmpty(currentUser)) { return null }

  const content = (
    <ul>
      <li>
        <UserLogout />
      </li>
    </ul>
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
