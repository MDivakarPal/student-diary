import React,{useState,useEffect,useContext} from 'react'
import { Fade } from 'react-reveal';
import {ContextApi} from './DataContext'
import Paging from './Paging'
import Delete from './Delete'
import Edit from './Edit'
export default function AvailableTopic() {
    const {db,pagi,currentPage,Pagination,close,showTopic,availableTopic,updateState,setAvailableTopic}=useContext(ContextApi);
    const totalPage=availableTopic.length%pagi===0 ? availableTopic.length/pagi : (availableTopic.length/pagi)+1
    //item,coll,db,id,state,update
    const [item,setItem]=useState();
    const [id,setId]=useState();
    function deleteData(item,id) {
        setItem(item);
        setId(id)
        const ele=document.getElementById('dc');
        ele.style.display='block';
        const ele1=document.getElementById('ec');
        ele1.style.display='none';
    }
    function updateData(item,id) {
        setItem(item);
        setId(id)
        const ele=document.getElementById('dc');
        const ele1=document.getElementById('ec');
        ele.style.display='none';
        ele1.style.display='block';
    }
    return (
       <Fade  left> <div className='availableTopic' id='availableTopics'>
            <h2 style={{textAlign:'center'}}>Availabe Topics</h2>
            <Delete db={db} item={item} coll='topics' setId={setId} id={id} state={setAvailableTopic} update={updateState}/>
            <Edit db={db} setItem={setItem} item={item} setId={setId} coll='topics' id={id} state={setAvailableTopic} update={updateState}/>
            <hr/>
            <table>
                <tr>
                    <th>Sr. No</th>
                    <th>Topic Name</th>
                    <th>Date of Add</th>
                    <th colSpan='2'>Actions</th>
                </tr>
                {
                    showTopic.map(({id,topic,date},i)=>
                    <tr>
                    <th>{((currentPage-1)*pagi)+(i+1)}</th>
                    <th>{topic}</th>
                    <th>{date}</th>
                    <th><button onClick={()=>deleteData(topic,id)}>Delete</button></th>
                    <th><button onClick={()=>updateData(topic,id)}>Edit</button></th>
                    </tr>
                    )
                }
             
            </table>
          <Paging totalPage={totalPage} currentPage={currentPage} Pagination={Pagination}/>
            <button onClick={()=>close(document.querySelector('#availableTopics'))}>
                Close
            </button>
        </div></Fade>
    )
}
