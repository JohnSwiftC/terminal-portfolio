import ProgramWindow from "./ProgramWindow";

import High5Page from "./ProgramWindowComps/High5Page";
import FileViewer from "./ProgramWindowComps/FileViewer";
import TextEditor from "./ProgramWindowComps/TextEditor";
import AboutMe from "./ProgramWindowComps/AboutMe";

import { useState, useEffect, useRef } from 'react';
  
  const Terminal = () => {

    const componentDidMount = () => {
      this.focus();
    }

    const [history, setHistory] = useState([
      { text: 'John Swift, Cybersecurity Developer', type: 'system' },
      { text: 'Type "help" for available commands', type: 'system' },
    ]);
    const [input, setInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef(null);
    const outputRef = useRef(null);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Maps passwords to a set of hidden files. These hidden files are added to the fake filesystem when the password is entered, and the key is then deleted.
    const [passwords, setPasswords] = useState({
      'ILoveCats240': {
        'high5.html': <High5Page />,
        'aboutme.html': <AboutMe />
      },
    });
    
    // Virtual filesystem
    const [files, setFiles] = useState({
      'secrets.env': '"Having a good day guys! Hope I don\'t push the secrets to the public repo and then quickly try to delete it!" -Someone at high5.id, probably.\nSecure password: ILoveCats240',
      'todo.txt': '1. Learn React\n2. Build cool projects\n3. Share with others',
    });
    
    // Program window state
    const [programWindow, setProgramWindow] = useState({
      isOpen: false,
      title: '',
      content: null,
      width: 600,
      height: 400,
    });
  
    // Close the program window
    const closeWindow = () => {
      setProgramWindow(prev => ({ ...prev, isOpen: false }));
      // Refocus the terminal input
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus();
        }, 0);
      }
    };

    const writeError = (text) => {
      setHistory(prev => [
        ...prev,
        { text: text, type: "error" }
      ]);

      return []
    }

    const writeSystem = (text) => {
      setHistory(prev => [
        ...prev,
        { text: text, type: "system" }
      ]);

      return []
    }
  
    // Available commands
    const commands = {
      help: () => {
        return [
          'Available commands:',
          '  help - Show this help message',
          '  clear - Clear the terminal',
          '  echo [text] - Print text',
          '  date - Show current date',
          '  whoami - Show current user',
          '  ls - List files',
          '  cat [filename] - View file content',
          '  edit [filename] - Edit file content',
          '  touch [filename] - Create new empty file',
          '  rm [filename] - Delete file',
          '  login [password] - Reveal hidden files protected by this password',
          '  browse [filename] - Browse HTML files to learn more!'
        ];
      },
      clear: () => {
        setHistory([]);
        return [];
      },
      echo: (args) => {
        return [args.join(' ')];
      },
      date: () => {
        return [new Date().toString()];
      },
      whoami: () => {
        return ['Hi! I\'m John Swift! I love cybersecurity, programming, and cats! I unfortunately can\'t tell you all my secrets, you\'ll just have to find them!'];
      },
      ls: () => {
        return Object.keys(files);
      },
      cat: (args) => {
        const filename = args[0];

        if (!filename) return writeError('Error: No filename specified')
        if (!files[filename]) return writeError(`Error: File '${filename}' not found`)
        if (filename.endsWith("html")) return writeError('Error: Open HTML with the browse command!');
        
        // Open a window with the file content
        setProgramWindow({
          isOpen: true,
          title: `View: ${filename}`,
          content: <FileViewer content={files[filename]} />,
          width: 600,
          height: 400,
        });
        
        return [`Opening ${filename} in viewer...`];
      },
      edit: (args) => {
        const filename = args[0];
        if (!filename) return writeError("Error: No filename specified");
        if (filename.endsWith("html")) return writeError("Error: Open HTML with the browse command");
        
        const fileContent = files[filename] || '';
        
        // Save handler for the editor
        const handleSave = (newContent) => {
          setFiles(prev => ({
            ...prev,
            [filename]: newContent
          }));
          closeWindow();
          setHistory(prev => [...prev, { text: `File '${filename}' saved`, type: 'system' }]);
        };
        
        // Open the editor window
        setProgramWindow({
          isOpen: true,
          title: `Edit: ${filename}`,
          content: <TextEditor initialText={fileContent} onSave={handleSave} />,
          width: 600,
          height: 400,
        });
        
        return [`Opening ${filename} in editor...`];
      },
      touch: (args) => {
        const filename = args[0];
        if (!filename) return writeError('Error: No filename specified');
        if (files[filename]) return writeError(`File '${filename}' already exists`);
        
        setFiles(prev => ({
          ...prev,
          [filename]: ''
        }));
        
        return [`Created file '${filename}'`];
      },
      rm: (args) => {
        const filename = args[0];
        if (!filename) return writeError('Error: No filename specified');
        if (!files[filename]) return writeError(`Error: File '${filename}' not found`);
        
        setFiles(prev => {
          const newFiles = { ...prev };
          delete newFiles[filename];
          return newFiles;
        });
        
        return [`Deleted file '${filename}'`];
      },
      login: (args) => {
        const new_files = passwords[args[0]];
        if(!new_files) return writeError("Error: Password is incorrect or has already been used");

        setFiles(prev => ({
          ...prev,
          ...passwords[args[0]]
        }));

        setPasswords(prev => {
          const newPasswords = { ...prev };
          delete newPasswords[args[0]];
          return newPasswords;
        });

        return writeSystem(`Logged in with password ${args[0]}`);
      },
      browse: (args) => {
        const file = args[0];
        if (!file) return writeError(`Error: No filename specified`);
        if (!files[file]) return writeError(`Error: File '${file}' not found`);
        if (!file.endsWith("html")) return writeError("Error: The browse command can only be used for HTML files")

        setProgramWindow({
          isOpen: true,
          title: `Browse: ${file}`,
          content: files[file],
          width: 1000,
          height: 800,
        });

        return [`Browsing '${file}'`]
      }
    };
  
    // Focus the input element when the terminal is clicked
    const focusInput = () => {
      if (inputRef.current && !programWindow.isOpen) {
        inputRef.current.focus();
      }
    };
  
    // Scroll to bottom whenever history changes
    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, [history]);
  
    // Process command
    const processCommand = (cmd) => {
      const trimmedCmd = cmd.trim();
      if (!trimmedCmd) return;
      
      // Add command to history
      setCommandHistory(prev => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
      
      // Parse command and arguments
      const args = trimmedCmd.split(' ');
      const command = args[0].toLowerCase();
      const commandArgs = args.slice(1);
      
      // Add to terminal history
      setHistory(prev => [...prev, { text: `$ ${trimmedCmd}`, type: 'command' }]);
      
      // Execute command
      if (commands[command]) {
        const output = commands[command](commandArgs);
        if (output && output.length > 0) {
          setHistory(prev => [
            ...prev,
            ...output.map(text => ({ text, type: 'output' }))
          ]);
        }
      } else {
        setHistory(prev => [
          ...prev,
          { text: `Command not found: ${command}`, type: 'error' }
        ]);
      }
    };
  
    // Handle key press
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        processCommand(input);
        setInput('');
        setCursorPosition(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          const command = commandHistory[commandHistory.length - 1 - newIndex];
          if (command) {
            setInput(command);
            setCursorPosition(command.length);
          }
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          const command = commandHistory[commandHistory.length - 1 - newIndex];
          setInput(command);
          setCursorPosition(command.length);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
          setCursorPosition(0);
        }
      } else if (e.key === 'ArrowLeft') {
        if (cursorPosition > 0) {
          setCursorPosition(cursorPosition - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (cursorPosition < input.length) {
          setCursorPosition(cursorPosition + 1);
        }
      } else if (e.key === 'Home') {
        setCursorPosition(0);
      } else if (e.key === 'End') {
        setCursorPosition(input.length);
      }
    };
  
    // Handle input change
    const handleChange = (e) => {
      setInput(e.target.value);
      setCursorPosition(e.target.selectionStart || 0);
    };
  
    // Handle input click to update cursor position
    const handleClick = (e) => {
      setCursorPosition(e.target.selectionStart || 0);
    };
  
    return (
      <>
        <div 
          className="flex flex-col w-full h-screen bg-black text-green-400 font-mono p-2 border-0"
          onClick={focusInput}
          ref={terminalRef}
        >
          <div 
            className="flex-1 overflow-y-auto" 
            ref={outputRef}
          >
            {history.map((item, i) => {
              let textColor = 'text-green-400';
              if (item.type === 'error') textColor = 'text-red-500';
              if (item.type === 'system') textColor = 'text-blue-400';
              
              return (
                <div key={i} className={`whitespace-pre-wrap break-all ${textColor}`}>
                  {item.text}
                </div>
              );
            })}
            <div ref={bottomRef} style={{ float: 'left', clear: 'both' }}></div>
          </div>
          
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">$</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                className="w-full bg-transparent text-green-400 outline-none caret-transparent"
                autoFocus
                disabled={programWindow.isOpen}
              />
              <div className="absolute top-0 left-0 right-0 pointer-events-none">
                <span className="invisible">{input.substring(0, cursorPosition)}</span>
                <span className={`animate-pulse bg-green-400 w-2 h-5 inline-block opacity-100 ${programWindow.isOpen ? 'invisible' : ''}`}></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Program Window */}
        <ProgramWindow
          isOpen={programWindow.isOpen}
          title={programWindow.title}
          content={programWindow.content}
          onClose={closeWindow}
          width={programWindow.width}
          height={programWindow.height}
        />
      </>
    );
  };
  
  export default Terminal;