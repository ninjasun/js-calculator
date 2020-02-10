import React from 'react';

import './App.css';

function onClick(){
  
}
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="inputFormula">
          900
        </div>
        <div id="display" className="output">
          900
        </div>
        <div className="buttons">
          <button id="" className="bg-dark-red btn-large" onClick={onClick}>AC</button>
          <button id="" className="bg-grey" onClick={onClick}>/</button>
          <button id="" className="bg-grey" onClick={onClick}>x</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>7</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>8</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>9</button>
          <button id="" className="bg-grey" onClick={onClick}>-</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>4</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>5</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>6</button>
          <button id="" className="bg-grey" onClick={onClick}>+</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>1</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>2</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>3</button>
          
          <button id="" className="bg-dark-grey btn-large" onClick={onClick}>0</button>
          <button id="" className="bg-dark-grey" onClick={onClick}>.</button>
          <button id="equals" className="bg-dark-blue btn-long" onClick={onClick}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
