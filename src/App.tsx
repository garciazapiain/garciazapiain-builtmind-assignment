import React from 'react';
import { Provider } from 'react-redux'; // Import the Provider component
import { store } from './app/store'; // Import your Redux store
import './App.css';
import { List } from './components/List';

function App() {
  return (
    <Provider store={store}> {/* Wrap your application in a Provider component */}
      <div className="App">
        <header className="App-header">
          <List />
        </header>
      </div>
    </Provider>
  );
}

export default App;