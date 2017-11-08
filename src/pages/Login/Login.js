import React from 'react'
import { connect } from 'react-redux'
import { logIn as logInCurrentUser } from '../../actions/currentUser'
import { getIsLoggedIn } from '../../reducers/currentUser'
import history from '../../app/history'
import ApolloClient from '../../components/ApolloClient'
import ParticleNetwork from '../../components/ParticleNetwork'
import Redirect from '../../components/Redirect'
import LoginForm from './_LoginForm'
import { Button } from 'antd'

const Login = ({ isLoggedIn, logInToClient, logInToServer }) => {
  const landingPage = window.location.pathname !== '/' ? window.location.pathname : '/rooms'

  if (isLoggedIn) {
    return <Redirect to={landingPage} />
  }

  const onSubmit = async (values) => {
    logInToClient(values)
    history.push(landingPage)
  }

  const onFacebookLogin = () => {
    const clientId = '527947334211357'
    const redirectUri = window.location.origin + '/login/facebook/callback'
    const url = [
      'https://www.facebook.com/v2.10/dialog/oauth',
      '?client_id=' + clientId,
      '&response_type=code',
      '&scope=email,public_profile',
      '&redirect_uri=' + redirectUri
    ].join('')

    window.location = url
  }

  const onGitHubLogin = () => {
    const clientId = '8a42e7b25f7124bad238'
    const url = [
      'https://github.com/login/oauth/authorize',
      '?client_id=' + clientId,
      '&scope=user'
    ].join('')

    window.location = url
  }

  return (
    <div id='login-container'>
      <ParticleNetwork id='login-background' />
      <div id='login-content' className='center-children'>
        <div>
          <h1>Login</h1>
          <ApolloClient client='oauth2'>
            <Button onClick={onFacebookLogin}>Log in with Facebook</Button>
            <Button onClick={onGitHubLogin}>Log in with GitHub</Button>
          </ApolloClient>
          <LoginForm onSubmit={onSubmit} />
        </div>
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
