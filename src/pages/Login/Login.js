import React from 'react'
import { connect } from 'react-redux'
import { logIn as logInCurrentUser } from '../../actions/currentUser'
import { getIsLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import ParticleNetwork from '../../components/ParticleNetwork'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'
import OAuth2Login from './_OAuth2Login'

const Login = ({ isLoggedIn, logInToClient, logInToServer }) => {
  const landingPage = window.location.pathname !== '/' ? window.location.pathname : '/rooms'

  if (isLoggedIn) {
    return <Redirect to={landingPage} />
  }

  const onSubmit = async (values) => {
    logInToClient(values)
    history.push(landingPage)
  }

  return (
    <div id='login-container'>
      <ParticleNetwork id='login-background' />
      <div id='login-content' className='center-children'>
        <div>
          <h1>Login</h1>
          <OAuth2Login />
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
      <div id='login-hero' className='center-children'>
        <h1>Oberon</h1>
        <h4>An open-source chat platform</h4>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  logInToClient: (data) => {
    dispatch(logInCurrentUser(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
