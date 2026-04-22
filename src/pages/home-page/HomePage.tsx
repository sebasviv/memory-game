import React from 'react'
import { useNavigate } from 'react-router-dom'
import rickSanchez from '../../assets/rick_sanchez.svg'
import './HomePage.scss'
import Game from '../Game/GamePage'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <div className="home-card">
        <img src={rickSanchez} alt="Rick Sanchez" className="home-card__hero" />
        <h1 className="home-card__title">Memory Game</h1>
        <p className="home-card__subtitle">¿Puedes vencer a Rick Sanchez?</p>
        <button className="home-card__btn" onClick={() => navigate('/game')}>
          ▶ Jugar
        </button>
      </div>
    </div>
  )
}

export default HomePage