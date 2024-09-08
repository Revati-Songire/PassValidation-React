import React, { useState } from 'react';
import './App.css';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState('');
  const [inputColor, setInputColor] = useState(''); 
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  
  const validatePassword = () => {
    let letters = 0;
    let symbols = 0;
    let digits = 0;

    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        letters++;
      } else if (char >= '0' && char <= '9') {
        digits++;
      } else {
        symbols++;
      }
    }

    const isValid = letters >= 5 && symbols >= 1 && digits >= 3;

    if (isValid) {
      setInputColor('green'); 
      alert("Password is Valid!")
      const newItem = { id: Date.now(), name: password, checked: false };
      setLeftItems([...leftItems, newItem]);
      console.log(leftItems)
      setPassword('');
    } else {
      setInputColor('red'); 
      alert("Password must contain min 5 letters,1 symbol and 3 digits")
    }
  };

  const clickCheckBoxLeft = (checked,index) => {
    console.log(checked," " ,index)
    let arr=[...leftItems]
    console.log(arr[index],"before")
    arr[index].checked=checked
    console.log(arr[index],"after")
    setLeftItems(arr)
  };

  const clickCheckBoxRight = (checked,index) => {
    console.log(checked," " ,index)
    let arr=[...rightItems]
    console.log(arr[index],"before")
    arr[index].checked=checked
    console.log(arr[index],"after")
    setRightItems(arr)
  };

  const movetoRight = () => {
    let arr=[]
    let arr2=leftItems.filter((ele)=>ele.checked== false)
    arr=leftItems.filter((ele)=>{
      if(ele.checked==true){
        ele.checked=false
        return true
    }
      return false;})
    setRightItems([...arr,...rightItems])
    setLeftItems(arr2)
  };

  const movetoLeft = () => {
    let arr=[]
    let arr2=rightItems.filter((ele)=>ele.checked== false)
    arr=rightItems.filter((ele)=>{
      if(ele.checked==true){
        ele.checked=false
        return true
    }
      return false;})
    setLeftItems([...arr,...leftItems])
    setRightItems(arr2)
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input type="text" value={password} onChange={(e) => {setPassword(e.target.value); setInputColor(''); }}
        placeholder="Enter Password" style={{ backgroundColor: inputColor }} />

      <button onClick={validatePassword} className='submitbtn'>SUBMIT</button>

      <div className="card">
        <div className="left-div">
          {leftItems.map((item,index) => (
            <div key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={(e) => clickCheckBoxLeft(e.target.checked,index)}/>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

         <div className="middle-div">
           <button className='left-arrow' onClick={movetoLeft}> <FaArrowCircleLeft /> </button>
           <button className='right-arrow' onClick={movetoRight}> <FaArrowCircleRight /> </button>
         </div>
        
         <div className="right-div">
         {rightItems.map((item,index) => (
            <div key={item.id+"right"}>
              <input type="checkbox" checked={item.checked} onChange={(e) => clickCheckBoxRight(e.target.checked,index)}/>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;