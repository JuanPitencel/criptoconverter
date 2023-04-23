
import styled from "@emotion/styled"


const MensajeError = styled.div `
     
    background-color: #11824a;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    padding: 18px;
    font-family: 'Lato', san-serif;
    font-weight: 700;
    color: white;

`



const Error = ({children}) => {
  return (
    <MensajeError>{children}</MensajeError>
  )
}

export default Error