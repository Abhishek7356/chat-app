import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Auth from './Auth';
import ChatContext from './ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <ChatContext>
          <App />
        </ChatContext>
      </Auth>
    </BrowserRouter>
  </React.StrictMode>
);
