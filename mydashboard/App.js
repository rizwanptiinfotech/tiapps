import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Alert, ScrollView } from 'react-native';

import { RadioButton } from 'react-native-paper';

import {
  LineChart
} from "react-native-chart-kit";
import React, {useState,setState} from 'react';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


const data ={
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [10, 45, 28, 30, 20, 43],     
      strokeWidth: 2 
    }
  ],
  legend: ["Rainy Days"] 
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => "#1E2923",
  strokeWidth: 2, 
  barPercentage: 0.5,
  useShadowColorFromDataset: false 
};



export default function App() {


  const [ticketsdata, setTicketsData] = React.useState(null);
  const [bookingsdata, setBookingsData] = React.useState(null);
  const [compid, setCompanyId] = useState('YTH');

  // const handleChange = event => {          
  //   setCompanyId(event.target.value);    
  // };



  function fnGraphsData() {
    fetch("http://10.0.21.41:3001/api/getgraphdata", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"noOfMonts": 6 , "bookingTypes": 'Tickets', "companyId": compid })
      })
     .then((response) => response.json())
     .then((ticketsdata) => setTicketsData(ticketsdata)); 

     

     fetch("http://10.0.21.41:3001/api/getgraphdata", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"noOfMonts": 6 , "bookingTypes": 'Bookings', "companyId": compid })
      })
     .then((response) => response.json())
     .then((bookingsdata) => setBookingsData(bookingsdata)); 

    //  Alert.alert("ticket" +  JSON.stringify(ticketsdata));
    // Alert.alert("booking" + JSON.stringify(bookingsdata));
}

  return (

    
    <View style={styles.container}>
 <ScrollView  verticle={true} >
    <RadioButton.Group onValueChange={newValue => setCompanyId(newValue)} value={compid}>
     <View style={{flexDirection:"column"}}>
       <RadioButton.Item label="YTH" value="YTH"/>
       <RadioButton.Item label="FTI" value="FTI" />
       <RadioButton.Item label="WTT" value="WTT" />
       <RadioButton.Item label="SYT" value="SYT" />
       <RadioButton.Item label="FTN" value="FTN" />
      </View>
    </RadioButton.Group>

    <Button
        title="Press me"
        onPress={() => fnGraphsData()}
      />
        {/* <div>
            <input type="radio" value="YTH" name="rbcompany" id="YTH" checked={compid === 'YTH'} onChange={handleChange}/> YTH
            <input type="radio" value="FTI" name="rbcompany" id="FTI"  checked={compid === 'FTI'} onChange={handleChange}/> FTI
            <input type="radio" value="WTT" name="rbcompany" id="WTT"  checked={compid === 'WTT'} onChange={handleChange}/> WTT
            <input type="radio" value="SYT" name="rbcompany" id="SYT"  checked={compid === 'SYT'} onChange={handleChange}/> SYT
            <input type="radio" value="FTN" name="rbcompany" id="FTN"  checked={compid === 'FTN'} onChange={handleChange}/> FTN
            <button onClick={fnGraphsData} type="submit" class="btn">Refresh</button>
        </div> */}

    <Text>Average 6 Months Tickets/Voucher</Text>
    {!ticketsdata ? "" :<LineChart data={ticketsdata} width={screenWidth} height={220} chartConfig={chartConfig} />}
    <Text>Average 6 Months Bookings</Text>
    {!bookingsdata ? "" :<LineChart data={bookingsdata} width={screenWidth} height={220} chartConfig={chartConfig}/>}
    <StatusBar style="auto" />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 2,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingRight:20,
    paddingLeft:20,
    paddingTop:50,
    paddingBottom:50,
  },
});
