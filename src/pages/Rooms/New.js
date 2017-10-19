import React from 'react'
import Content from '../Layout/_Content'
import Header from '../Layout/_Header'
import Main from '../Layout/_Main'
import RoomForm from './_Form'

const NewRoom = () => (
  <Main>
    <Header>
      <h2>New Room</h2>
    </Header>
    <Content classes='padded'>
      <RoomForm />
    </Content>
  </Main>
)

NewRoom.displayName = 'NewRoom'

export default NewRoom
