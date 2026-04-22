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

  const randomIndex1 = Math.floor(Math.random() * characters.length);
  let randomIndex2 = Math.floor(Math.random() * characters.length);

  while (randomIndex1 === randomIndex2) {
    randomIndex2 = Math.floor(Math.random() * characters.length);
  }

  const updatedCharacters = [...characters];

  [updatedCharacters[randomIndex1], updatedCharacters[randomIndex2]] = [
    updatedCharacters[randomIndex2],
    updatedCharacters[randomIndex1],
  ];

  return updatedCharacters;
};
