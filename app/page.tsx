"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";

interface Character {
  id: number;
  name: string;
  description: string;
  personality: string;
}

export default function Chat() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: 0,
    name: '',
    description: '',
    personality: ''
  });

  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);
  const [storyGenerated, setStoryGenerated] = useState<boolean>(false);
  const [characterSummary,setCharacterSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const { messages, append, isLoading } = useChat();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addCharacter = () => {
    setCharacters([...characters, { ...newCharacter, id: Date.now() }]);
    setNewCharacter({ id: 0, name: '', description: '', personality: '' });
  };

  const generateStory = async () => {
    const characterDetails = characters.map(char => 
      `Name: ${char.name}, Description: ${char.description}, Personality: ${char.personality}`
    ).join("\n");

    const storyPrompt = `You are a professional storyteller. Write a single captivating and imaginative short story that includes the following characters. Ensure the story is unique and memorable, with compelling characters and unexpected plot twists. Here are the characters for your story:${characterDetails}\n.`;

    // Append the story prompt with character details
    await append({
      role: "system" as const,
      content: storyPrompt,
    });

    setStoryGenerated(true);
  };

  const generateCharacterSummary = async () => {
    setIsSummaryLoading(true);
    const summaryPrompt = `Summarize the role of each character in the story based on their description and personality. Here are the characters:\n${characters.map(char => 
      `Name: ${char.name}, Description: ${char.description}, Personality: ${char.personality}`
    ).join("\n")}`;

    // Append the summary prompt and get the response as a string
    const response = await append({
      role: "system" as const,
      content: summaryPrompt,
    });

    // Set the character summary only if the response is not empty
    setCharacterSummary(response || null);
    setIsSummaryLoading(false);
  };

  const startEditing = (id: number) => {
    setEditingCharacterId(id);
  };

  const saveEdit = (id: number, updatedCharacter: Character) => {
    setCharacters(characters.map(char => char.id === id ? updatedCharacter : char));
    setEditingCharacterId(null);
  };

  const deleteCharacter = (id: number) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-black pt-8">
      <div className="p-6 overflow-scroll px-0 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Generate a Story with your Characters</h1>
        <div className="mb-4 flex flex-wrap justify-center">
          <input
            type="text"
            placeholder="Name"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
            className="border p-2 mr-2 mb-2 w-full sm:w-auto text-black"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCharacter.description}
            onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
            className="border p-2 mr-2 mb-2 w-full sm:w-auto text-black"
          />
          <input
            type="text"
            placeholder="Personality"
            value={newCharacter.personality}
            onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
            className="border p-2 mr-2 mb-2 w-full sm:w-auto text-black"
          />
          <button
            onClick={addCharacter}
            className="bg-blue-500 text-white p-2 border rounded w-full sm:w-auto mb-2 hover:bg-blue-600"
          >
            Add Character
          </button>
        </div>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center text-white">
                <p className="block antialiased font-sans text-lg font-normal leading-none opacity-70">Name</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center text-white">
                <p className="block antialiased font-sans text-lg font-normal leading-none opacity-70">Description</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center text-white">
                <p className="block antialiased font-sans text-lg font-normal leading-none opacity-70">Personality</p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-center text-white">
                <p className="block antialiased font-sans text-lg font-normal leading-none opacity-70">Actions</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => (
              <tr key={char.id} className="hover:bg-gray-500">
                <td className="p-4 border-b border-blue-gray-50 text-center text-white">
                  {editingCharacterId === char.id ? (
                    <input
                      type="text"
                      value={char.name}
                      onChange={(e) => setCharacters(characters.map(c => c.id === char.id ? { ...c, name: e.target.value } : c))}
                      className="border p-1 w-full text-black"
                    />
                  ) : (
                    char.name
                  )}
                </td>
                <td className="p-4 border-b border-blue-gray-50 text-center text-white">
                  {editingCharacterId === char.id ? (
                    <input
                      type="text"
                      value={char.description}
                      onChange={(e) => setCharacters(characters.map(c => c.id === char.id ? { ...c, description: e.target.value } : c))}
                      className="border p-1 w-full text-black"
                    />
                  ) : (
                    char.description
                  )}
                </td>
                <td className="p-4 border-b border-blue-gray-50 text-center text-white">
                  {editingCharacterId === char.id ? (
                    <input
                      type="text"
                      value={char.personality}
                      onChange={(e) => setCharacters(characters.map(c => c.id === char.id ? { ...c, personality: e.target.value } : c))}
                      className="border p-1 w-full text-black"
                    />
                  ) : (
                    char.personality
                  )}
                </td>
                <td className="p-4 border-b border-blue-gray-50 text-center text-white">
                  {editingCharacterId === char.id ? (
                    <button
                      onClick={() => saveEdit(char.id, char)}
                      className="bg-green-500 text-white p-1 rounded mr-2 hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(char.id)}
                      className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteCharacter(char.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={generateStory}
            className="bg-purple-500 text-white p-2 border rounded w-full sm:w-auto hover:bg-purple-600"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Story'}
          </button>
          {storyGenerated && (
            <button
              onClick={generateCharacterSummary}
              className="bg-green-500 text-white p-2 border rounded w-full sm:w-auto hover:bg-green-600"
              disabled={isSummaryLoading}
            >
              {isSummaryLoading ? 'Generating...' : 'Generate Character Summary'}
            </button>
          )}
        </div>

        <div className="mt-4">
          {messages
            .filter(msg => msg.role !== "system") // Filter out the system message
            .map((msg, index) => (
              <div key={index} className="text-white">
                <br></br>
                <p>{msg.content}</p>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Display the character summary if it exists */}
        {characterSummary && (
          <div className="mt-4 text-white">
            <h2 className="text-xl font-bold mb-2">Character Summary</h2>
            <p>{characterSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}