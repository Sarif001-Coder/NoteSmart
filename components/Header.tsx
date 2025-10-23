
import React from 'react';

type Role = 'admin' | 'user';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
  const activeClass = 'bg-sky-500 text-white';
  const inactiveClass = 'bg-slate-700 text-slate-300 hover:bg-slate-600';

  return (
    <header className="bg-slate-800 p-4 shadow-lg flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.96 8.35A2.75 2.75 0 0 0 18.25 6h-2.5a.75.75 0 0 0 0 1.5h2.5a1.25 1.25 0 0 1 1.24 1.06c.2.82-.47 1.6-1.32 1.64h-1.18a.75.75 0 0 0 0 1.5h1.18c1.65.04 3.05-1.2 2.8-2.85ZM5.75 6h2.5a.75.75 0 0 0 0-1.5h-2.5A2.75 2.75 0 0 0 3.04 7.15c-.25 1.65 1.15 2.89 2.8 2.85h1.18a.75.75 0 0 0 0-1.5H5.84c-.85-.04-1.52-.82-1.32-1.64A1.25 1.25 0 0 1 5.75 6ZM12 4a.75.75 0 0 0-.75.75v14.5a.75.75 0 0 0 1.5 0V4.75A.75.75 0 0 0 12 4Z" />
            <path fillRule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15ZM5.25 19.5h13.5V5.25H5.25v14.25Z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl font-bold text-white tracking-wide">Smart Notes AI</h1>
      </div>
      <div className="flex rounded-lg p-1 bg-slate-900">
        <button
          onClick={() => setRole('admin')}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${role === 'admin' ? activeClass : inactiveClass}`}
        >
          Admin
        </button>
        <button
          onClick={() => setRole('user')}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${role === 'user' ? activeClass : inactiveClass}`}
        >
          User
        </button>
      </div>
    </header>
  );
};
