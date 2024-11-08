import React from 'react';
import { StoryControlsProps } from '../interface/types';

const StoryControls: React.FC<StoryControlsProps> = ({
  generateStory,
  generateCharacterSummary,
  isLoading,
  storyGenerated,
  isSummaryLoading,
}) => (
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
);

export default StoryControls;