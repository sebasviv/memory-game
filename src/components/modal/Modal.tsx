import './Modal.scss'

type ModalProps = {
  isOpen: boolean
  score?: number
  attempts?: number
  onPlayAgain?: () => void

}

const Modal = ({
  isOpen,
  score = 0,
  attempts = 0,
  onPlayAgain,

}: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <dialog className='game-modal' open aria-labelledby='game-modal-title'>
      <div className='game-modal__backdrop' />

      <div className='game-modal__panel'>
        <div className='game-modal__glow'></div>
        <h2 className='game-modal__title' id='game-modal-title'>
          ¡Resultados!
        </h2>

        <div className='game-modal__results'>
          <div className='game-modal__result-item'>
            <span className='game-modal__result-label'>Puntaje</span>
            <span className='game-modal__result-value'>{score}</span>
          </div>

          <div className='game-modal__result-item'>
            <span className='game-modal__result-label'>Intentos</span>
            <span className='game-modal__result-value'>{attempts}</span>
          </div>
        </div>

        <div className='game-modal__actions'>
          <button type='button' className='game-modal__button game-modal__button--play' onClick={onPlayAgain}>
            Jugar otra vez
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default Modal