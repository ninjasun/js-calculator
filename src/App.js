import React from 'react';

import './App.css';

const numberSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const opSet = ["/", "*", "+", "-"];

/**
 * 
 * not valid case:
 * 0..5  case A not allow a dot after another dot. Or better do not allow more than one dot for sequence
 * 00  case B after zero allow only dot.
 * . case C not allow sequence start with dot
 */
function isValid({
  lastInput,
  newChar
}){
  let firstChar = lastInput[0];
  if(firstChar === "" && newChar === ".") return false;
  if(firstChar === "0" && newChar !== ".") return false;
  if(newChar === "." && lastInput.includes(".")) return false;
  if(newChar === "." && lastInput === "") return false;
  return true;
}

function calc(a, b, operator){
  console.log(`calc: ${a} ${operator} ${b}` )
  switch(operator){
    case "*":
      return parseFloat(a) * parseFloat(b);
    case "/":
      return parseFloat(a) / parseFloat(b);
    case "+":
      return parseFloat(a) + parseFloat(b);
    case "-":
      return parseFloat(a) - parseFloat(b);
    default:
      return 0
  }
}

/**
 * 
 * @param {*} list ["89","+","45","-","9"]
 */

function getMagic(list){
  if(list.length === 1){
    return list[0];
  }
  var  res, index;
  // cerca moltiplicazioni
  index = list.indexOf("*");
  if(index > -1) {
    res = calc(list[index-1], list[index+1], "*")
    //rimuovi 3 elementi da index-1 e inserisci il res in index-1
    list.splice( index-1, 3, res)
    return getMagic(list);
  }
  index = list.indexOf("/");
  if( index > -1){
      res = calc(list[index-1], list[index+1], "/")
      //rimuovi 3 elementi da index-1 e inserisci il res in index-1
      list.splice(index-1, 3, res)
      return getMagic(list);
  }
  //risolvi in ordine da sinistra a destra. qua abbiamo solo + e -
  res = calc(list[0], list[2], list[1])
  //rimuovi 3 elementi da 0 e inserisci il res a index 0
  list.splice(0, 3, res);
  return getMagic(list);
}

/**
 * replace last element of list and return a copy of new list
 */

 function replace(list, updated){
  return list.map( (item, i) => {
    if(i === list.length-1) return updated;
    else return item;
  })
 }

 /**
  * add elment to the end of list and return a copy of it
  */
 function add(list, el){
   var listCopy = [...list];
   listCopy.push(el);
   return listCopy;
 }


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      expression: '',
      equals: 0,
      data: []
    }
  }

  handleClear=()=>{
    this.setState({
      expression: '',
      equals: 0,
      data: []
    })
  }

  onChange=(e)=>{
    const newChar = e.target.value;
    const empty = "";
    const { data } = this.state;

    let lastInput = data.length > 0 ? data[this.state.data.length-1] : empty ;
    let lastChar = lastInput === empty ? empty : lastInput[lastInput.length-1];
    let updated = null;
    let newData = [];

    if (isValid({lastInput, newChar})){
        // newChar = .    lastChar numero   => [REPLACE]
        if(newChar === "." && numberSet.includes(lastChar)){
          updated = lastInput + newChar; //APPEND
          newData = replace(data, updated);
        }
        //newChar = numero   lastChar operatore || ''  => [ADD]
        else if((opSet.includes(lastChar) || lastChar === empty) && numberSet.includes(newChar)){
          //push nuvo input
          updated = newChar;
          newData = add(data, updated)
        }
        //numero dopo numero o . [REPLACE]
        else if(numberSet.includes(newChar)  && (numberSet.includes(lastChar) || lastChar === ".")) {
          updated = lastInput + newChar;  //APPEND
          newData = replace(data, updated)
        }
        // operatore dopo operatore  [REPLACE]
        else if(opSet.includes(lastChar) && opSet.includes(newChar)){
          updated = newChar; /** l'ultimo operatore vince */
          newData = replace(data, updated);
        }
        //operatore dopo numero || '' [ADD]
        else if((numberSet.includes(lastChar) || lastChar === empty) && opSet.includes(newChar)){
          //push nuvo input
          updated = newChar;
          newData = add(data, updated)
        }
        else {
          console.log("Caso da gestire: ",);
        }
        this.setState({
          data: newData,
          equals: updated,
          expression: this.state.expression + newChar
        })
    }
    else {
      console.log("Input not valid: ", e.target.value)
    }
  }

  onCalculus=()=>{
    
    const { data } = this.state;
    console.log("!!! onCalculus: ", data );
    var result = getMagic(data);

    this.setState({
      equals: result,
      expression: this.state.expression + "="+ result
    })
  }


  render(){

    return (
      <div className="App">
        <div className="container">
          <div className="inputFormula">
            {this.state.expression}
          </div>
          <div id="display" className="output">
            {this.state.equals}
          </div>
          <div className="buttons">
            <button id="clear" className="bg-dark-red btn-large" onClick={this.handleClear}>AC</button>
            <button id="divide" className="bg-grey" onClick={this.onChange} value="/">/</button>
            <button id="multiply" className="bg-grey" onClick={this.onChange} value="*">x</button>
            <button id="seven" className="bg-dark-grey" onClick={this.onChange} value="7">7</button>
            <button id="eight" className="bg-dark-grey" onClick={this.onChange} value="8">8</button>
            <button id="nine" className="bg-dark-grey" onClick={this.onChange} value="9">9</button>
            <button id="subtract" className="bg-grey" onClick={this.onChange} value="-">-</button>
            <button id="four" className="bg-dark-grey" onClick={this.onChange} value="4">4</button>
            <button id="five" className="bg-dark-grey" onClick={this.onChange} value="5">5</button>
            <button id="six" className="bg-dark-grey" onClick={this.onChange} value="6">6</button>
            <button id="add" className="bg-grey" onClick={this.onChange} value="+">+</button>
            <button id="one" className="bg-dark-grey" onClick={this.onChange} value="1">1</button>
            <button id="two" className="bg-dark-grey" onClick={this.onChange} value="2">2</button>
            <button id="three" className="bg-dark-grey" onClick={this.onChange} value="3">3</button>
            
            <button id="zero" className="bg-dark-grey btn-large" onClick={this.onChange} value="0">0</button>
            <button id="decimal" className="bg-dark-grey" onClick={this.onChange} value=".">.</button>
            <button id="equals" className="bg-dark-blue btn-long" onClick={this.onCalculus} value="=">=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
