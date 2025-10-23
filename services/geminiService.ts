import { Book, Notes, Subject } from '../types';

// This service now communicates with the Flask backend.
// The backend is expected to handle PDF processing and AI generation.
const API_BASE_URL = '/api';

/**
 * Fetches the list of all uploaded books from the backend.
 * NOTE: The provided Flask backend is missing this endpoint.
 */
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Failed to fetch books. Ensure the GET /api/books endpoint exists on your server.' }));
    throw new Error(err.error);
  }
  return await response.json();
}

/**
 * Uploads a new book file to the backend.
 * @param file The PDF file to upload.
 * @param subject The subject for the book.
 * @param bookName The name of the book.
 */
export async function uploadBook(file: File, subject: Subject, bookName: string): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subject', subject);
  formData.append('book_name', bookName);

  const response = await fetch(`/admin/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to upload book.' }));
    throw new Error(errorData.error);
  }
}

/**
 * Requests the backend to generate notes for a given topic.
 * The backend should return data matching the Notes interface: 
 * { aiNotes: string[], readyReckoner: string[] }
 * NOTE: The provided Flask backend is missing this endpoint.
 * @param topic The topic to generate notes for.
 * @returns The generated notes.
 */
export async function generateNotes(topic: string): Promise<Notes | null> {
   if (!topic.trim()) {
    throw new Error("Topic cannot be empty.");
  }

  const response = await fetch(`${API_BASE_URL}/generate-notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to generate notes. Ensure the POST /api/generate-notes endpoint exists on your server.' }));
    throw new Error(errorData.error);
  }

  return await response.json();
}