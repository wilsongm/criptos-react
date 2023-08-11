import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas  from "../hooks/useSelectMonedas"
import { monedas } from "../data/moneda";

const InputSubmit = styled.input`
    background-color: #9495FF;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 3.s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;


const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const response = await fetch(url)
            const result = await response.json()
//------------- 
            const arrayCriptos = result.Data.map(cripto => {
                const object = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return object
            })
            setCriptos(arrayCriptos)
        }
        consultAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptoMoneda].includes('')){
            setError(true)
            return
        }

        setMonedas({
            moneda, 
            criptoMoneda
        })
    }

  return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}

        <form 
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCriptoMoneda />
            
            <InputSubmit 
                type="submit" 
                value="Cotizar"
            />
        </form>
    </>
  )
}

export default Formulario
