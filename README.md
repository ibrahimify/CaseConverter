# Case Converter

A modern and minimal web application to convert your text into various **case formats** like Uppercase, Lowercase, Capitalized Case, Snake Case, and more.


## Features

- Convert text to multiple cases: UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more
- Special conversions: Morse code (encode/decode), leetspeak, vaporwave
- Real-time text statistics: characters, words, sentences, lines
- Copy to clipboard and download as text file
- Responsive design with dark mode
- Reset functionality to clear inputs

## Tech Stack

- **React**: Frontend library for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for clean, modern icons
- **GitHub Pages**: Hosting for live deployment

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ibrahimify/CaseConverter.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CaseConverter
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run locally:
   ```bash
   npm run dev
   ```

## Deployment

The app is deployed on GitHub Pages. To deploy your own version:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update package.json with your homepage and deploy scripts (see instructions below).

3. Deploy:
   ```bash
   npm run deploy
   ```

## Usage

* Enter text in the input textarea
* Click a conversion button to transform the text
* Use the copy or download buttons to save the output
* Reset with the reset button to start over

## Live Demo

Check out the live demo: https://ibrahimify.github.io/CaseConverter

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit changes (git commit -m "Add feature")
4. Push to the branch (git push origin feature-name)
5. Open a pull request
