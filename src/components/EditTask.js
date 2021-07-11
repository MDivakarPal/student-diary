import Localbase from 'localbase';
import React,{useContext} from 'react'
import { Fade } from 'react-reveal';
import { updateData,validateSize} from '../code/CodeManager';
import {ContextApi} from './DataContext'
const db=new Localbase('db');
export default function EditTask({id,setTitle,setLink,setDesc,setTopic,title,desc,link,topic}){
    const {availableTopic,close,updateState,setAvailableTasks}=useContext(ContextApi);
    function  addData1() {
        alert('okl')
        if(validateSize(100,10,title) && topic && validateSize(500,20,desc) && validateSize(200,10,link))
        {
            //db,id,coll,updateState,updatingState,{...data}
            alert('ok')
            updateData(db,id,'tasks',updateState,setAvailableTasks,{title,topic,link,desc});
            setTitle('');
            setDesc('');
            setLink('');
            setTopic('');
        }
    }
    availableTopic.sort()
    return(
     <Fade left>     
     <div id='et' className='taskContainer'>
         <div className='title'>
             <h3 style={{textAlign:'center'}}>Update Your task</h3>
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
           <select onChange={(e)=>setTopic(e.target.value)} value={topic} required  className='input'>
           <option>Select</option>
           {availableTopic.map(({topic:t})=><option>{t}</option>)}
            </select><br/><hr/>
           <button onClick={addData1}>Update task</button>
            <button onClick={()=>close(document.querySelector('#et'))}>Close</button>
        </div>
     </div></Fade>
    );
}
