import React from 'react'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { logInWithProvider } from '../../api/session'
import history from '../../app/history'
import { logIn as logInCurrentUser } from '../../actions/currentUser'
import { getIsLoggedIn } from '../../reducers/currentUser'
import { queryString } from '../../helpers/paths'
import Page from '../../components/Page'
import Redirect from '../../components/Redirect'

export const Callback = ({ isLoggedIn, match, mutate, logInToClient }) => {
  const landingPage = '/notes'

  if (isLoggedIn) {
    return <Redirect to={landingPage} />
  }

  const code = queryString().code
  const provider = match.params.provider
  const redirectUri = window.location.origin + '/login/' + provider + '/callback'
  const logIn = async (code) => {
    const variables = { code: code, provider: provider, redirectUri: redirectUri }
    const response = await mutate({ variables: variables })
    const { token, token_expiration, user } = response.data.logInWithProvider

    logInToClient({ token, token_expiration, ...user })
    history.push(landingPage)
  }

  if (code) {
    logIn(code)
  }

  return (
    <Page id='page-login-callback' className='center-children window-height'>
      <div className='padded' style={{ backgroundColor: '#fff' }}>
        <h1>Logging In</h1>
      </div>
    </Page>
  )
}

Callback.displayName = 'LoginCallback'

const CallbackWithData = compose(
  graphql(logInWithProvider)
)(Callback)

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = (dispatch) => ({
  logInToClient: (data) => {
    dispatch(logInCurrentUser(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CallbackWithData)
