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
          <button id="clear" className="bg-dark-red btn-large" onClick={onClick}>AC</button>
          <button id="divide" className="bg-grey" onClick={onClick}>/</button>
          <button id="multiply" className="bg-grey" onClick={onClick}>x</button>
          <button id="seven" className="bg-dark-grey" onClick={onClick}>7</button>
          <button id="eight" className="bg-dark-grey" onClick={onClick}>8</button>
          <button id="nine" className="bg-dark-grey" onClick={onClick}>9</button>
          <button id="subtract" className="bg-grey" onClick={onClick}>-</button>
          <button id="four" className="bg-dark-grey" onClick={onClick}>4</button>
          <button id="five" className="bg-dark-grey" onClick={onClick}>5</button>
          <button id="six" className="bg-dark-grey" onClick={onClick}>6</button>
          <button id="add" className="bg-grey" onClick={onClick}>+</button>
          <button id="one" className="bg-dark-grey" onClick={onClick}>1</button>
          <button id="two" className="bg-dark-grey" onClick={onClick}>2</button>
          <button id="three" className="bg-dark-grey" onClick={onClick}>3</button>
          
          <button id="zero" className="bg-dark-grey btn-large" onClick={onClick}>0</button>
          <button id="decimal" className="bg-dark-grey" onClick={onClick}>.</button>
          <button id="equals" className="bg-dark-blue btn-long" onClick={onClick}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
