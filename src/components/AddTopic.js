import Localbase from 'localbase';
import React,{useState,useEffect,useContext} from 'react'
import { Fade } from 'react-reveal';
import { addNewItem,validateSize } from '../code/CodeManager';
import {ContextApi} from './DataContext'
const db=new Localbase('db');
export default function AddTask(){
    const {close,updateState,setAvailableTopic}=useContext(ContextApi);
    const [topic,setTopic]=useState('');
    function  setData(e) {
        if(validateSize(50,0,e.target.value))
        setTopic(e.target.value)
    }
    function  addData() {
        if(validateSize(50,3,topic))
        {
            addNewItem(db,{topic},'topics',updateState,setAvailableTopic)
            setTopic('');
         }
    }
    return(
     <Fade left>     
     <div id='topic1' className='topic'>
         <div className='title'>
             <h3 style={{textAlign:'center'}}>Add New Topic</h3>
             <hr/>
         </div>
         <div className='topicform'>
           <label className='label'>Topic Name<span className='mandatory'>*</span></label> <br/>
           <input onChange={setData} required className='input' value={topic} type='text'/> <br/>
           <hr/>
           <button onClick={addData}>Add task</button> 
           <button onClick={()=>close(document.querySelector('#topic1'))}>Close</button>
        </div>
     </div></Fade>
    );
}
