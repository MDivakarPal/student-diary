import React ,{useState,useEffect} from 'react'
import Localbase from 'localbase';
import {getData} from '../code/CodeManager';

const db=new Localbase('db');     
const ContextApi =React.createContext();
function close(element){
    element.style.display='none';
}

export default function DataContext({children}) {
    const [availableTopic,setAvailableTopic]=useState([]);
    const [availableTasks,setAvailableTasks]=useState([]);
    const [showTopic,setShowTopic]=useState([]);
    const [currentPage,setCurrentPag]=useState(0);
    const [taskCurrentPage,setTaskCurrentPag]=useState(0);
    const [sortType,setSortType]=useState('All');
    const [topicArray,setTopicArray]=useState(availableTasks);
    const [showTask,setShowTask]=useState([]);
    function getTopic(){
         getData(db,'topics').then(data=>{
             updateState(setAvailableTopic,data);
         }) 
    }
    function getTask(){
         getData(db,'tasks').then(data=>{
             updateState(setAvailableTasks,data);
         }) 
    }

    function  updateState(stateFun,data) {
        stateFun(data);
    }

    function getTopicArray() {
        if(sortType==='All')
        setTopicArray([...availableTasks].reverse());
        else{
            setTopicArray([...availableTasks].filter(({topic})=>topic===sortType).reverse())
        }
    }
            useEffect(() => {
            getTopic();
            getTask();
            },[])
            
            const pagi=5;
            function Pagination(tp=1) {
            const start=getStart(tp,pagi);
            setShowTopic(availableTopic.slice(start,pagi+start));
            
            setCurrentPag(tp);
            }

            function  getStart(pageNo,pageSize) {
                const start=(pageNo*pageSize)-pageSize;
                return start;
            }
            useEffect(()=>{
                Pagination(1);
               },[availableTopic]);
            

    useEffect(() => {
           getTopicArray();
    }, [sortType,availableTasks])
    
    const pageSize=10;
    function  taskPagination(tp=1) {
        const start=getStart(tp,pageSize);
        setShowTask(topicArray.slice(start,pageSize+start));
        setTaskCurrentPag(tp);
    }

    useEffect(() => {
        taskPagination();
    }, [topicArray])

    return (
        <ContextApi.Provider value={{taskCurrentPage,showTask,taskPagination,db,pagi,sortType,availableTasks,topicArray,updateState,setAvailableTopic,setAvailableTasks,setSortType,showTopic,currentPage,availableTopic,close,Pagination,setTopicArray}}>
        <div>
           {children}
        </div>
        </ContextApi.Provider>
    )
}

export{ContextApi};
