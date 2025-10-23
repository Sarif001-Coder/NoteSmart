
import React from 'react';
import { Notes } from '../types';

interface NoteDisplayProps {
  notes: Notes;
  topic: string;
}

export const NoteDisplay: React.FC<NoteDisplayProps> = ({ notes, topic }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-sky-400 capitalize">Notes on: {topic}</h2>
      
      {/* AI Notes Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-3 border-b-2 border-slate-700 pb-2">AI Notes</h3>
        <ul className="space-y-2 pl-5">
          {notes.aiNotes.map((note, index) => (
            <li key={index} className="flex items-start">
                <svg className="w-4 h-4 mr-3 mt-1 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-slate-300">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ready Reckoner Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-3 border-b-2 border-slate-700 pb-2">Ready Reckoner</h3>
        <ul className="space-y-3 pl-5">
          {notes.readyReckoner.map((item, index) => (
             <li key={index} className="flex items-start">
                 <svg className="w-5 h-5 mr-3 mt-1 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <span className="text-slate-300">{item}</span>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
