"use client";

import React, { useState } from 'react';
import { useChat } from "ai/react";
import CharacterForm from './components/CharacterForm';
import CharacterTable from './components/CharacterTable';
import ChatMessages from './components/ChatMessages';
import StoryControls from './components/StoryControls';
import { Character } from './interface/types'; // Import the Character interface

export default function Page() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCharacter, setNewCharacter] = useState<Character>({
    id: 0,
    name: '',
    description: '',
    personality: ''
  });
  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);
  const [storyGenerated, setStoryGenerated] = useState<boolean>(false);
  const [characterSummary, setCharacterSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const { messages, append, isLoading } = useChat();

  const addCharacter = () => {
    setCharacters([...characters, { ...newCharacter, id: Date.now() }]);
    setNewCharacter({ id: 0, name: '', description: '', personality: '' });
  };

  const generateStory = async () => {
    const characterDetails = characters.map(char => 
      `Name: ${char.name}, Description: ${char.description}, Personality: ${char.personality}`
    ).join("\n");

    const storyPrompt = `You are a professional storyteller. Write a single captivating and imaginative short story that includes the following characters. Ensure the story is unique and memorable, with compelling characters and unexpected plot twists. Here are the characters for your story:${characterDetails}\n.`;

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

    const response = await append({
      role: "system" as const,
      content: summaryPrompt,
    });

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
        <CharacterForm newCharacter={newCharacter} setNewCharacter={setNewCharacter} addCharacter={addCharacter} />
        <CharacterTable
          characters={characters}
          editingCharacterId={editingCharacterId}
          setCharacters={setCharacters}
          startEditing={startEditing}
          saveEdit={saveEdit}
          deleteCharacter={deleteCharacter}
        />
        <StoryControls
          generateStory={generateStory}
          generateCharacterSummary={generateCharacterSummary}
          isLoading={isLoading}
          storyGenerated={storyGenerated}
          isSummaryLoading={isSummaryLoading}
        />
        <ChatMessages messages={messages} />
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
