import React, {useState,useEffect} from 'react'
import './App.css';
import TableFun from './components/TableFun'


function App() {

  
  const [data , setData ] = useState([])

 useEffect(() => {
   fetch("https://restcountries.eu/rest/v2/").then(res => res.json() )
   .then((res) =>{
    const sliceData = res.filter((val) => val.area%147 ==0)

        setData(sliceData)
   
   }).catch(err => console.log(err))
 
 },[]);

  return (
   <>
   
  <TableFun data={data}></TableFun>
   
   </>
  );
}

export default App;
