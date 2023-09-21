import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
// import Confetti from 'react-confetti'

export default function App()
{
    const [dice,setDice]=React.useState(allNewDice())
    const[tenzies,setTenzies]=React.useState(false)
    
    React.useEffect(()=>{
        const allHeld=dice.every(die=>die.isHeld===true)
        let firstValue=dice[0].value
        const allSameValues=dice.every(die=>die.value===firstValue)
        
        if(allHeld && allSameValues){
        setTenzies(true)
        console.log("you won")}
    },[dice])
    function generateNewDie()
    {
        return{
        
                value: Math.ceil(Math.random()*6),
                isHeld: false,
                id: nanoid()
        }
                
    }
      function allNewDice()
    {
        const newDice=[]
        for(let i=0;i<10;i++)
        {
            newDice.push(generateNewDie())
        }
        // console.log(newDice)
        return newDice
    }
    
    function holdDice(id)
    {
        // console.log(id)
        setDice(oldDice=>
            oldDice.map(dice=>{
                return dice.id===id ? 
                {...dice, isHeld: !dice.isHeld}: dice            
            }))
    }
        function handleClick(id)
    {
        if(tenzies===false){
            setDice(oldDice=> oldDice.map(dice=>{
                return dice.isHeld ? dice :
                generateNewDie()
            }))
            
        }
            else{
                setTenzies(false)
                setDice(allNewDice())
            }
    }
    
        
    const diceElements=dice.map(die=><Die number={die.value} isHeld={die.isHeld} key={die.id} holdDice={()=>holdDice(die.id)} />)
     
     
return(
    <main className="main">
        
        <h1 className="main-heading">DICE-ROLLER</h1>
        <p className="main-text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

     <div className="dice-container">
         {diceElements}
    </div>
    
    <div className="button-div" onClick={handleClick}>
    
      <button className="button" >
      <p className="button-text">{tenzies?"New Game":"Roll"}</p>
      
    </button>
    </div>
    {tenzies? <h1 className="game-won">"You won"</h1>:""}
    
</main>

       
   
    )
}