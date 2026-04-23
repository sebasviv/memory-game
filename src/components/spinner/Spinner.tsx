import './spinner.scss'

type SpinnerProps = {
  message?: string
  fullscreen?: boolean
}

const Spinner = ({ message = 'Cargando partida...', fullscreen = false }: SpinnerProps) => {
  return (
    <div className={`game-spinner${fullscreen ? ' game-spinner--fullscreen' : ''}`} role='status' aria-live='polite'>
      <div className='game-spinner__hud' aria-hidden='true'>
        <span className='game-spinner__core' />
        <span className='game-spinner__ring game-spinner__ring--outer' />
        <span className='game-spinner__ring game-spinner__ring--inner' />
        <span className='game-spinner__spark game-spinner__spark--one' />
        <span className='game-spinner__spark game-spinner__spark--two' />
      </div>

      <p className='game-spinner__text'>{message}</p>
      <p className='game-spinner__subtitle'>Inicializando portal...</p>
    </div>
  )
}

export default Spinner