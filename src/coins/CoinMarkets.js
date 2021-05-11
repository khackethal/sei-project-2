import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// ! Added preloader
import Preloader from '../preloader/Preloader'

function CoinMarkets() {
  const coinId = useParams().id
  const [markets, setMarkets] = React.useState(null)

  React.useEffect(() => {
    // ! Added interval to keep price updated / added clearInterval

    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${coinId}/markets?limit=10`
        )
        setMarkets(response.data)
        console.log(markets)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  const toFloat = (num, places) => Number.parseFloat(num).toFixed(places)

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="box">
            <table className="table">
              <thead>
                <tr>
                  <th>
                  Exchange
                  </th><th>
                    <abbr title="The quoted price in USD">Quote</abbr>
                  </th>
                  <th>Base Symbol</th>
                  <th>
                    Quote Symbol
                  </th>
                  <th>
                    Market Type
                  </th>
                  
                  <th>
                    Base Market
                  </th>
                </tr>
              </thead>
              {markets ? (
                markets.data.map((market) => (
                  <tr key={`key-${market.baseId}-${market.exchangeId}-${market.quoteSymbol}`}>
                    <th>{market.exchangeId}</th>
                    <td>{toFloat(market.priceUsd, 2)}</td>
                    <td>{market.baseSymbol}</td>
                    <td>{market.quoteSymbol}</td>
                    <td>{market.baseId}</td>
                    
                    <td>{market.quoteId}</td>
                    
                    
                  </tr>
                ))
              ) : (
                <>
                  <Preloader />
                </>
              )}{' '}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoinMarkets
