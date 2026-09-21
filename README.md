# Promptly AI

A clean, responsive AI prompt website built with HTML, CSS, JavaScript, Node.js, Express, and the OpenAI API.

## Features

- Prompt input with a 2,000-character limit and live counter
- Empty-prompt validation in Bengali
- Loading state while the AI generates a response
- AI response display and copy button
- Responsive modern UI
- API key stays safely on the Node.js server

## Run locally

1. Install packages: `npm install`
2. Copy `.env.example` to `.env`
3. Put a valid OpenAI key in `OPENAI_API_KEY`
4. Start: `npm start`
5. Open `http://localhost:3000`

## Environment variables

`OPENAI_API_KEY` is required. `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`.
