import React from "react"

export default function Die(props)
{ 
   const styles=
   {
       backgroundColor: props.isHeld ? "#59E391":"#FFFFFF"
    }


    return(
        <div className="box" onClick={props.holdDice} style={styles}>
           {props.number}
        </div>
    )
}