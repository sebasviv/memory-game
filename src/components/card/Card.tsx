import React from 'react'
import type { ICharacter } from '../../types/charactersType';
import './Card.scss';
import mortySmith from '../../assets/morty-smith.svg';

interface ICardProps {
    character: ICharacter;
    isFlipped: boolean;
    onClick: () => void;
}

const Card: React.FC<ICardProps> = ({ character, isFlipped, onClick }) => {
  return (
    <button
      type='button'
      className={`game-card ${isFlipped ? 'game-card--flipped' : ''}`}
      onClick={onClick}
      aria-label={`Carta de ${character.name}`}
    >
      <div className='game-card__inner'>
        <article className='game-card__face game-card__face--front'>
          <img className='game-card__image' src={character.image} alt={character.name} />
          <div className='game-card__info'>
            <h3 className='game-card__name'>{character.name}</h3>
            <p className='game-card__species'>{character.species}</p>
          </div>
        </article>

        <article className='game-card__face game-card__face--back'>
          <div className='game-card__overlay' />
          <img className='game-card__back-image' src={mortySmith} alt='Morty Smith' />
        </article>
      </div>
    </button>
  )
}

export default Card