## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Information

Run Test: npm run test

Get coverage: npm run test:coverage

- Report can be found under /coverage/lcov-report/index.html

Run Cypress: npm run test:cypress

To build on local: npm run build

## App Information

Main Page (./)

- Lists the most popular articles from API of NY
- Clicking on any article opens a detail webpage route ./article/[id]

Details Page (./article/[id])

- The detail page shows the artilcle and once clicked on Read full article opens on side with iframe using NY link
- There is a option to open a full article in a new tab
