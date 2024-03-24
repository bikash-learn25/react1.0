import { useCallback, useState, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [characterAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()-_=+[]{}|;:,.<>/?`~"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
    
  }, [length, numberAllowed, characterAllowed, setPassword])
  
  //copy passowrd to the clipboard using window object
  const copyPasswordToClipBoard = useCallback(() => {
    //selected password highlight feature
    passwordRef.current?.select()
    //maximum range of password should be selected
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3 text-xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 mr-1 shrink-0'
          onClick={() => {
            passwordGenerator();
          }}
        >
          New Password
        </button>
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPasswordToClipBoard}
        >copy</button>
      </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={10}
            max={99}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap=x=1'>
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                  setNumberAllowed((prev) => !prev);
              }}
              />
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap=x=1'>
            <input 
              type="checkbox" 
              defaultChecked={characterAllowed}
              id='characterInput'
              onChange={() => {
                  setCharAllowed((prev) => !prev);
              }}
              />
              <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>  
    </div>
     
    </>
  )
}

export default App
