import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Webroute from './routes/webroute.jsx'
import { Provider } from "react-redux";
import { persistor, store } from './app/store.js'
import { checkAuthenticate } from './app/providers/authSlice.js'
import { PersistGate } from 'redux-persist/integration/react'

// Vérifier le token dès le démarrage
store.dispatch(checkAuthenticate());

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Webroute />
        </PersistGate>
    </Provider>
);
