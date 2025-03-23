// components/CharacterList.tsx

import { useState } from 'react';

interface Character {
  name: string;
  description: string;
  personality: string;
}

interface CharacterListProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onEdit, onDelete }) => {
  return (
    <div className="space-y-2">
      {characters.map((character) => (
        <div key={character.name} className="border p-2">
          <h3>{character.name}</h3>
          <p>Description: {character.description}</p>
          <p>Personality: {character.personality}</p>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(character)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
            <button onClick={() => onDelete(character)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;



