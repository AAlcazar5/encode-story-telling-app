import React from 'react';
import { CharacterFormProps } from '../interface/types';

const CharacterForm: React.FC<CharacterFormProps> = ({ newCharacter, setNewCharacter, addCharacter }) => (
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
);

export default CharacterForm; 