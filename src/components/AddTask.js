import Localbase from 'localbase';
import React,{useState,useEffect,useContext} from 'react'
import { Fade } from 'react-reveal';
import { addNewItem,validateSize} from '../code/CodeManager';
import {ContextApi} from './DataContext'
const db=new Localbase('db');
export default function AddTask(){
    const {availableTopic,close,updateState,setAvailableTasks}=useContext(ContextApi);
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [link,setLink]=useState('');
    const [topic,setTopic]=useState('');
    function  addData() {
        if(validateSize(100,10,title) && topic && validateSize(500,20,desc) && validateSize(200,10,link))
        {
            addNewItem(db,{title,topic,link,desc},'tasks',updateState,setAvailableTasks);
            setTitle('');
            setDesc('');
            setLink('');
        }
    }
    availableTopic.sort()
    return(
     <Fade left>     
     <div id='ci' className='taskContainer'>
         <div className='title'>
             <h3 style={{textAlign:'center'}}>Add Today's new Task</h3>
             <hr/>
         </div>
         <div className='taskForm'>
           <label className='label'>Title <span className='mandatory'>*</span></label> <br/>
           <input  value={title} onChange={(e)=>setTitle(e.target.value)} required className='input' type='text'/> <br/>
           <hr/>
           <label className='label'>Link <span className='mandatory'>*</span></label><br/>
           <input onChange={(e)=>setLink(e.target.value)} required className='input' value={link} type='text'/> <br/><hr/>
           <label className='label'>Description<span className='mandatory'>*</span></label><br/>
           <textarea className='input' onChange={(e)=>setDesc(e.target.value)} value={desc}/>
           <br/><hr/>
           <label className='label'>Topic <span className='mandatory'>*</span></label> <br/>
           <select onChange={(e)=>setTopic(e.target.value)} required  className='input'>
           <option>Select</option>
           {availableTopic.map(({topic})=><option>{topic}</option>)}
            </select><br/><hr/>
           <button onClick={addData}>Add task</button>
            <button onClick={()=>close(document.querySelector('#ci'))}>Close</button>
        </div>
     </div></Fade>
    );
}
