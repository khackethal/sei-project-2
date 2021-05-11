import React from 'react'
import axios from 'axios'
import Preloader from '../preloader/Preloader'
import { Link } from 'react-router-dom'

function CrystalBall() {
  const [coins, setAllCoins] = React.useState(null)
  const [num1, setNum1] = React.useState(null)
  const [num2, setNum2] = React.useState(null)
  const [num3, setNum3] = React.useState(null)
  const [prediction, setPrediction] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets/')
        setAllCoins(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [coins])

  const handleInput1 = (e) => {
    setNum1(e.target.value)
  }

  const handleInput2 = (e) => {
    setNum2(e.target.value)
  }

  const handleInput3 = (e) => {
    setNum3(e.target.value)
  }

  const handleButtonClick = () => {
    calculatePrediction()
  }

  function calculatePrediction() {
    const random = Math.floor(Math.random() * 8)
    const custom = Math.floor(Number(num1)) + Number(num2) + Number(num3)
    const predicted = custom - random
    setPrediction(predicted)
  }

  const filteredCoins = coins?.data.filter((coin) => {
    return coin.rank.includes(prediction)
  })

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <div className="title is-5">
              Our predictions can make you rich...
            </div>
            <p className="box">
              Enter some details below to receive a custom prediction of the
              coin to invest in to become a millionaire**{' '}
            </p>

            <div className="section">
              <div className="field">
                <label className="label">Enter your age, divided by two</label>
                <div className="control">
                  <p></p>
                  <input
                    className="input"
                    type="text"
                    placeholder="Your age divided by 2 .."
                    onChange={handleInput1}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  Substract 1 from your birth month, add 13 and enter the number
                  (ie March = (3 - 1 + 13) = 15)
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Birth month minus one .."
                    onChange={handleInput2}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Enter your lucky number</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Your lucky number.."
                    onChange={handleInput3}
                  />
                </div>
              </div>
              <div className="field">
                
                <div className="control">
                  <div className="button" onClick={handleButtonClick}>
                    Give me my prediction!
                  </div>
                </div>
              </div>

              {/* <button>Reset</button> */}
            </div>
            <div className="box">
              <div className="section">
                <p>The coin predicted to bring you great riches is:</p>
                {filteredCoins ? (
                  filteredCoins.map((coin) => (
                    
                    <div value={coin.priceUsd} key={coin.id}>
                      <div className="box crystal-ball">
                        <div className="is-flex is-horizontal-center">
                          <img
                            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                          />
                          <div className="title">{coin.name}</div>
                          <Link to={`coins/${coin.id}`}>
                            <div className="button"> Go to {coin.name} Coin</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    
                  ))
                ) : (
                  <Preloader />
                )}
              </div>
            </div>

            <footer>
              ** You must be 16 years or over to partake. No timeframes
              guaranteed. May take longer than the average human lifespan.
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default CrystalBall
