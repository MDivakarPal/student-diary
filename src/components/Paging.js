import React from 'react'
export default function Paging({totalPage,currentPage,Pagination}) {
    const arr=new Array(parseInt(totalPage));
    arr.fill(0)
    return (
        <div className='paging-container'>
             <b>Page {currentPage} of {parseInt(totalPage)}</b>  
            {arr.map((item,i)=>
            <button onClick={()=>Pagination(i+1)} className={currentPage===(i+1)?'paging, primary' :'paging'} 
                 key={i+1}>{i+1}</button>
            )
            }    
        </div>
    )
}
