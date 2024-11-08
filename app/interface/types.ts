export interface Character {
    id: number;
    name: string;
    description: string;
    personality: string;
  }

export interface CharacterFormProps {
    newCharacter: Character;
    setNewCharacter: React.Dispatch<React.SetStateAction<Character>>;
    addCharacter: () => void;
  }


export interface CharacterTableProps {
    characters: Character[];
    editingCharacterId: number | null;
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    startEditing: (id: number) => void;
    saveEdit: (id: number, updatedCharacter: Character) => void;
    deleteCharacter: (id: number) => void;
  }


export interface ChatMessagesProps {
    messages: { role: string; content: string }[];
}
  

export interface StoryControlsProps {
    generateStory: () => void;
    generateCharacterSummary: () => void;
    isLoading: boolean;
    storyGenerated: boolean;
    isSummaryLoading: boolean;
  }