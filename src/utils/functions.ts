import type { ICharacter } from "../types/charactersType";

export const duplicateRandomCard = (charactersTmp: ICharacter[]) => {
  if (charactersTmp.length < 2) return;

  const updatedCharacters: ICharacter[] = [...charactersTmp];
  const charactersUsed: Set<number> = new Set();

  while (updatedCharacters.length < charactersTmp.length * 2) {
    let randomIndex = Math.floor(Math.random() * charactersTmp.length);
    let randomCharacter = charactersTmp[randomIndex];

    while (charactersUsed.has(randomCharacter.id)) {
      randomIndex = Math.floor(Math.random() * charactersTmp.length);
      randomCharacter = charactersTmp[randomIndex];
    }

    charactersUsed.add(randomCharacter.id);

    const duplicatedCharacter: ICharacter = {
      ...randomCharacter,
      id: randomCharacter.id + 1000,
    };

    updatedCharacters.push(duplicatedCharacter);
  }

  return updatedCharacters;
};

export const swapRandomCharacters = (
  characters: ICharacter[],
): ICharacter[] => {
  if (characters.length < 2) return characters;

  const updatedCharacters = [...characters];

  for (let i = updatedCharacters.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [updatedCharacters[i], updatedCharacters[randomIndex]] = [
      updatedCharacters[randomIndex],
      updatedCharacters[i],
    ];
  }

  return updatedCharacters;
};
