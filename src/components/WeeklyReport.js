
import React,{useContext} from "react";
import {ContextApi} from './DataContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const feb=parseInt(new Date().getFullYear())%4===0 ? 29 :28;
const month=[31,feb,31,30,31,30,31,31,30,31,30,31];
function  getFirstDayOfWeek() {
    const d=new Date();
    const day=d.getDay();
    let firstDate=d.getDate()-day;

    if(firstDate<=0)
    {
       const prevMonth=d.getMonth()===0 ? 11 :d.getMonth()-1;
       const year=d.getMonth()===0 ? d.getFullYear()-1:d.getFullYear();
       firstDate=month[prevMonth]+d.getDate()-day;
       return [firstDate,prevMonth+1,year];
    }
    return [firstDate,d.getMonth()+1,d.getFullYear()];
}
console.log(feb);
function weekDayArray(params) {
    let weekDays=[];
    
    const [date,month1,year]=getFirstDayOfWeek();
    const d=new Date();
    console.log(date+":"+month1+":"+year)
    const mon=d.getMonth()+1;
    if(month1===mon)
    {
        for(var i=date;i<=d.getDate();i++)
        {
           weekDays=[...weekDays,`${i}-${month1}-${year}`]; 
        }
    }
    else{
        for(i=date;i<=month[month1-1];i++)
        {
            weekDays=[...weekDays,`${i}-${month1}-${year}`]
        }
        for(i=1;i<=d.getDate();i++)
        {
            weekDays=[...weekDays,`${i}-${d.getMonth()+1}-${d.getFullYear()}`]
        }
    }
    return weekDays;
}
export default function WeeklyReport() {
   const week= weekDayArray();
   const {availableTasks} =useContext(ContextApi);
   let data=[]
   week.forEach((item)=>{
        let temparr=availableTasks.filter(({date})=>item===date);
        data=[...data,{name:item,pv:temparr.length}];
   })
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
          <h2>Weekly Progress</h2>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
    </BarChart>
  );
}
