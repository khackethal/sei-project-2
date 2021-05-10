import axios from 'axios'
import React from 'react'

function Coins() {
  const [coins, setAllCoins] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')


  React.useEffect( () => {
    const getData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets/')
        setAllCoins(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])


  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredCoins = coins?.data.filter((coin) => {
    return (
      (coin.name.toLowerCase().includes(searchTerm)))
  })

  console.log(searchTerm)

  return (
    <>
      <div className="container">
        <input
          placeholder="Search by currency name..."
          onChange={handleInput}
          value={searchTerm}
        />
        <button type="button" onClick={handleClear}>Clear</button>
      </div>
      {/* <h1>All coins</h1> */}
      <div className="container">
        <div className="column is-multiline">
          {filteredCoins ? (filteredCoins.map(coin => 
            <div className="card" key={coin.id}>
              <h2>Name: {coin.name}</h2>
              <h3>Symbol: {coin.symbol}</h3>
              <p>Rank: {coin.rank} </p>
            </div>)) : ( <p>...loading</p>)}
        </div>
      </div>
    </>
  )
}

export default Coins
