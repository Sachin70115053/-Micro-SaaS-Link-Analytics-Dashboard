
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/store'  // Import your Redux store
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import App from './App'
// import { store } from './store/store'
// import { loadUser } from './store/slices/authSlice'  // Import loadUser action
// import './index.css';

// // Check authentication before initial render
// store.dispatch(loadUser()).finally(() => {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   );
// });