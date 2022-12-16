//import React from 'react';
import React, {useState,setState} from 'react';
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

// const data = {   
//     labels: ["Jun 2022","Jul 2022","Aug 2022","Sep 2022","Oct 2022","Nov 2022"],
//     datasets: 
//     [
//      {
//       label: 'Tickets',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [29,19,20,17,17,13]
//       },
//     ],
//   };
  

function Dashboard() {    
  const [ticketsdata, setTicketsData] = React.useState(null);
  const [bookingsdata, setBookingsData] = React.useState(null);
  const [compid, setCompanyId] = useState('YTH');

  const handleChange = event => {          
    setCompanyId(event.target.value);    
  };


//Call API using GET Method
//   React.useEffect(() => {
//     fetch("/api/getdata")
//       .then((res) => res.json())
//       .then((data) => setData(data));  
//   }, []);

//Call API using POST Method
//var body={"noOfMonts": 6 , "bookingTypes": 'Tickets', "companyId": compid };  
//  const postRequest= React.useCallback(() => {   
//     fetch("/api/getgraphdata", 
//     {method: 'POST',
//     headers: { 'Content-Type': 'application/json',},
//     body: JSON.stringify(body),     
// }) 
//     .then((res) => res.json())
//     .then((data) => setData(data));              
// }, []); 

function fnGraphsData() {
    fetch("/api/getgraphdata", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"noOfMonts": 6 , "bookingTypes": 'Tickets', "companyId": compid })
      })
     .then((res) => res.json())
     .then((ticketsdata) => setTicketsData(ticketsdata)); 

     fetch("/api/getgraphdata", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"noOfMonts": 6 , "bookingTypes": 'Bookings', "companyId": compid })
      })
     .then((res) => res.json())
     .then((bookingsdata) => setBookingsData(bookingsdata)); 
}

  return (    
    <div className="linechart">    
        <div>
            <input type="radio" value="YTH" name="rbcompany" id="YTH" checked={compid === 'YTH'} onChange={handleChange}/> YTH
            <input type="radio" value="FTI" name="rbcompany" id="FTI"  checked={compid === 'FTI'} onChange={handleChange}/> FTI
            <input type="radio" value="WTT" name="rbcompany" id="WTT"  checked={compid === 'WTT'} onChange={handleChange}/> WTT
            <input type="radio" value="SYT" name="rbcompany" id="SYT"  checked={compid === 'SYT'} onChange={handleChange}/> SYT
            <input type="radio" value="FTN" name="rbcompany" id="FTN"  checked={compid === 'FTN'} onChange={handleChange}/> FTN
            <button onClick={fnGraphsData} type="submit" class="btn">Refresh</button>
        </div>
        <table>
            <tr>
                <td> {!ticketsdata ? "" : <Line data={ticketsdata} />}</td>
                <td> {!bookingsdata ? "" : <Bar data={bookingsdata} />}</td>
                </tr>
        </table>
    </div>
    
  );
};  
export default Dashboard;
 