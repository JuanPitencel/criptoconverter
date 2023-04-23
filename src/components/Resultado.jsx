import styled from "@emotion/styled"

const Contenedor = styled.div `
  color: #fff;
  display: flex;
  padding: 20px;
`

const Imagen = styled.img `
  width: 120px;
  display: block;
`
const Price = styled.p `
  font-size: 24px;
  font-weight: 700;
  font-family: 'Lato', san-serif;
`

const   Resultado = ({cotizacion}) => {
  
  const {PRICE, CHANGEDAY, IMAGEURL} = cotizacion

  return (
    <Contenedor>
      <Imagen src= {`https://cryptocompare.com/${IMAGEURL}`}alt="Imagen Cripto" />
    <div>
    <Price>La cotización es:{PRICE}</Price>
    <p>Variación diaria:{CHANGEDAY}</p>
    </div>
    </Contenedor>
    
  )
}

export default Resultado