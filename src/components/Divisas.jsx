import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';

const H1S = styled.h1 `
    
    font-size: 25px;
    color: white; 
    padding: 15px;
    margin: auto;
    font-family: 'lato', sans-serif;
    font-weight:700;
    text-align: center;
`
const P = styled.p `
    font-size: 20px;
    color: white;
    font-family:"lato", sans-serif;
    font-weight: 700;
    text-align: center;

`
const Divisas = () => {
    
    const [latestPrice, setLatestPrice] = useState('');
    const [latestTimestamp, setLatestTimestamp] = useState('');

    useEffect(() => {
        const ws = new WebSocket('wss://stream.tradingeconomics.com/?client=guest:guest');
    
        ws.onopen = () => {
          ws.send('{"topic": "subscribe", "to": "EURUSD:CUR"}');
        };
    
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.dt && data.price) {
            setLatestPrice(data.price);
            const timestamp = new Date(data.dt * 1000).toLocaleString();
            setLatestTimestamp(timestamp);
          }
        };
    
        return () => {
          ws.close();
        };
      }, []);
    
  return (
    <div>
        <H1S>Cotización EUR/DOLAR</H1S>
        <P>Ultimo precio actualizado {latestPrice}</P>
        <P>Timestamp: {latestTimestamp}</P>
    </div>
  )
}

export default Divisas