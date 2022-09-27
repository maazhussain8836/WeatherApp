import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// 2a32bf0e8c3b4d33819112523220808
// use effect is used for getting api during reloading
const Weather = () => {
  const axios = require('axios').default;
  //   const city='Karachi'
  const [city, setCity] = useState('');
  const [data, setData] = useState('No updates Yet');
  const onPressButton = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=2a32bf0e8c3b4d33819112523220808&q=${city}`,
      )
      .then(res => {
        setData(res.data);
        console.log('Api fetched');
          console.log(res.data);
        //   console.log(res.data.location.name);
        //   console.log(res.data.current.last_updated);
        //   console.log(res.data.current.temp_c);
        //   console.log(res.data.current.humidity);
        //   console.log(res.data.current.condition.text);
        // console.log(res.data.current.condition.icon);
      });
  };
  return (
    <View style={{flex: 1,backgroundColor:'#2F3542'}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={styles.inputEl}>
          <TextInput
          selectionColor={'#000'}
          placeholder="Enter Location"
          
          value={city}
          placeholderTextColor="#FFF"
          onChangeText={e => setCity(e)}
        />
          </View>
          <View>
      <TouchableOpacity  onPress={onPressButton}>
        <AwesomeIcon
          name="search"
          size={30}
          color="#CCCCCC"
        />
        </TouchableOpacity>
          </View>
        </View>
     
        <View style={styles.Vweather}>
          <Image
            source={{uri: `http:${data?.current?.condition?.icon}`}}
            style={styles.logo}
          />
          <Text style={styles.textStyle}>  {data?.location?.country} </Text>
          <Text style={styles.textStyle}>  {data?.location?.name} </Text>
          <Text style={styles.textStyle}>{data?.current?.last_updated} </Text>
          <Text style={styles.textStyle}> {data?.current?.temp_c} °C </Text>
          <Text style={styles.textStyle}> {data?.current?.humidity} % </Text>
          <Text style={styles.textStyle}> {data?.current?.condition?.text} </Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  inputEl: {
    color:'#FFF',
    // borderWidth: 1,
    borderRadius: 50,
    backgroundColor:'#FFF',
    marginVertical: '2%',
    padding: 5,
    paddingHorizontal:'4%',
    marginHorizontal: '3%',
    width: '80%',
  },
  Vweather: {
    // flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: '5%',
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  logo: {
    width: 166,
    height: 158,
    opacity:0.9
  },
  textStyle:{
    color:'#FFFFFF',
    fontSize:35,
    fontWeight:'bold'
  }
});
export default Weather;
