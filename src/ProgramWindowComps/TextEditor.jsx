import { useState } from 'react';

const TextEditor = ({ initialText = '', onSave }) => {
    const [text, setText] = useState(initialText);
    
    return (
      <div className="flex flex-col h-full">
        <textarea
          className="flex-1 w-full bg-white text-black p-2 font-mono resize-none outline-none border border-gray-700"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div className="mt-2 flex justify-end">
          <button
            className="bg-white hover:bg-blue-600 text-black px-3 py-1 border border-black"
            onClick={() => onSave(text)}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  export default TextEditor;