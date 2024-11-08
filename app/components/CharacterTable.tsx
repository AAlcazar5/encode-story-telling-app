import React from 'react';
import { CharacterTableProps } from '../interface/types';

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  editingCharacterId,
  setCharacters,
  startEditing,
  saveEdit,
  deleteCharacter,
}) => (
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
);

export default CharacterTable; 