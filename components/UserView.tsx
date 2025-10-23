import React, { useState } from 'react';
import { Book, Notes } from '../types';
import { generateNotes } from '../services/geminiService';
import { NoteDisplay } from './NoteDisplay';

interface UserViewProps {
  books: Book[];
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
        <p className="mt-4 text-slate-300">Generating smart notes...</p>
    </div>
);

export const UserView: React.FC<UserViewProps> = ({ books }) => {
  const [topic, setTopic] = useState<string>('');
  const [notes, setNotes] = useState<Notes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
        setError("Please enter a topic to generate notes.");
        return;
    }
    setError('');
    setNotes(null);
    setIsLoading(true);
    try {
      const generated = await generateNotes(topic);
      setNotes(generated);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleGenerate();
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-sky-400">Generate Notes</h2>
        <p className="text-slate-400 mb-4 text-sm">Enter a topic to generate AI-powered notes based on the uploaded books.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'Process Synchronization' or 'Big O Notation'"
            className="flex-grow bg-slate-700 border border-slate-600 rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-500"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || books.length === 0}
            className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center"
          >
            {isLoading ? 'Generating...' : 'Generate Notes'}
          </button>
        </div>
        {books.length === 0 && <p className="text-yellow-400 text-sm mt-3">Warning: No books have been uploaded. Please switch to the Admin role to add books.</p>}
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      {isLoading && <LoadingSpinner />}
      {notes && <NoteDisplay notes={notes} topic={topic} />}
    </div>
  );
};
