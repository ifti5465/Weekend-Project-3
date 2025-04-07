// app/page.tsx

"use client";
import { useState } from 'react';
import CharacterForm from '../components/CharacterForm';
import CharacterList from '../components/CharacterList';
import { generateStoryWithOllama } from '../services/ollamaService';

interface Character {
  name: string;
  description: string;
  personality: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];

  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const addCharacter = (character: Character) => {
    if (editingCharacter) {
      setCharacters(characters.map(c => c.name === editingCharacter.name ? character : c));
      setEditingCharacter(null);
    } else {
      setCharacters([...characters, character]);
    }
  };

  const editCharacter = (character: Character) => {
    setEditingCharacter(character);
  };

  const deleteCharacter = (character: Character) => {
    setCharacters(characters.filter(c => c.name !== character.name));
  };

  const generateStory = async () => {
    console.log("generateStory function is being called!");
    setIsLoading(true);
    const characterDetails = characters.map(c => `- Name: ${c.name}, Description: ${c.description}, Personality: ${c.personality}`).join('\n');
    const prompt = `Characters:\n${characterDetails}\n\nGenerate a ${state.genre} story in a ${state.tone} tone.`;
    try {
      let fullResponse = await generateStoryWithOllama(prompt);
      setResponse(fullResponse);
    } catch (error: any) {
      console.error("Error generating story:", error);
      setResponse("Error generating story.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-700 dark:text-zinc-400">
              Customize the story by selecting the genre and tone.
            </p>
          </div>

          <CharacterForm onSubmit={addCharacter} initialCharacter={editingCharacter}/>
          <CharacterList characters={characters} onEdit={editCharacter} onDelete={deleteCharacter}/>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white">Genre</h3> {/* Adjusted text color */}
            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2 text-white" htmlFor={value}> {/* Adjusted text color */}
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white">Tones</h3> {/* Adjusted text color */}
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="tone"
                    onChange={handleChange}
                  />
                  <label className="ml-2 text-white" htmlFor={value}> {/* Adjusted text color */}
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={generateStory}
          >
            Generate Story
          </button>

          <div
            hidden={!response}
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4 text-white"
          >
            {response}
          </div>
        </div>
      </div>
    </main>
  );
}

