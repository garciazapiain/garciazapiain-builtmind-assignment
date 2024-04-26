import React from 'react';
import { Provider } from 'react-redux'; // Import the Provider component
import { store } from './app/store'; // Import your Redux store
import { List } from './components/List';

function App() {
  return (
    <Provider store={store}> {/* Wrap your application in a Provider component */}
      <div className="App">
        <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-2xl text-white">
          <List />
        </header>
      </div>
    </Provider>
  );
}

export default App;