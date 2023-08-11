import styled from "@emotion/styled"

    const Contenedor = styled.div`
        color: #fff;
        font-family: 'Lato', sans-serif;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 30px;
    `;

    const Imagen = styled.img`
        display: block;
        width: 120px;

    `;

    const Text = styled.p`
        font-size: 18px;
        span {
            font-weight: 700;
        }
    `;

    const Price = styled.p`
        font-size: 24px;
        span {
            font-weight: 700;
        }
    `;

const Result = ({result}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result
  return (
    <Contenedor>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto"/>
        <div>
            <Price>El Precio es de: <span>{PRICE}</span></Price>
            <Text>Precio más alto del dia: <span>{HIGHDAY}</span></Text>
            <Text>Precio más bajo del dia <span>{LOWDAY}</span></Text>
            <Text>Cambios ultimas 24 horas:  <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Ultima actualizacion:  <span>{LASTUPDATE}</span></Text>
        </div>
    </Contenedor>
  )
}

export default Result
