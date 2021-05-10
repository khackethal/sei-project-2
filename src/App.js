import axios from 'axios'
import React from 'react'

function App() {
  const [coins, setAllCoins] = React.useState(null)

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

  console.log(coins)

  return (
    <>
      {coins ? (
        coins.map(coin => (
          <h1 key={coin.id}>{coin.name}</h1>
        ))
      )
        : 
        (
          <>
            <p>Loading..</p>
          </>
        )}
    </>
  )
}

export default App
