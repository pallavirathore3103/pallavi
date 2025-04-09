import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
      <div className="container mx-auto py-3 px-6 flex items-center justify-between">
        <p className="text-sm text-indigo-950 dark:text-slate-400">&copy; {new Date().getFullYear()} Dashboard. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm">Privacy Policy</a>
          <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
