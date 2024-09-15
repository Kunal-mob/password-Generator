import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passWord, setPassword] = useState("");

  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()?}{/><";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(
    ()=>{
passWordGenerator()
    },
    [length, numAllowed, charAllowed, passWordGenerator]
  )
  let refPassword = useRef(null)
  const copyPassword=useCallback(()=>{
    refPassword.current?.select()
window.navigator.clipboard.writeText(passWord )
  },
  [passWord])
 
  

  return (
    <div 
    className=" flex flex-col w-full h-screen items-center">
      <div className="mt-5 bg-slate-700 p-8 rounded-xl">
        <h1 
        className="text-gray-50  text-3xl text-center">Password Generator</h1>
        <div className="mt-4">
          <input 
          type="text" 
          value={passWord} 
          className="outline-none text-yellow-500 text-2xl py-1 px-3 p-1 rounded-l-lg text-center w-96 h-10 text-xl" 
          placeholder="password"
          readOnly
          ref={refPassword}
          />
          <button   
          className="bg-blue-700 text-white text-xl w-24 h-11 rounded-r-lg p-1" 
          onClick={copyPassword}
          >COPY</button>
        </div>

        <div className="mt-4">
          <input 
          className="cursor-pointer accent-blue-600"
          type="range" 
          name="length" 
          id="03"
          min={8}
          max={100}
          value={length}
          onChange={(e)=>{
            setLength(e.target.value);
          }}
          />
          <label className="text-yellow-500 mr-4 text-xl" htmlFor="length">length : {length}</label>
          <input 
          className="h-4 w-5 accent-blue-600"
          type="checkbox" 
          name="num" 
          id="01"
           onChange={()=>{
            setNumAllowed((prev )=>!prev)
          }} 
          />
          <label className="text-yellow-500 mr-4 text-xl" htmlFor="num">Numbers</label>
          <input 
          className="h-4 w-5 accent-blue-600"
          type="checkbox" 
          name="char" 
          id="02" 
          onChange={()=>{
            setCharAllowed(!charAllowed)
          }}          
          />
          <label className="text-yellow-500 mr-4 text-xl" htmlFor="char">Special char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
