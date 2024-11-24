import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-[calc(100vh-2rem)] max-w-3xl bg-white rounded-lg shadow-lg"> 
        <Game />
      </div>
    </div>
  );
}

export default App;