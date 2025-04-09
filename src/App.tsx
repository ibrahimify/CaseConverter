import React, { useState, useEffect } from 'react';
import { Wand2, Copy, RotateCcw, Sparkles, Download, Github, Linkedin, Globe, Bug } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState('');
  const [stats, setStats] = useState({
    chars: 0,
    words: 0,
    sentences: 0,
    lines: 0
  });

  useEffect(() => {
    setStats({
      chars: input.length,
      words: input.trim() === '' ? 0 : input.trim().split(/\s+/).length,
      sentences: input.trim() === '' ? 0 : input.split(/[.!?]+\s/).filter(Boolean).length,
      lines: input.trim() === '' ? 0 : input.split('\n').filter(Boolean).length
    });
  }, [input]);

  const morseToText: { [key: string]: string } = {
    '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f',
    '--.': 'g', '....': 'h', '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l',
    '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r',
    '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
    '-.--': 'y', '--..': 'z', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
    '----.': '9', '-----': '0', '/': ' '
  };

  const textToMorse: { [key: string]: string } = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
    'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
    'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
    's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
    'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const convertCase = (type: string) => {
    setActiveCase(type);
    switch (type) {
      case 'upper':
        setOutput(input.toUpperCase());
        break;
      case 'lower':
        setOutput(input.toLowerCase());
        break;
      case 'title':
        setOutput(
          input
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );
        break;
      case 'sentence':
        setOutput(
          input.toLowerCase().replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase())
        );
        break;
      case 'camel':
        setOutput(
          input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        );
        break;
      case 'snake':
        setOutput(
          input
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '')
        );
        break;
      case 'kebab':
        setOutput(
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
        );
        break;
      case 'alternating':
        setOutput(
          input
            .split('')
            .map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
            .join('')
        );
        break;
      case 'inverse':
        setOutput(
          input
            .split('')
            .map(char => 
              char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
            )
            .join('')
        );
        break;
      case 'leetspeak':
        setOutput(
          input
            .toLowerCase()
            .replace(/a/g, '4')
            .replace(/e/g, '3')
            .replace(/i/g, '1')
            .replace(/o/g, '0')
            .replace(/s/g, '5')
            .replace(/t/g, '7')
            .replace(/l/g, '1')
        );
        break;
      case 'vaporwave':
        setOutput(
          input
            .split('')
            .join(' ')
            .toUpperCase()
        );
        break;
      case 'morse':
        setOutput(
          input
            .toLowerCase()
            .split('')
            .map(char => textToMorse[char] || char)
            .join(' ')
        );
        break;
      case 'morse-decode':
        setOutput(
          input
            .split(' ')
            .map(code => morseToText[code] || code)
            .join('')
        );
        break;
      default:
        setOutput(input);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setInput('');
    setOutput('');
    setActiveCase('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow w-full">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Wand2 className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Case Converter</h1>
        </div>

        {/* Compact Introduction */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-4 text-gray-300">
  <h3 className="text-base font-semibold mb-2 leading-tight">
    Accidentally left the caps lock on and typed something, but can't be bothered to start again and retype it all?
  </h3>
  <p className="text-sm leading-relaxed">
    Simply enter your text and choose the case you want to convert it to.
  </p>
</div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Input Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Input Text</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-40 p-4 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-gray-100 placeholder-gray-500"
            />
          </div>

          {/* Output Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-400">Output Text</h2>
              <div className="flex gap-2">
                <button
                  onClick={downloadText}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-purple-400"
                  title="Download text"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-purple-400"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={reset}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-purple-400"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full h-40 p-4 rounded-lg bg-gray-900/50 border border-gray-700 resize-none text-gray-100"
            />
          </div>
        </div>

        {/* Text Statistics */}
        <div className="mt-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-400">Characters</div>
              <div className="text-xl font-bold text-purple-400">{stats.chars}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Words</div>
              <div className="text-xl font-bold text-purple-400">{stats.words}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Sentences</div>
              <div className="text-xl font-bold text-purple-400">{stats.sentences}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Lines</div>
              <div className="text-xl font-bold text-purple-400">{stats.lines}</div>
            </div>
          </div>
        </div>

        {/* Conversion Options */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: 'UPPERCASE', type: 'upper' },
            { name: 'lowercase', type: 'lower' },
            { name: 'Title Case', type: 'title' },
            { name: 'Sentence case', type: 'sentence' },
            { name: 'camelCase', type: 'camel' },
            { name: 'snake_case', type: 'snake' },
            { name: 'kebab-case', type: 'kebab' },
            { name: 'aLtErNaTiNg', type: 'alternating' },
            { name: 'InVeRsE', type: 'inverse' },
            { name: 'L33T 5P34K', type: 'leetspeak' },
            { name: 'V A P O R W A V E', type: 'vaporwave' },
            { name: 'Text → Morse', type: 'morse' },
            { name: 'Morse → Text', type: 'morse-decode' }
          ].map((caseType) => (
            <button
              key={caseType.type}
              onClick={() => convertCase(caseType.type)}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg backdrop-blur-sm transition-all ${
                activeCase === caseType.type
                  ? 'bg-purple-500/30 border border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 hover:bg-gray-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">{caseType.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 max-w-4xl mx-auto w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/ibrahimify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/ibrahmify"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://ibrahimify.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm">Website</span>
              </a>
            </div>
            <a
              href="mailto:muhammadibrahimshoeb@gmail.com?subject=Bug%20Report%20-%20Case%20Converter"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors text-purple-400 hover:text-purple-300"
            >
              <Bug className="w-5 h-5" />
              <span className="text-sm">Report Bug</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;