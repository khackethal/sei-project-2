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
    // console.log('random', random)
    // console.log('custom', custom)
    // console.log('predicted', predicted)
    setPrediction(predicted)
  }

  const filteredCoins = coins?.data.filter((coin) => {
    return (
      coin.rank.includes(prediction)
    )
  })



  return (
    <>
      <h1>Our predictions can make you rich...</h1>
      <p>Enter some details below to receive a custom prediction of the coin to invest in to become a millionaire** </p>
      
      <section>
        <p>Enter your age, divided by two</p>
        <input
          className="input"
          type="text"
          placeholder="Your age divided by 2 .."
          onChange={handleInput1}
        />

        <p>Substract 1 from your birth month add 13 and enter the number (ie May = (3 - 1 + 13) = 15)</p>
        <input
          className="input"
          type="text" 
          placeholder="Birth month minus one .."
          onChange={handleInput2}
        />  

        <p>Enter your lucky number</p>
        <input
          className="input"
          type="text" 
          placeholder="Your lucky number.."
          onChange={handleInput3}
        />  

        <button onClick={handleButtonClick}>Give me my prediction!</button>
        {/* <button>Reset</button> */}

      </section>

      <section>
        The coin predicted to bring you great riches is: 
        {filteredCoins ? (
          filteredCoins.map((coin) =>
            <div value={coin.priceUsd} key={coin.id}>
              <p>{coin.name}</p>
              <Link to={`coins/${coin.id}`}> Go to Coin</Link>
            </div>)) :
          (<Preloader />)}
      </section>


      <footer>** You must be 16 years or over to partake. No timeframes guaranteed. May take longer than the average human lifespan.</footer>
    </>
  )
}

export default CrystalBall