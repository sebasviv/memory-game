import type { ICharacter } from "../types/charactersType";

export const duplicateRandomCard = (charactersTmp: ICharacter[]) => {
  if (charactersTmp.length < 2) return; // Asegurarse de que haya al menos dos personajes

  const randomIndex = Math.floor(Math.random() * charactersTmp.length);

  const randomCharacter = charactersTmp[randomIndex];

  let destinationIndex = Math.floor(Math.random() * charactersTmp.length);
  while (destinationIndex === randomIndex) {
    destinationIndex = Math.floor(Math.random() * charactersTmp.length);
  }

  const duplicatedCharacter: ICharacter = {
    ...randomCharacter,
    id: randomCharacter.id + 1000,
  };

  const updatedCharacters = [...charactersTmp];
  updatedCharacters[destinationIndex] = duplicatedCharacter;

  return updatedCharacters;
};

export const swapRandomCharacters = (
  characters: ICharacter[],
): ICharacter[] => {
  if (characters.length < 2) return characters;

  const updatedCharacters = [...characters];

  // Realiza una mezcla de Fisher-Yates
  for (let i = updatedCharacters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio entre 0 y i
    // Intercambia los elementos
    [updatedCharacters[i], updatedCharacters[randomIndex]] = [
      updatedCharacters[randomIndex],
      updatedCharacters[i],
    ];
  }

  return updatedCharacters;
};
