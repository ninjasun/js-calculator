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
      calcResult: 0,
      data: []
    }
  }

  handleClear = () => {
    this.setState({
      expression: '',
      equals: 0,
      data: [],
      calcResult: 0,
    })
  }

  handleStartCalc = ({dataCalc, expr, char }) => {
    console.log("handleStartCalc dataCalc: ", dataCalc );
    console.log("handleStartCalc expr: ", expr);
    console.log("handleStartCalc char: ", char);

    this.setState({
      calcResult: 0,
      equals: char,
      data: dataCalc,
      expression: expr
    })
  }

  onChange = (e) => {
    const newChar = e.target.value;
    const empty = "";
    const { data, calcResult } = this.state;
    const _NEG = "NEGATIVE";

    let lastInput = data.length > 0 ? data[this.state.data.length-1] : empty ;
    let lastChar = lastInput === empty ? empty : lastInput[lastInput.length-1];
    let updated = null;
    let newData = [];
    /** primo input dopo il calcolo */
    if(calcResult > 0  ){
      const updateCalc = {
        char: newChar,
        dataCalc: [],
        expr: []
      };
      if(opSet.includes(newChar) ){
        //start calc from result with newChar operator
        updateCalc.dataCalc = add([], empty + calcResult);
        updateCalc.dataCalc =  add(updateCalc.dataCalc, newChar);
        updateCalc.expr =  add(updateCalc.expr, calcResult + newChar);
      }
      else {
        //start calc with newChar
        updateCalc.dataCalc = add([], empty + newChar);
        updateCalc.expr = [...updateCalc.dataCalc];
      }
      return this.handleStartCalc(updateCalc)
    }  
    else{
      if (isValid({lastInput, newChar})){
          /**   CLICK ON 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 */
          if (numberSet.includes(newChar)){
              /** ultimo inserito è  NEGATIVE */
              if(lastInput === _NEG){
                updated = "-"; 
                newData = replace(data, "-" + newChar);
              }
              /** ultimo inserito è operatore o stringa vuota iniziale.  +  -  *  /  "" */
              else if (opSet.includes(lastChar) || lastChar === empty){
                updated = newChar;  //tutti i numeri inseriti sono positivi
                newData = add(data, updated);
              }
              /** ultimo inserito è un numero o . */
              else if (numberSet.includes(lastChar) || lastChar === "."){
                updated = lastInput + newChar; //APPEND
                newData = replace(data, updated);
              }
          }
          /**   CLICK ON -, +, *, /    *****/
          else if(opSet.includes(newChar)){
            /** ultimo inserito è un numero */
              if (numberSet.includes(lastChar)){
                updated = newChar;  
                newData = add(data, updated);
              }
              /** ultimo inserito è _NEG significa che ho già due operatori */
              else if (lastInput === _NEG){
                /** elimino ultimo e aggiorno operatore */
                updated = newChar;
                var popper = [...data];
                popper.pop();
                newData = replace(popper, updated)
              }
              /** ultimo inserito è un operatore (ma non -)  e sto inserendo - */
              else if((lastChar === "+" || lastChar === "*" || lastChar === "/") && newChar === "-"){
                /** CASI 5* -5 | 5/ -2 | 5+ -3 */
                updated = newChar;  
                newData = add(data, _NEG);
              }
              else {
                updated = newChar; /** l'ultimo operatore vince */
                newData = replace(data, updated);
              }
          }
          /** CLICK on . */
          else if(newChar === "." && numberSet.includes(lastChar) ){
              updated = lastInput + newChar;  
              newData = replace(data, updated);
          }
          else {
            console.log("********** Caso da gestire *****************");
          }

        return this.setState({
            data: newData,
            equals: updated,
            expression: this.state.expression + newChar
          })
      }
      else {
        console.log("Input not valid: ", e.target.value)
      }
    }
    
  }

  onCalculus=()=>{
    
    const { data, expression } = this.state;
    console.log("!!! onCalculus: ", data );
    console.log("!!! expression: ", expression );

    var copyData = [...data];
    var result = getMagic(copyData);
    console.log("equals: ", result);
    this.setState({
      equals: result + "",
      calcResult: result,
      expression: this.state.expression + "=" + result
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
