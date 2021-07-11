import React,{useContext,useState} from 'react'
import {ContextApi} from './DataContext'
import Paging from './Paging'
import DeleteTask from './DeleteTask'
import EditTask from './EditTask'

export default function Tasks() {
  
    const {updateState,setAvailableTasks,db,taskCurrentPage,showTask,taskPagination,sortType,setSortType,availableTopic,availableTasks,topicArray} =useContext(ContextApi);
    availableTopic.sort(({topic:a},{topic:b})=>a.localeCompare(b));
    const pageSize=10;
    const [item,setItem]=useState();
    const [id,setId]=useState();
    const [desc,setDesc]=useState();
    const [link,setLink]=useState();
    const [topic,setTopic]=useState();
    function deleteData(item,id) {
        setItem(item);
        setId(id)
        const ele=document.querySelector('#dc1');
        ele.style.display='block'
    }
    function updateData(item,id,desc,link,topic) {
        setItem(item);
        setId(id)
        setLink(link);
        setDesc(desc)
        setTopic(topic)
        const ele=document.getElementById('et');
        const ele1=document.getElementById('dc1');
        ele.style.display='block';
        ele1.style.display='none';
    }
   
     const totalPage=topicArray.length%pageSize===0 ? topicArray.length/pageSize : (topicArray.length/pageSize)+1
    return (
        <div className='task-container'>
            <DeleteTask db={db} item={item} coll='tasks' setId={setId} id={id} state={setAvailableTasks} update={updateState}/>
            <EditTask id={id} title={item}desc={desc} 
            setTitle={setItem} 
            setLink={setLink}
            setDesc={setDesc}
            setTopic={setTopic}
            link={link} topic={topic}/>
            <div className='topic-container'>
             <button className={sortType==='All' ? 'primary':''} onClick={()=>setSortType('All')}>All <sup>{availableTasks.length}</sup></button>
             {availableTopic.map(({topic})=><span><button className={sortType===topic?'primary' :''} onClick={()=>setSortType(topic)} key={topic}>{topic} <sup>{availableTasks.filter(({topic:t})=>t===topic).length}</sup></button>
             </span>
    
              )}
            </div> 
            <div>
                 <table>
                <tr>
                    <th>Sr. No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Topic</th>
                    <th colSpan='3'>Actions</th>
                </tr>
                {
                    showTask.map(({id,title,date,desc,topic,link},i)=>
                    <tr>
                    <th>{(i+1)}</th>
                    <th>{title}</th>
                    <th>{desc}</th>
                    <th>{topic}</th>
                    <th><button className='danger' onClick={()=>deleteData(title,id)}>Delete</button></th>
                    <th><button className='primary' onClick={()=>updateData(title,id,desc,link,topic)} >Edit</button></th>
                     <th><a href={link} rel="noreferrer" key={i+1} target='_blank'><button className='primary'>Source</button></a></th>
                    </tr>
                    )
                }
             
            </table>
            <Paging currentPage={taskCurrentPage}  Pagination={taskPagination} totalPage={totalPage}/>
            </div>
        </div>
    )
}
