# Kinetic Lexicon (MVP)

React + TypeScript + Firestore vocabulary trainer with SM-2 scheduling and fast quiz transitions.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy environment file
   ```bash
   cp .env.example .env
   ```
3. Fill in Firebase web app values in `.env`.
4. Run app
   ```bash
   npm run dev
   ```

## Implemented

- SM-2 scheduler in `src/lib/srs.ts`
- Due queue loading from Firestore (`nextReviewDate <= now`)
- Fast answer flow: immediate UI advance + background Firestore write
- Quiz and Library pages
- Dictionary API helper (`src/lib/dictionary.ts`)
