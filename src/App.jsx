import { useState, useEffect } from "react";
import styled from "@emotion/styled"
import Formulario from "./components/Formulario";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import ImagenCripto from "./img/imagen-criptos.png"

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Lato', sants-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

    const [monedas, setMonedas] = useState({})
    const [result, setResult] = useState({})
    const [cargando, setCargando] = useState(false)


    useEffect(() => {
      //verificar que solo se ejecute si monedas tiene algun elemento
      if(Object.keys(monedas).length > 0){
        
        const cotizarCripto = async () => {
          setCargando(true)
          setResult({})
          const {moneda, criptoMoneda} = monedas
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
          
          const response = await fetch(url)
          const result = await response.json()
          setResult(result.DISPLAY[criptoMoneda][moneda])

          setCargando(false)
        }
        cotizarCripto()
      }
    }, [monedas])

  return (
      <Contenedor>
          <Imagen 
            src={ImagenCripto}
            alt="imagen criptomonedas"
          />
          <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario 
              setMonedas={setMonedas}
            />

            {cargando && <Spinner />}
            {result.PRICE && <Result result={result}/>}
          </div>
      </Contenedor>

  )
}

export default App
