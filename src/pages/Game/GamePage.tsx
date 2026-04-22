/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { generateRandomCharacters } from '../../services/charactersService'
import type { ICharacter } from '../../types/charactersType'
import Card from '../../components/card/Card'
import './GamePage.scss'
import { duplicateRandomCard, swapRandomCharacters } from '../../utils/functions'

const GamePage = () => {
    const [characters, setCharacters] = React.useState<ICharacter[]>([])
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
    const [timeLeft, setTimeLeft] = React.useState<number>(5)
    const [allFlipped, setAllFlipped] = React.useState<boolean>(false)
    const [cardsSelected, setCardsSelected] = React.useState<ICharacter[]>([])
    const [attempts, setAttempts] = React.useState<number>(0)
    const [showWinnerAnimation, setShowWinnerAnimation] = React.useState<boolean>(false)
    const [showLoserAnimation, setShowLoserAnimation] = React.useState<boolean>(false)

    React.useEffect(() => {
        const fetchCharacters = async () => {
            await handleGenerateRandomCharacters()
        }
        fetchCharacters()
    }, [])


    useEffect(() => {
        if (isPlaying && timeLeft === 0 && !allFlipped) {
            setTimeout(() => {
                flipAllCards(true)
                setShowLoserAnimation(true)
                setCardsSelected([])
            }, 0);
        }
    }, [timeLeft, isPlaying, allFlipped, flipAllCards])


    useEffect(() => {
        const isSameCard = cardsSelected.length === 2 && cardsSelected[0].name === cardsSelected[1].name

        console.log("score: ", isSameCard, cardsSelected.length)

        if (cardsSelected.length === 2 && !isSameCard) {
            setAttempts((prev) => prev + 1);
            setShowLoserAnimation(true)
            globalThis.setTimeout(() => {
                setShowLoserAnimation(false)
                onLoser()
            }, 3000)
        }

        if (cardsSelected.length === 2 && isSameCard) {
            setShowWinnerAnimation(true)
            globalThis.setTimeout(() => {
                setShowWinnerAnimation(false)
                onWinner()
            }, 3000)
        }
    }, [cardsSelected])


    const handleGenerateRandomCharacters = async () => {
        try {
            const data = await generateRandomCharacters()
            const dataSlice = data.slice(0, 9)
            const charactersWithFlipState = dataSlice.map((character: ICharacter) => ({
                ...character,
                isFlipped: true,
            }))
            setCharacters(duplicateRandomCard(charactersWithFlipState))
        } catch (error) {
            console.error('Error fetching characters:', error)
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function flipAllCards(state: boolean) {
        const updatedCharacters = characters.map((c) => ({
            ...c,
            isFlipped: state,
        }))
        setCharacters(updatedCharacters)
        setAllFlipped(state)
    }

    const onSelectCard = (character: ICharacter) => {
        const updatedCharacters = characters.map((c) =>
            c.id === character.id ? { ...c, isFlipped: !c.isFlipped } : c
        )
        setCharacters(updatedCharacters)
        setCardsSelected([...cardsSelected, character])
    }
    const handlePlay = () => {
        flipAllCards(false)
        setTimeLeft(5)
        setIsPlaying(true)
        startTime()
    }

    const handleEndGame = () => {
        flipAllCards(true)
        setIsPlaying(false)
        setTimeLeft(5)
    }

    const onWinner = async () => {
        setAttempts(0)
        flipAllCards(true)
        handleGenerateRandomCharacters().then(() => {
            flipAllCards(false)
            setTimeLeft(5)
            startTime()
        })
    }

    const onLoser = () => {
        flipAllCards(true)
        handleGenerateRandomCharacters().then(() => {
            flipAllCards(false)
            setTimeLeft(5)
            startTime()
        })
    }

    const onShuffleCards = () => {
        const shuffledCharacters = swapRandomCharacters(characters)
        setCharacters(shuffledCharacters)
    }



    const startTime = () => {
        const interval = globalThis.setInterval(() => {
            setTimeLeft((previousTime) => {
                if (previousTime <= 1) {
                    globalThis.clearInterval(interval)
                    return 0

                } return previousTime - 1
            })
        }, 1000)
        return () => {
            globalThis.clearInterval(interval)
        }
    }

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

                {isPlaying && (
                    <div className='game-page__attempts' aria-live='polite'>
                        <span className='game-page__attempts-title'>Intentos:</span>
                        <span className='game-page__attempts-value'>{attempts}</span>
                    </div>
                )}

                {isPlaying && timeLeft > 0 && (
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
        </section>
    )
}

export default GamePage