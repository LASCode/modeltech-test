import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import 'styles/global.scss';
import { worker } from "./mock";
import './styles/breakpoints.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
void worker.start()


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
