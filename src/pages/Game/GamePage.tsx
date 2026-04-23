/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { generateRandomCharacters } from '../../services/charactersService'
import type { ICharacter } from '../../types/charactersType'
import Card from '../../components/card/Card'
import './GamePage.scss'
import { duplicateRandomCard, swapRandomCharacters } from '../../utils/functions'
import Modal from '../../components/game/Modal'
import Spinner from '../../components/spinner/Spinner'

const GamePage = () => {
    const [characters, setCharacters] = React.useState<ICharacter[]>([])
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
    const [timeLeft, setTimeLeft] = React.useState<number | null>(10)
    const [allFlipped, setAllFlipped] = React.useState<boolean>(false)
    const [cardsSelected, setCardsSelected] = React.useState<ICharacter[]>([])
    const [attempts, setAttempts] = React.useState<number>(0)
    const [score, setScore] = React.useState<number>(0)
    const [showWinnerAnimation, setShowWinnerAnimation] = React.useState<boolean>(false)
    const [showLoserAnimation, setShowLoserAnimation] = React.useState<boolean>(false)
    const [showNextRoundAnimation, setShowNextRoundAnimation] = React.useState<boolean>(false)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [timeLimit, setTimeLimit] = React.useState<number>(5)
    const [isCardsBlocked, setIsCardsBlocked] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [spinnerMessage, setSpinnerMessage] = React.useState<string>('Cargando partida...')

    const handleGenerateRandomCharacters = async () => {
        try {
            const data = await generateRandomCharacters()
            const dataSlice = data.slice(0, 9)
            const charactersWithFlipState = dataSlice.map((character: ICharacter) => ({
                ...character,
                isFlipped: false,
            }))
            const shuffledCharacters = duplicateRandomCard(charactersWithFlipState)
            if (shuffledCharacters && shuffledCharacters.length > 0) {
                setCharacters(shuffledCharacters)
            }

        } catch (error) {
            console.error('Error fetching characters:', error)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function toggleAllCards(state?: boolean) {
        const updatedCharacters = characters.map((c) => ({
            ...c,
            isFlipped: state ?? !c.isFlipped,
        }))
        setCharacters(updatedCharacters)
        setAllFlipped(state ?? !allFlipped)
    }

    const onSelectCard = (character: ICharacter) => {
        const updatedCharacters = characters.map((c) =>
            c.id === character.id ? { ...c, isFlipped: !c.isFlipped } : c
        )
        setCharacters(updatedCharacters)
        setCardsSelected([...cardsSelected, character])
    }
    const handlePlay = () => {
        setIsPlaying(true)
    }

    const handleEndGame = () => {
        onResetGame()
    }

    const onWinner = async () => {
        setShowWinnerAnimation(true)
        setIsCardsBlocked(true)
        setScore((prev) => prev + 100)
        setTimeout(() => {
            toggleAllCards(false)
            onInitDataGame()
        }, 2000)

        setTimeout(() => {
            setShowModal(true)
        }, 3000)
    }

    const onLoser = () => {
        setShowLoserAnimation(true)
        setIsCardsBlocked(true)
        setAttempts((prev) => prev + 1)
        setTimeout(() => {
            onInitDataGame()
            toggleAllCards(true)
            setIsCardsBlocked(false)
        }, 3000)
    }

    const onInitDataGame = () => {
        setCardsSelected([])
        setTimeLeft(null)
        setShowLoserAnimation(false)
        setShowWinnerAnimation(false)
        setShowNextRoundAnimation(false)
    }

    const onResetGame = () => {
        setShowModal(false)
        setIsPlaying(false)
        setIsCardsBlocked(false)
        setAllFlipped(false)
        setScore(0)
        setAttempts(0)
        onInitDataGame()
    }

    const onNextRound = () => {
        setShowModal(false);
        setShowNextRoundAnimation(true);
        handleGenerateRandomCharacters().then(() => {
            onShuffleCards();
            setIsCardsBlocked(true);
            setTimeLeft(timeLimit);
            startTime();
        });
    };

    const onShuffleCards = () => {
        const shuffledCharacters = swapRandomCharacters(characters)
        setCharacters(shuffledCharacters)
    }

    const startTime = () => {
        const interval = globalThis.setInterval(() => {
            setTimeLeft((previousTime) => {
                if (previousTime === null || previousTime <= 1) {
                    globalThis.clearInterval(interval)
                    return 0

                } return previousTime - 1
            })
        }, 1000)
        return () => {
            globalThis.clearInterval(interval)
        }
    }

    //Obtiene la data de las cards al iniciar el componente
    useEffect(() => {
        const fetchCharacters = async () => {
            await handleGenerateRandomCharacters()
        }
        fetchCharacters()
    }, [])

    //Controla cuando se inicia el juego
    useEffect(() => {
        const startGame = async () => {
            handleGenerateRandomCharacters().then(() => {
                onShuffleCards()
                setIsCardsBlocked(true)
            })

            setTimeout(() => {
                setIsLoading(false)
                toggleAllCards(false)
                setTimeLeft(timeLimit)
                startTime()
            }, 3000);
        }

        if (isPlaying) {
            setIsLoading(true)
            startGame()
        } else {
            toggleAllCards()
            setTimeLeft(timeLimit)
        }
    }, [isPlaying])


    //monitoriza los personajes
    // useEffect(() => {
    //     console.log("characters: ", characters)
    // }, [characters])


    //Controla la logica de ganar o perder
    useEffect(() => {
        if (cardsSelected.length === 2 && isPlaying) {

            const isSameCard = cardsSelected[0].name === cardsSelected[1].name
            if (isSameCard) {
                onWinner()
            } else {
                onLoser()
            }

        }
    }, [cardsSelected])



    //Si el tiempo se acaba, se voltean todas las cartas.
    useEffect(() => {
        if (isPlaying && timeLeft === 0 && !allFlipped) {
            setTimeout(() => {
                toggleAllCards()
                setIsCardsBlocked(false)
            }, 0);
        }
    }, [timeLeft, isPlaying, allFlipped, toggleAllCards])


    return (
        <section className='game-page'>
            <Link to='/home' className='game-page__back-button'>
                <span aria-hidden='true' className='game-page__back-icon'>
                    ←
                </span>
                <span>Volver</span>
            </Link>


            <div className='game-page__board'>

                {showWinnerAnimation && (
                    <div className='game-page__winner-overlay' aria-live='polite'>
                        <span className='game-page__winner-text'>Bien Hecho!</span>
                    </div>
                )}

                {showLoserAnimation && (
                    <div className='game-page__loser-overlay' aria-live='polite'>
                        <span className='game-page__loser-text'>Has perdido!</span>
                    </div>
                )}

                {showNextRoundAnimation && (
                    <div className='game-page__next-round-overlay' aria-live='polite'>
                        <span className='game-page__next-round-text'>Siguiente round!</span>
                    </div>
                )}

                {isPlaying && (
                    <>
                        <div className='game-page__score' aria-live='polite'>
                            <span className='game-page__score-label'>Puntuacion</span>
                            <span className='game-page__score-value'>{score}</span>
                        </div>
                        <div className='game-page__attempts' aria-live='polite'>
                            <span className='game-page__attempts-title'>Intentos:</span>
                            <span className='game-page__attempts-value'>{attempts}</span>
                        </div>
                    </>

                )}

                {isPlaying && timeLeft !== null && timeLeft > 0 && (
                    <div className='game-page__timer' aria-live='polite'>
                        <span className='game-page__timer-icon' aria-hidden='true'>
                            <svg viewBox='0 0 24 24' focusable='false' aria-hidden='true'>
                                <circle cx='12' cy='12' r='9' />
                                <path d='M12 7v5l3 2' />
                            </svg>
                        </span>
                        <span className='game-page__timer-value'>{timeLeft}s</span>
                    </div>
                )}

                <div className='game-page__grid'>
                    {characters.map((character) => (
                        <Card
                            key={character.id}
                            character={character}
                            isFlipped={character.isFlipped}
                            onClick={() => { onSelectCard(character) }}
                            disabled={isCardsBlocked}
                        />
                    ))}
                </div>
                {isPlaying ? (
                    <div className='game-page__actions'>
                        <button type='button' className='game-page__play-button' onClick={handleEndGame}>
                            Terminar juego!
                        </button>
                    </div>
                ) : (
                    <div className='game-page__actions'>
                        <button type='button' className='game-page__play-button' onClick={handlePlay}>
                            Jugar!
                        </button>
                    </div>
                )}

            </div>


            {isLoading && <Spinner message={spinnerMessage} fullscreen />}
            <Modal
                isOpen={showModal}
                onNextRound={onNextRound}
                onEndGame={handleEndGame}
            />
        </section>
    )
}

export default GamePage