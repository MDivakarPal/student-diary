import React from 'react'
import AddTask from './AddTask'
import DashBoardCard from './DashBoardCard';
import Tasks from './Tasks'
import {Switch,Route,NavLink,BrowserRouter} from 'react-router-dom'
import AddTopic from './AddTopic'
import AvailableTopic from './AvailableTopic';
import DataContext from './DataContext'
export default function AddProgram() {
     function showComponet(show,...hide) {
         show.style.display='block';
         hide.map(item=>item.style.display='none')
     }
    return (
    <DataContext>
            <AddTask/>
            <AddTopic/>
            <AvailableTopic/>
     <div className='dashboard-container'>
      <div className='dashboard-header'>
      <DashBoardCard><button onClick={()=>{
          showComponet(document.querySelector('#ci'),document.querySelector('#topic1'),document.querySelector('#availableTopics'))
      }}>Add New Task</button></DashBoardCard>
      <DashBoardCard>
      <button onClick={()=>{
          showComponet(document.querySelector('#topic1'),document.querySelector('#ci'),document.querySelector('#availableTopics'))
      }}>Add New Topic</button></DashBoardCard>
     <DashBoardCard> <button onClick={()=>{
          showComponet(document.querySelector('#availableTopics'),document.querySelector('#topic1'),document.querySelector('#topic1'))
      }}>Availabe Topics</button>
      </DashBoardCard>
      <DashBoardCard><NavLink to='/week'><button>Weekly Progress</button></NavLink></DashBoardCard>
      <DashBoardCard><button>Over All Progress</button></DashBoardCard>
      <DashBoardCard><button>How To Use</button></DashBoardCard>
    </div>
    <div className='dashboard-main'>
     <Tasks/>
    </div>
    <div>
    </div>
    </div>
   
    </DataContext>
    )
}
