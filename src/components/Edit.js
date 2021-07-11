import React,{useContext,useState,useEffect} from 'react'
import {updateData,validateSize} from '../code/CodeManager'
import {ContextApi} from './DataContext'
export default function Delete({item,db,coll,id,state,update,setItem}) {
    const {close} = useContext(ContextApi)
    function  update1() {
        close(document.querySelector('#ec'))
        updateData(db,id,coll,update,state,{topic:item})
    }
 
    function  setData(e) {
        if(validateSize(50,3,e.target.value))
        setItem(e.target.value)
    }

    return (
        <div id='ec' className='delete-container'>
            <header><h2>Updation</h2></header>
            <main>
                 <textarea value={item} onChange={setData}/>
                <button onClick={update1}>Save</button>
                <button onClick={()=>close(document.querySelector('#ec'))}>Close</button>
            </main>
        </div>
    )
}
