import React,{useContext} from 'react'
import {deleteData} from '../code/CodeManager'
import {ContextApi} from './DataContext'
import {Fade} from 'react-reveal'
export default function Delete({item,db,coll,id,state,update,setId}) {
    const {close} = useContext(ContextApi)
    function  delete1(params) {
        close(document.querySelector('#dc'))
        deleteData(db,id,coll,update,state)
        setId(undefined)
    }
    return (
     <Fade bottom>  <div id='dc' className='delete-container'>
            <header><h2>Confirmation Box</h2></header>
            <main>
                <b>{item} will be deleted.</b><br/>
                <p>Are you sure to delete</p>
                <button onClick={delete1}>Yes</button>
                <button onClick={()=>close(document.querySelector('#dc'))}>No</button>
            </main>
        </div>
        </Fade> 
    )
}
