import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './preloader.json'

class preloader extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="title">
              <h1 className="has-text-centered">Getting the latest prices</h1>
              <Lottie options={defaultOptions} height={600} width={600} />
            </div>
          </div>
        </div>
        
      </>
    )
  }
}

export default preloader
