import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { Button } from 'antd'

const UsersList = ({ handleClick, users }) => {
  const renderUser = (user) => {
    return (
      <li key={user.id}>
        <h3>{user.name}</h3>
        <Button icon='arrow-right' onClick={() => handleClick(user)}>
          Open
        </Button>
      </li>
    )
  }

  return (
    <div className='chat-resource-list-container scroll-container'>
      <ul className='chat-resource-list'>
        { map(users, renderUser) }
      </ul>
    </div>
  )
}

UsersList.displayName = 'UsersList'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
