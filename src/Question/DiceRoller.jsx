import React, { useState } from 'react'

function DiceRoller() {
    const [number,setNumber]=useState(0);
    const[inputmsg,setInputmsg]=useState(1);
    const [result, setResult] = useState([]);

    const rollDice = () => {
       const rslt= Math.floor(Math.random() * 6) + 1;
       setResult((prevResult) => [...prevResult, rslt]);
    }
    const onSubmit = () => {
        setResult([])
        if(inputmsg > 0 && inputmsg <= 12){
            for(let i=1; i<=inputmsg; i++){
              
                rollDice();
            }
        }else{
            alert('Please enter a valid number between 1 and 12')
        }
    }
   

  return (

    <div>
        <input type="number" className='mt-5 border' placeholder='enter number in 1 to 12' onChange={(e)=>setInputmsg(Number(e.target.value))}/>
        <button onClick={onSubmit} className='px-4 py-2 bg-blue-300 mx-3'>Submit</button>

       {
        result.map((item, index) => (
            <div key={index} className="border px-2 py-2 my-2">
              <p>You rolled a {item}</p>
            </div>
          ))
       }
    </div>
  )
}

export default DiceRoller