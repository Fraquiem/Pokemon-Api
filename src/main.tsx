import React from 'react' 
import ReactDOM from 'react-dom/client' // importa React y ReactDOM para renderizar la aplicación
import App from './App.tsx' // importa el componente principal de la aplicación
import './index.css' // importa las directivas y estilos de Tailwind CSS

/* un DOM es un objeto que representa la estructura de un documento HTML. entonces lo que hace 
"ReactDOM.createRoot" es crear un DOM virtual que se va a renderizar en el elemento con id root, esto significa que
el elemento con id root es el contenedor principal de la aplicación.

gracias copilot ahi por la explicacion 
*/
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />  

  </React.StrictMode>,
)