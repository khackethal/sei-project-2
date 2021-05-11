import axios from 'axios'
import React from 'react'
import Preloader from '../preloader/Preloader'

function Calculator() {
  const [coins, setAllCoins] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [budget, setBudget] = React.useState(null)
  const [selectedCoin, setSelectedCoin] = React.useState(null)
  const [coinName, setCoinName] = React.useState('')
  const [finalAmount, setFinalAmount] = React.useState(null)

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

  // const handleInput = (e) => {
  //   setSearchTerm(e.target.value)
  // }

  const handleDropdown = (e) => {
    setSelectedCoin(e.target.value)
    setCoinName(e.target.id)
    console.log(selectedCoin, e, e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
    setAllCoins(null)
    setBudget('')
  }

  const filteredCoins = coins?.data.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.rank.includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    )
  })


  const handleInputBudget = (e) => {
    setBudget(e.target.value)
  }



  const handleCalculate = () => {
    Calculator()

  }

  function Calculator()  {
    if (budget && selectedCoin) {
      const canGet = Number(budget) / Number(selectedCoin)
      setFinalAmount(canGet)
    }
  }
  



  return (
    <>
      <h1>Calculator</h1>
      <h1>Select your coin</h1>
      {/* <input
        className="input"
        type="text"
        placeholder="Search .."
        onChange={handleInput}
        value={searchTerm}
      /> */}
      <select onChange={handleDropdown} > 
        <option></option>
        {filteredCoins ? (
          filteredCoins.map((coin) =>
            <option value={coin.priceUsd} key={coin.id}>{coin.name}</option>)) :
          (<Preloader />)}
      </select>

      <button className="button" onClick={handleClear}>
              Clear
      </button>

      <h1>Enter your budget in USD $</h1>
      <input
        className="input"
        type="text"
        placeholder="$ .."
        onChange={handleInputBudget}
      />

      <button className="button" onClick={handleCalculate}>
            Calculate! 
      </button>
      
      <div> {finalAmount ? `At current market rate you can buy ${finalAmount} coins of your chosen coin.` : ''}</div>

    </>

  )
}

export default Calculator