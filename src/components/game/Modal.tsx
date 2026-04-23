import './Modal.scss'

type ModalProps = {
  isOpen: boolean
  onNextRound: () => void
  onEndGame: () => void
  title?: string
  description?: string
}

const Modal = ({
  isOpen,
  onNextRound,
  onEndGame,
  title = 'Ronda completada',
  description = 'Elige tu siguiente movimiento para continuar en la partida.'
}: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <dialog className='game-modal' open aria-labelledby='game-modal-title'>
      <div className='game-modal__backdrop' />

      <div className='game-modal__panel'>
        <p className='game-modal__status'>Mission Update</p>
        <h2 className='game-modal__title' id='game-modal-title'>
          {title}
        </h2>
        <p className='game-modal__description'>{description}</p>

        <div className='game-modal__actions'>
          <button
            type='button'
            className='game-modal__button game-modal__button--primary'
            onClick={onNextRound}
          >
            Siguiente ronda
          </button>

          <button
            type='button'
            className='game-modal__button game-modal__button--danger'
            onClick={onEndGame}
          >
            Terminar juego
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default Modal