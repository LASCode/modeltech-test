import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { index } from './store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={index}>
        <App />
    </Provider>
);

reportWebVitals();
