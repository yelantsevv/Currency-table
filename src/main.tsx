import { createRoot } from 'react-dom/client';
import { Table } from './Table.tsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Table />
  </StrictMode>
);
