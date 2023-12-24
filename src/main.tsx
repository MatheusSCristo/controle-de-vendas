import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import VendasProvider from './context/vendasContext.tsx';
import ClientesProvider from './context/clienteContext.tsx';
import ProdutoProvider from './context/produtosContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <VendasProvider>
        <ClientesProvider>
          <ProdutoProvider>
            <App />
          </ProdutoProvider>
        </ClientesProvider>
      </VendasProvider>
    </Router>
  </React.StrictMode>,
)
