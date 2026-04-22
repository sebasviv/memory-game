import React from 'react'
import { generateRandomCharacters } from '../../services/charactersService'
import type { ICharacter } from '../../types/charactersType'

const GamePage = () => {

    const [characters, setCharacters] = React.useState<ICharacter[]>([])

    React.useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await generateRandomCharacters()
                console.log("data", data)
                setCharacters(data)
            } catch (error) {
                console.error('Error fetching characters:', error)
            }
        }
        fetchCharacters()
    }, [])


    return (
        <div>Game</div>
    )
}

export default GamePage