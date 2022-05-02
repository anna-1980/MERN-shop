import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => { //from Boot-strap go to docs
    return (
       <Alert variant={variant}>
           {children}  
       </Alert>
    )
}
Message.defaultProps = {
    variant: 'info', //blue color
}

export default Message;