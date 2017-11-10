import React from 'react'
import ApolloClient from '../../components/ApolloClient'
import { Button } from 'antd'

export const OAuth2Login = ({ handleSubmit, pristine, submitting }) => {
  const onFacebookLogin = () => {
    const clientId = process.env.REACT_APP_OAUTH2_FACEBOOK_CLIENT_ID
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
    const clientId = process.env.REACT_APP_OAUTH2_GITHUB_CLIENT_ID
    const url = [
      'https://github.com/login/oauth/authorize',
      '?client_id=' + clientId,
      '&scope=user'
    ].join('')

    window.location = url
  }

  return (
    <ApolloClient client='oauth2'>
      <div className='chat-oauth2-login-buttons'>
        <Button onClick={onFacebookLogin}>Log in with Facebook</Button>
        <Button onClick={onGitHubLogin}>Log in with GitHub</Button>
      </div>
    </ApolloClient>
  )
}

export default OAuth2Login
