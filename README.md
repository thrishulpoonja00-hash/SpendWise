# SpendWise
Personal expense tracker built with Next.js (App Router), JavaScript, HTML and CSS. No backend: data lives in `localStorage`, seeded with dummy data from `lib/data.js`.

## Run
```
npm install
npm run dev   # http://localhost:3000
```
## Features
Add / edit / delete expenses, category filter + search, monthly budget with progress bar, spending-by-category breakdown, persistence across reloads.

## Team split (suggested commits)
- Member A: `lib/`, `app/page.js` state + persistence, `Summary.js`
- Member B: `ExpenseForm.js`, `ExpenseList.js`, `globals.css`, README