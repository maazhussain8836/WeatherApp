// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, {useEffect, useState} from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const axios = require('axios').default;
  const [CityArray, setCityArray] = useState([
    'Multan',
    'Karachi',
    'Quetta',
    'Islamabad',
    'pune',
  ]);
  const [cityData, setCityData] = useState([]);
  const [inputCity, setInputCity] = useState([]);

  let inputCitya;
  useEffect(() => {
    getCities();
  }, []);

  const getCities = () => {
    let cities = [];
    CityArray.map((v, i) => {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=2a32bf0e8c3b4d33819112523220808&q=${v}`,
        )
        .then(res => {
          cities.push(res.data);
          setCityData([...cities]);
        });
    });
  };
  
  useEffect(() => {
    getCities();
  }, [CityArray]);

  const Add = () => {
    setCityArray([...CityArray, inputCitya]);
    setInputCity(inputCitya);
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Text style={styles.introTitleStyle}>
          {item?.location?.name} , {item?.location?.country}
        </Text>
        <Text style={{...styles.introTitleStyle, fontSize: 24, marginTop: 5}}>
          Today
        </Text>
        <Image
          source={{uri: `https:${item?.current?.condition?.icon}`}}
          style={styles.introImageStyle}
        />
        <Text
          style={{
            ...styles.introTitleStyle,
            fontSize: 70,
            marginTop: 10,
            marginLeft: 30,
          }}>
          {item?.current?.temp_c}°{' '}
        </Text>
        {/* 
        <Text style={styles.introTextStyle}>
          {' '}
          {item?.current?.condition?.text}
        </Text> */}
        <View
          style={{
            // flex:1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5%',
            paddingVertical: '10%',
            borderRadius: 30,
            padding: '3%',
            backgroundColor: '#FFF',
          }}>
          <Text style={styles.slider}>
            Humidity {'\n'} {item?.current?.humidity}
          </Text>
          <Text style={styles.slider}>
            Feels Like {'\n'} {item?.current?.feelslike_c}
          </Text>
          <Text style={styles.slider}>
            Wind KPH {'\n'} {item?.current?.wind_kph}
          </Text>
          {/* <Text style={styles.slider}>Latitude {'\n'} {item?.location?.lat} </Text> */}
          {/* <Text style={styles.slider}>Longitude {'\n'} {item?.location?.lon} </Text> */}
        </View>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip from any slide or
              Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#2f3644',
          }}>
          <TextInput
            placeholder="Enter City "
            style={styles.inputStyle}
            value={inputCitya}
            onChangeText={e => {
              inputCitya = e;
            }}
          />
          <TouchableOpacity style={styles.button} onPress={Add}>
            <View>
              <Text>Check Weather</Text>
            </View>
          </TouchableOpacity>
          <AppIntroSlider data={cityData} renderItem={RenderItem} />
        </View>
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#FFF',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    paddingLeft: '5%',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '30%',
    // paddingHorizontal:'20%',
    // paddingVertical:1,
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slider: {
    // padding: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f3644',
  },
  introImageStyle: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: '2%',
  },
  introTextStyle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
  },
  introTitleStyle: {
    textAlign: 'center',
    marginTop: '15%',
    fontSize: 28,
    color: '#CED1D6',
    marginVertical: 2,
    fontWeight: '600',
  },
  inputEl: {
    color: '#FFF',
    // borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#FFF',
    marginVertical: '5%',
    padding: 5,
    paddingHorizontal: '4%',
    marginHorizontal: '3%',
    width: '80%',
  },
  Vweather: {
    // flex: 1,
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'gray',
    marginVertical: '5%',
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 25,
    marginVertical: 5,
    fontWeight: '600',
  },
});

// const slides = [
//   {
//     key: 's1',
//     text: `jfklhkf `,
//     title: 'Karachi , Pakistan ',
//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
//   {
//     key: 's2',
//     title: 'Islamabad, Pakistan ',

//     text: 'Upto 25% off on Domestic Flights',

//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
//   {
//     key: 's3',
//     title: 'Lahore, Pakistan ',

//     text: 'Enjoy Great offers on our all services',
//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
//   {
//     key: 's4',
//     title: 'Quetta, Pakistan ',

//     text: ' Best Deals on all our services',
//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
//   {
//     key: 's5',
//     title: 'Rawalpindi, Pakistan ',

//     text: 'Enjoy Travelling on Bus with flat 100% off',
//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
//   {
//     key: 's6',
//     title: 'Multan, Pakistan ',

//     text: ' 10% off on first Train booking',
//     image: {
//       uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
//     },
//     // backgroundColor: '#2F3542',
//   },
// ];
