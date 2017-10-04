import { gql } from 'react-apollo'

export const userAttributes = gql`
  fragment UserAttributes on User {
    id
    email
    name
  }
`
