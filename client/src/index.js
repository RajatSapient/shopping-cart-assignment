import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './contexts/StateProvider';
import reducer, { initialState } from './contexts/Reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
);

