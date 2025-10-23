import React, { useState, useRef } from 'react';
import { Book, Subject } from '../types';
import { SUBJECTS } from '../constants';
import { uploadBook } from '../services/geminiService';

interface AdminViewProps {
  books: Book[];
  onBooksUpdate: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ books, onBooksUpdate }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(SUBJECTS[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bookName, setBookName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setError('Error: Only PDF files are allowed.');
        setSelectedFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file.');
      return;
    }
    if (!bookName.trim()) {
      setError('Please enter a book name.');
      return;
    }
    
    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      await uploadBook(selectedFile, selectedSubject, bookName);
      setSuccess(`Successfully uploaded "${bookName}". The book list will refresh.`);
      onBooksUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during upload.');
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setBookName('');
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-8 grid md:grid-cols-2 gap-8">
      {/* Upload Section */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-sky-400">Upload Book</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as Subject)}
              className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-sky-500 focus:border-sky-500"
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="book-name" className="block text-sm font-medium text-slate-300 mb-1">Book Name</label>
            <input
              id="book-name"
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="e.g., 'Introduction to Algorithms'"
              className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-500"
            />
          </div>
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-1">PDF File</label>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !bookName.trim() || isUploading}
            className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
        </div>
      </div>

      {/* Book List Section */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-sky-400">Uploaded Books</h2>
        {books.length === 0 ? (
          <p className="text-slate-400">No books uploaded yet.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {SUBJECTS.map(subject => {
              const subjectBooks = books.filter(b => b.subject === subject);
              if (subjectBooks.length === 0) return null;
              return (
                <div key={subject}>
                  <h3 className="font-semibold text-lg text-slate-300 border-b border-slate-700 pb-1 mb-2">{subject}</h3>
                  <ul className="space-y-2">
                    {subjectBooks.map(book => (
                      <li key={book.name} className="flex items-center bg-slate-700 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 2H8.828a2 2 0 00-1.414.586L6.293 3.707A1 1 0 015.586 4H4zm10 6a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-200 text-sm">{book.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};