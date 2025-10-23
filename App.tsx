import React, { useState, useEffect, useCallback } from 'react';
import { AdminView } from './components/AdminView';
import { UserView } from './components/UserView';
import { Header } from './components/Header';
import { Book } from './types';
import { getBooks } from './services/geminiService';

function App() {
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchBooks = useCallback(async () => {
    try {
      // Don't set loading to true here to avoid flicker on re-fetch
      setError('');
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header role={role} setRole={setRole} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLoading ? (
            <div className="text-center p-8 text-slate-400">
                <p>Loading books from server...</p>
            </div>
        ) : error ? (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg m-4" role="alert">
                <strong className="font-bold">Connection Error: </strong>
                <span className="block sm:inline">{error}</span>
                <p className="text-sm mt-2">Please ensure your Flask backend server is running and accessible.</p>
            </div>
        ) : role === 'admin' ? (
          <AdminView books={books} onBooksUpdate={fetchBooks} />
        ) : (
          <UserView books={books} />
        )}
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        <p>Powered by AI. For educational purposes only.</p>
      </footer>
    </div>
  );
}

export default App;
