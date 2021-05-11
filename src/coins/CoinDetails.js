import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import TradingViewWidget from 'react-tradingview-widget'
import Preloader from '../preloader/Preloader'
import CoinMarkets from '../coins/CoinMarkets'

function CoinDetails() {
  const history = useHistory()
  const coinId = useParams().id
  const [coin, setCoin] = React.useState(null)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://api.coincap.io/v2/assets/${coinId}`
          )
          setCoin(response.data)
          console.log(coin)
        } catch (err) {
          history.push('./error')
        }
      }
      getData()
    }, 5000)
    return () => clearInterval(interval)
  }, [coinId, coin])

  const toFloat = (num, places) => Number.parseFloat(num).toFixed(places)

  return (
    <>
      {coin && (
        <section className="hero is-small is-link">
          <div className="container is-fluid">
            <div className="hero-body">
              <div className="block is-pulled-left">
                <img
                  src={`https://assets.coincap.io/assets/icons/${coin.data.symbol.toLowerCase()}@2x.png`}
                />
              </div>
              <div className="block is-grouped">
                <p className="title">{coin.data.name}</p>
                <p className="subtitle">${toFloat(coin.data.priceUsd, 2)}</p>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="container">
        <div className="section">
          <div className="box">
            {coin ? (
              <div className="columns is-multline">
                <div className="column is-half-desktop">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-title">{coin.data.name}<div className="card-header-title is-pulled-right"></div>
                      
                        ${toFloat(coin.data.priceUsd, 2)}
                      </div>
                    </div>
                    <div className="card-content">
                      <ul>
                        <li>
                          <strong>Name: </strong>
                          {coin.data.name}
                        </li>
                        <li>
                          <strong>Price: </strong>$
                          {toFloat(coin.data.priceUsd, 2)}
                        </li>
                        <li>
                          <strong>Rank: </strong># {coin.data.rank}
                        </li>
                        <li>
                          <strong>24hr Change: </strong>
                          {toFloat(coin.data.changePercent24Hr, 2)} %
                        </li>
                        <li>
                          <strong>Market Cap (USD): </strong>
                          {toFloat(coin.data.marketCapUsd, 0)}
                        </li>
                        <li>
                          <strong>Volume (24 Hr): </strong>$
                          {toFloat(coin.data.volumeUsd24Hr, 0)}
                        </li>
                        <li>
                          <strong>VWAP (24 Hr): </strong>$
                          {toFloat(coin.data.vwap24Hr, 2)}
                        </li>
                        <li>
                          <strong>Max Supply: </strong>
                          {toFloat(coin.data.maxSupply, 0)}
                        </li>
                        <li>
                          <strong>Current Supply: </strong>
                          {toFloat(coin.data.supply, 0)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="column is-half-desktop">
                  <TradingViewWidget
                    symbol={`${coin.data.symbol}USD`}
                    autosize
                  />
                </div>
              </div>
            ) : (
              <>
                <Preloader />
              </>
            )}
          </div>
        </div>
      </div>
      {coin && <><CoinMarkets /></> }
    </>
  )
}

export default CoinDetails
