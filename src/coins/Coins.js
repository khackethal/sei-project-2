import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function Coins() {
  const [coins, setAllCoins] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

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
  }, [])

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredCoins = coins?.data.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.rank.includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    )
  })

  console.log(searchTerm)

  return (
    <>
      <div className="container">
        <input
          placeholder="Search by currency name, rank or symbol..."
          onChange={handleInput}
          value={searchTerm}
        />
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
      {/* <h1>All coins</h1> */}
      <div className="container">
        <div className="columns is-multiline">
          {filteredCoins ? (
            filteredCoins.map((coin) => (
              <div className="column is-one-quarter-desktop is-one-third-tablet" key={coin.id}>
                <div className="card">
                  <Link to={`coins/${coin.id}`}>
                    <div className="card-header">
                      <div className="card-header-title"> {coin.name} ({coin.symbol})</div>
                    </div>
                    <div className="card-content is-flex is-horizontal-center">
                      <img
                        src={`http://nonovium.com/wp-content/uploads/sites/5/2021/05/${coin.symbol.toLowerCase()}.png`}
                      />
                    </div>
                    <div className="card-footer">
                      <span className="card-footer-item">Rank: # {coin.rank}</span></div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>...loading</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Coins
