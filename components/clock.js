import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { Card } from 'react-native-paper';


export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
    };
  }
  update = () => {
    this.setState({ time: new Date() });
  };
  componentDidMount() {
    setInterval(this.update, 1000);
  }
  render() {
    return (
      <View>
        
          <Text style={styles.textStyle}>
            {this.state.time.toLocaleTimeString('en-US')}
          </Text>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  textStyle: {
    paddingVertical:10,
    textAlign: 'center',
    fontSize: 25,
    color: 'black'
   
  
    
  
  
    
  }
});
