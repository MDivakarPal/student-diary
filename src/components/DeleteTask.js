import React,{useContext} from 'react'
import {deleteData} from '../code/CodeManager'
import {ContextApi} from './DataContext'
import {Fade} from 'react-reveal'
export default function DeleteTask({item,db,coll,id,state,update,setId}) {
    const {close} = useContext(ContextApi)
    function  delete1(params) {
        (document.querySelector('#dc1')).style.display='none'
        deleteData(db,id,coll,update,state)
        setId(undefined)
    }
    return (
     <Fade bottom>  <div id='dc1' className='delete-container'>
            <header><h2>Confirmation Box</h2></header>
            <main>
                <b>{item} will be deleted.</b><br/>
                <p>Are you sure to delete</p>
                <button onClick={delete1}>Yes</button>
                <button onClick={()=>close(document.querySelector('#dc1'))}>No</button>
            </main>
        </div>
        </Fade> 
    )
}
