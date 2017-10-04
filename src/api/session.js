import { gql } from 'react-apollo'
import { userAttributes } from './attributes'

export const logInWithProvider = gql`
  mutation LogInWithProvider($code: String!, $provider: String!, $redirectUri: String!) {
    logInWithProvider(code: $code, provider: $provider, redirectUri: $redirectUri) {
      token
      token_expiration
      user {
        ...UserAttributes
      }
    }
  }
  ${userAttributes}
`
