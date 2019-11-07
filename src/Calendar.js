import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert, DatePickerAndroid} from 'react-native';

class Calender extends Component {
    static navigationOptions = {
        header: null,  
    }; 
    render(){
      return(
        <View style={style.container}>
          <Button


        </View>

      );

    }
    render() { 
      return (
          <View style={styles.container}>
        <Button
          title='日期对话框'
          onPress={() => {
            DatePickerAndroid.open()
              .then(({ action, year, month,day }) => {
                if (action !== TimePickerAndroid.dismissedAction) { 
                  Alert.alert(year + '/' + month+'/'+day);
                }
            })
          }}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },