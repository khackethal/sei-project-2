import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TradingViewWidget from 'react-tradingview-widget'

function CoinDetails() {
  const coinId = useParams().id
  const [coin, setCoin] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${coinId}`
        )
        setCoin(response.data)
        console.log(coin)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [coinId])

  // console.log(coinId)

  return (
    <>
      {/* {coin && console.log('Coin', coin.data.symbol, coin)} */}
      <div className="container">
        <div className="box">
          {coin ? (
            <div className="columns is-multline">
              <div className="column is-half-desktop">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title">{coin.data.name}</div>
                  </div>
                  <div className="card-content">
                    <ul>
                      <img
                        src={`http://nonovium.com/wp-content/uploads/sites/5/2021/05/${coin.data.symbol.toLowerCase()}.png`}
                      />
                      <li>
                        <strong>Name: </strong>
                        {coin.data.name}
                      </li>
                      <li>
                        <strong>Rank: </strong>
                        {coin.data.rank}
                      </li>
                      <li>
                        <strong>24hr Change: </strong>
                        {coin.data.changePercent24Hr}
                      </li>
                      <li>
                        <strong>Market Cap (USD): </strong>
                        {coin.data.marketCapUsd}
                      </li>
                      <li>
                        <strong>Max Supply: </strong>
                        {coin.data.maxSupply}
                      </li>
                      <li>
                        <strong>Price (USD): </strong>
                        {coin.data.priceUsd}
                      </li>
                      <li>
                        <strong>Rank: </strong>
                        {coin.data.rank}
                      </li>
                      <li>
                        <strong>Current Supply: </strong>
                        {coin.data.supply}
                      </li>
                      <li>
                        <strong>Volume USD (24 Hr): </strong>
                        {coin.data.volumeUsd24Hr}
                      </li>
                      <li>
                        <strong>VWAP (24 Hr): </strong>
                        {coin.data.vwap24Hr}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column is-half-desktop">
                <TradingViewWidget symbol={coin.data.symbol} autosize />
              </div>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </>
  )
}

export default CoinDetails
