import './FilterGameContainer.scss'

interface FilterGameContainerProps {
  countCards: number
  timeLimit: number
  onCountCardsChange: (value: number) => void
  onTimeLimitChange: (value: number) => void
}

const FilterGameContainer = ({
  countCards,
  timeLimit,
  onCountCardsChange,
  onTimeLimitChange,
}: FilterGameContainerProps) => {
  return (
    <section className='filter-game-panel' aria-labelledby='difficulty-panel-title'>
      <div className='filter-game-panel__header'>
        <p className='filter-game-panel__eyebrow'>Configura la partida</p>
        <h2 id='difficulty-panel-title' className='filter-game-panel__title'>
          Nivel de dificultad
        </h2>
        <p className='filter-game-panel__subtitle'>
          Ajusta la grilla y el tiempo de memoria antes de empezar.
        </p>
      </div>

      <div className='filter-game-panel__controls'>
        <label className='filter-game-panel__control' htmlFor='count-cards-slider'>
          <div className='filter-game-panel__control-top'>
            <span className='filter-game-panel__label'>Cards totales</span>
            <span className='filter-game-panel__value'>{countCards}</span>
          </div>
          <input
            id='count-cards-slider'
            className='filter-game-panel__slider'
            type='range'
            min={2}
            max={10}
            step={2}
            value={countCards}
            onChange={(event) => onCountCardsChange(Number(event.target.value))}
            aria-describedby='count-cards-help'
          />
          <span id='count-cards-help' className='filter-game-panel__help'>
            Aumenta de 2 en 2 hasta un maximo de 10 cards.
          </span>
        </label>

        <label className='filter-game-panel__control' htmlFor='time-limit-slider'>
          <div className='filter-game-panel__control-top'>
            <span className='filter-game-panel__label'>Tiempo para memorizar</span>
            <span className='filter-game-panel__value'>{timeLimit}s</span>
          </div>
          <input
            id='time-limit-slider'
            className='filter-game-panel__slider filter-game-panel__slider--secondary'
            type='range'
            min={1}
            max={10}
            step={1}
            value={timeLimit}
            onChange={(event) => onTimeLimitChange(Number(event.target.value))}
            aria-describedby='time-limit-help'
          />
          <span id='time-limit-help' className='filter-game-panel__help'>
            Define entre 1 y 10 segundos cuanto tiempo ve el jugador las cards.
          </span>
        </label>
      </div>
    </section>
  )
}

export default FilterGameContainer