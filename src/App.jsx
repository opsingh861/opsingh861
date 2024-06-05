import  { useEffect, useRef, useState } from 'react';
import './App.css';
import name from './name.txt';
import GifComponent from './components/GifComponent';
import { social } from './utils/commands';

const commandResponses = [
  { command: 'whoami', response: 'Aditya Dhanraj' },
  { command: 'ls', response: 'projects  skills  contact' },
  { command: 'cat about.txt', response: 'I am a web developer with a passion for creating interactive and dynamic user experiences.' },
  { command: 'cat projects.txt', response: '1. Project One - A web app for managing tasks\n2. Project Two - A portfolio website\n3. Project Three - An e-commerce platform' },
  { command: 'cat skills.txt', response: 'JavaScript, React, Node.js, Express, MongoDB, HTML, CSS' },
  { command: 'cat contact.txt', response: 'Email: opsingh861@gmail.com\nLinkedIn: linkedin.com/in/yourname\nGitHub: github.com/opsingh861' },
  { command: 'help', response: 'Available commands: whoami, ls, cat about.txt, cat projects.txt, cat skills.txt, cat contact.txt, help' }
];

function App() {
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [asciiArt, setAsciiArt] = useState(null);

  useEffect(() => {
    fetch(name)
      .then(response => response.text())
      .then(data => {
        setAsciiArt(data);
      })
      .catch(error => console.error('Error fetching ASCII art:', error));
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp') {
      setInput(commands[commands.length - 1]?.command || '');
    }

    if (e.key === 'ArrowDown') {
      setInput('');
    }

    if (e.key === 'Enter') {
      if (input === 'clear') {
        setCommands([]);
        setInput('');
        setAsciiArt(null);
        return;
      }

      if (input === '') {
        setCommands([...commands, { command: input, response: '' }]);
        return;
      }

      if (input === 'social') {
        setCommands([...commands, { command: input, response: social }]);
        setInput('');
        return;
      }

      const commandObj = commandResponses.find(cmd => cmd.command === input);
      const response = commandObj ? commandObj.response : 'command not found';

      setCommands([...commands, { command: input, response }]);
      setInput('');
    }
  };

  return (
    <div className="App" onClick={() => inputRef.current.focus()}>
      <div className="terminal">
        {asciiArt && (
          <>
            <GifComponent />
            <pre className='pre_ani'>
              {asciiArt}
            </pre>
          </>
        )}
        <br />
        {commands.map((cmd, index) => (
          <div style={{ textShadow: "0 0 5px #73ABAD" }} key={index}>
            <p>GitHub@opsingh861:~$ {cmd.command}</p>
            {cmd.response && (
              Array.isArray(cmd.response) ? (
                cmd.response.map((line, i) => (
                  <p className='p_ani' key={i} dangerouslySetInnerHTML={{ __html: line }}></p>
                ))
              ) : (
                <p className='p_ani'>{cmd.response}</p>
              )
            )}
          </div>
        ))}
        <p className='p_ani'>GitHub@opsingh861:~$ <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        /></p>
      </div>
    </div>
  );
}

export default App;
