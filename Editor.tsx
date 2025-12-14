import React, { useState, useEffect } from 'react';
import TronCard from './ui/TronCard';
import { Save, Cloud, Check, Trash2 } from 'lucide-react';
import { uploadToDrive } from '../services/driveService';
import { Note } from '../types';

const Editor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SAVING' | 'SYNCING' | 'DONE'>('IDLE');

  // Load from local storage on mount
  useEffect(() => {
    const savedNote = localStorage.getItem('inytx_current_note');
    if (savedNote) {
      const parsed: Note = JSON.parse(savedNote);
      setTitle(parsed.title);
      setContent(parsed.content);
    }
  }, []);

  // Auto-save to LocalStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
        if (title || content) {
            const noteData: Note = {
                id: 'current',
                title,
                content,
                lastModified: Date.now(),
                synced: false
            };
            localStorage.setItem('inytx_current_note', JSON.stringify(noteData));
            if (status === 'IDLE') setStatus('SAVING');
            setTimeout(() => setStatus('IDLE'), 500);
        }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [title, content]);

  const handleSyncToDrive = async () => {
    if (!title) {
        alert("Please enter a title before syncing.");
        return;
    }
    setStatus('SYNCING');
    await uploadToDrive(title, content);
    setStatus('DONE');
    setTimeout(() => setStatus('IDLE'), 2000);
  };

  const handleClear = () => {
      if(confirm('Clear current buffer? This cannot be undone.')) {
          setTitle('');
          setContent('');
          localStorage.removeItem('inytx_current_note');
      }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 h-[calc(100vh-100px)] flex flex-col gap-6 animate-fadeIn">
      
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-tron-900/80 border-y border-tron-700 p-4 backdrop-blur-md">
        <div className="flex items-center gap-4 w-full">
            <span className="text-tron-accent font-mono">{'>'}</span>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="FILENAME.TXT"
                className="bg-transparent border-none focus:ring-0 text-white font-display text-xl tracking-wider w-full placeholder-tron-800"
            />
        </div>
        
        <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-tron-500 uppercase min-w-[100px] text-right">
                {status === 'IDLE' && 'READY'}
                {status === 'SAVING' && 'LOCAL_SAVE...'}
                {status === 'SYNCING' && 'UPLOADING...'}
                {status === 'DONE' && <span className="text-green-400">SYNC_COMPLETE</span>}
            </span>

            <button 
                onClick={handleSyncToDrive}
                disabled={status === 'SYNCING'}
                className="flex items-center gap-2 px-4 py-2 bg-tron-800 hover:bg-tron-600 text-white font-mono text-xs uppercase border border-tron-500 transition-colors disabled:opacity-50"
            >
                <Cloud size={16} />
                <span>SAVE_TO_DRIVE</span>
            </button>
             <button 
                onClick={handleClear}
                className="p-2 hover:text-red-500 text-tron-600 transition-colors"
                title="Clear Buffer"
            >
                <Trash2 size={16} />
            </button>
        </div>
      </div>

      {/* Editor Area */}
      <TronCard className="flex-grow flex flex-col p-0 overflow-hidden bg-black/60" tag="EDIT_MODE">
        <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-transparent border-none resize-none p-6 text-tron-100 font-mono text-lg leading-relaxed focus:ring-0 focus:outline-none scrollbar-thin scrollbar-thumb-tron-600 scrollbar-track-transparent"
            placeholder="INITIATE TEXT SEQUENCE..."
            spellCheck={false}
        />
      </TronCard>
      
      <div className="flex justify-between text-tron-600 font-mono text-xs">
          <span>CHARS: {content.length}</span>
          <span>WORDS: {content.split(/\s+/).filter(w => w.length > 0).length}</span>
      </div>
    </div>
  );
};

export default Editor;