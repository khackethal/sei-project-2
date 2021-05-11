import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TradingViewWidget from 'react-tradingview-widget'
// ! Added preloader
import Preloader from '../preloader/Preloader'

function CoinDetails() {
  const coinId = useParams().id
  const [coin, setCoin] = React.useState(null)

  React.useEffect(() => {
    // ! Added interval to keep price updated / added clearInterval
    const interval = setInterval(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://api.coincap.io/v2/assets/${coinId}`
          )
          setCoin(response.data)
          console.log(coin)
        } catch (err) {
          //console.log(err)
        }
      }
      getData()
    }, 5000)
    return () => clearInterval(interval)
  }, [coinId, coin])
  // ! Added float to shorten the numbers
  const toFloat = (num, places) => Number.parseFloat(num).toFixed(places)
  // console.log(coinId)
  // ! Added Section Div to main container
  // ! Added Hero, moved image to hero
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
      {/* {coin && console.log('Coin', coin.data.symbol, coin)} */}
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
    </>
  )
}

export default CoinDetails

{
  /* <section className="hero is-success is-halfheight is-overlay">
                <div className="hero-body">
                  <div className="">
                    <p className="title"><iframe src="https://lottiefiles.com/iframe/57735-crypto-coins"></iframe></p>
                    <p className="subtitle">Half height subtitle</p>
                  </div>
                </div>
              </section>
              <div className="section is-overlay">
                <iframe src="https://lottiefiles.com/iframe/57735-crypto-coins"></iframe>
                <p>Loading</p>
              </div> */
}
