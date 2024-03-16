import { useState } from 'react'

import './App.css'

function App() {
  
  let [counter, setCounter] = useState(10)
  // let counter = 15

  const addValue = () => {
    // console.log("Value added", Math.random());
    console.log("clicked", counter);
    counter = counter + 1
    setCounter(counter + 1)
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }

  return (
    <>
     <h1>Bikash RactJS</h1>
     <h2>Counter Value: {counter}</h2>

     <button
     onClick={addValue}
     >Add value: {counter}</button>
     <br />
     <button
     onClick={removeValue}
     >Remove value: {counter}</button>
    </>
  )
}

export default App
