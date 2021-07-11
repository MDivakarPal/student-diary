async function addNewItem(db,{...values},coll,updateState,updatingState){
     let id1=1;
  await  db.collection(coll).get().then(user=>{
        if(user.length>0)
        id1=(user[user.length-1].id)+1
    });
    db.collection(coll).add({
        ...values,
        date:getCurrentDate(),
        id:id1
    }).then(x=>{
        db.collection(coll).get().then(user=>{
            updateState(updatingState,user);
        });
    })
}

async function getData(db,coll){
  let res=[]
  await db.collection(coll).get().then(data=>{
      data.map((topic)=>res=[...res,topic]);
  })
  console.log(res)
  return res;
}


function getCurrentDate()
{
    var d=new Date();
    return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
}

//Delete data
function deleteData(db,id,coll,updateState,updatingState){
     db.collection(coll).doc({id:id}).delete().then(x=>{
         db.collection(coll).get().then(data=>{
             updateState(updatingState,data);
         })
     })
}

//Update data
function updateData(db,id,coll,updateState,updatingState,{...data}){
    db.collection(coll).doc({id:id}).update(
        {   
            id:id,
            ...data,
            date:getCurrentDate()
        }
    ).then(x=>{
        db.collection(coll).get().then(data=>{
            updateState(updatingState,data);
        })
    })
}

function validateSize(maxLen,minLen,str)
{
     if(maxLen>= str.length && str.length>=minLen)
     return true;
     else
     return false;
}
export {addNewItem,getData,deleteData,updateData,validateSize}