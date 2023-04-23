import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectmonedas from '../hooks/useSelectmonedas'
import monedas from '../data/monedas'

 const InputSubmit = styled.input `
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius:5px;
    transition: background-color .3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }

`

const Formulario = ({setMonedas}) => {

  const [criptos, Setcriptos] = useState([])
  const [error, setError] = useState(false)

  const [statemonedas, Selectordemonedas] = useSelectmonedas ('Seleccionar moneda', monedas)
  const [statecriptomonedas, Selectcriptomonedas] = useSelectmonedas ('Seleccionar Criptomoneda', criptos)
  

  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD"
    
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCripto = resultado.Data.map(cripto => {

        const objeto = {

          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      
      Setcriptos(arrayCripto)
      
    }
   
   consultarAPI()

  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    
    if([statemonedas, statecriptomonedas].includes('')) {

      setError(true)

      return
    }
      setError(false)
      setMonedas({
        statemonedas,
        statecriptomonedas 
      })
 
      return
  }

  return (

    <>
    {error && <Error>Todos los campos son obligatorios!</Error>}

    <form onSubmit={handleSubmit}> 
      <Selectordemonedas/> 
      
      <Selectcriptomonedas/>
      <InputSubmit type="submit"  value="Cotizar" />  
    </form>
    </>
  )
}

export default Formulario