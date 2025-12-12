//index.js → dit à React d’insérer <App /> dans #root
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// 🟢 Import du Provider et du store Redux
import { Provider } from 'react-redux';
import { store } from './store/store';  // <-- Vérifie bien le chemin !// Ton store Redux (à créer dans src/store/store.js)

// point d’entrée de l’application React
//tout mon site React (App, Navbar, Home, etc.) sera affiché à l’intérieur de cette balise

const root = ReactDOM.createRoot(document.getElementById('root'));
// index.js “démarre” ton application React apres l'importer de fichier App.js avec celle là :
root.render(
  <React.StrictMode>
    {/*Fournit le store à tous les composants de ton app*/}
    {/* 🟢 Toute ton app doit être enveloppée dans le Provider */}
    <Provider store={store}>
      <App />
    </Provider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//démarre ton application React dans la balise <div id="root"> du fichier public/index.html