import React from 'react'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import imagenCriptos from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado   from './components/Resultado'
import Divisas from './components/Divisas'
import Spinner from './components/Spinner'
import News from './components/News'


const Contenedor = styled.div `
max-width: 900px ;
margin: 0 auto ;
width: 90% ;

@media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img  `
max-width: 400px;
width:80%;
margin: 100px auto 0 auto;
display: block;
`
const Heading = styled.h1 `
font-family: 'Lato', san-serif;
color: #fff;
text-align: center; 
font-weight: 700;
margin-top: 80px;
margin-bottom: 20px;
font-size: 34px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66a2fe;
  display: block;
  margin: 10px auto 0 auto;
  
}
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {

         setCargando(true)

        const {statemonedas, statecriptomonedas} = monedas

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${statecriptomonedas}&tsyms=${statemonedas}`
        
        const respuesta = await fetch(url)

        const cotizacion = await respuesta.json()

        setCotizacion(cotizacion.DISPLAY[statecriptomonedas][statemonedas])
          
        setCargando(false)
      
      }
      cotizarCripto()
    }

  }, [monedas])
  
  return ( 
    <>
   <News/>
   <Contenedor>
  
    <div>
    <Heading>Cotizador Crypto</Heading>
    <Formulario 
    setMonedas = {setMonedas}
    />
    {cargando && <Spinner/>}
    {cotizacion.PRICE && <Resultado cotizacion = {cotizacion}/>}
    
    <Divisas/>
    
    </div>
    <Imagen 
    src={imagenCriptos}
    alt="imagenes criptos" 
    />
   </Contenedor>
   </>
  
  )
}

export default App;
