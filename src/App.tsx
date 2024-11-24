import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="w-full h-full max-h-[932px] max-w-[425px] mx-auto bg-white">
        <Game />
      </div>
    </div>
  );
}

export default App;