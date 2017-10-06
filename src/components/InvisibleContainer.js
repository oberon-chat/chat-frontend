// React supports returning multiple fragments by returning a list:
//
// return [
//   <div key='1'>One</div>,
//   <div key='2'>Two</div>
// ]
//
// The list requires commas to separate each item, and a `key` attribute to be
// specified for each node.
//
// This component below enables the same fragments to be returned via JSX:
//
// return (
//   <InvisibleContainer>
//     <div>One</div>
//     <div>Two</div>
//   </InvisibleContainer>
// )

export default ({ children }) => children
