// components/CharacterForm.tsx

import { useState } from 'react';

interface Character {
  name: string;
  description: string;
  personality: string;
}

interface CharacterFormProps {
  onSubmit: (character: Character) => void;
  initialCharacter?: Character;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, initialCharacter }) => {
  const [name, setName] = useState(initialCharacter?.name || '');
  const [description, setDescription] = useState(initialCharacter?.description || '');
  const [personality, setPersonality] = useState(initialCharacter?.personality || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, personality });
    setName('');
    setDescription('');
    setPersonality('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-zinc-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-zinc-700">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-zinc-700">Personality:</label>
        <textarea
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="border p-2 w-full bg-gray-50"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialCharacter ? 'Update Character' : 'Add Character'}
      </button>
    </form>
  );
};

export default CharacterForm;



