import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, FlatList, TouchableOpacity} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";


class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            letterCount: 0,
            letterList: [],
        }
        this._fetchData();
    }


    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
        this.props.navigation.navigate('Edit',{
            end_year: date.getFullYear(),
            end_month: date.getMonth()+1,
            end_day: date.getDate(),
            feedBack: this._fetchData,
        });
    };

    _fetchData = () => {
        console.log("fetch data from /letter");
        fetch("http://49.235.93.122:8080" + "/letter")
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            // console.log(responseJson);
            this.setState(responseJson);        
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        // this._fetchData();
        let letterList = this.state.letterList.map((item, index) => this.renderLetter(item, index));
        let now = new Date();
        return (
            <View style={{backgroundColor:'#fefdfb', flex:1}}>
                <View style={styles.topBar}>
                    <View style={styles.flexStart}>
                        <Image source={require("../images/home/status.png")} style={[{height:34,width:34,marginRight:30}]}></Image>
                        <Text style={{fontSize:20,color:'white'}}>{now.getMonth()+1}月{now.getDate()}日</Text>
                    </View>
                    <View style={styles.flexStart}>
                        <Image source={require("../images/home/search.png")} style={{height:25,width:25}}></Image>
                        <Image source={require("../images/home/more.png")} style={{height:27,width:5,marginLeft:40,marginRight:10}}></Image>
                    </View>
                </View>
                
                <FlatList data={this.state.letterList} renderItem={({item}) => this.renderLetter(item)} 
                            // keyExtractor={(item, index) => item.id}
                            ListHeaderComponent={
                                <View style={[styles.flexCenter,{marginTop: 20}]}>
                                    <Text style={{fontSize: 16}}>—— 当前已有 {this.state.letterCount} 封信件 ——</Text>
                                </View>}
                            ListFooterComponent={
                                 <View style={[styles.flexCenter,{marginBottom: 20}]}>
                                    <Text style={{fontSize: 16}}>—— 完 ——</Text>
                                </View>}                               
                            />
                <TouchableOpacity onPress={this.showDateTimePicker} style={{position: 'absolute',bottom: 35,right: 37,}}>
                    <View style={[styles.flexCenter, styles.textBg]}>
                        <Image source={require("../images/home/send.png")} style={{height:48 ,width:56}}></Image>
                    </View>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                      mode={'date'}
                      maximumDate={now}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderLetter(item){
        // console.log(item);
        return (
            <View style={{justifyContent: "space-between",alignItems: "flex-start",flexDirection: 'row', 
                            paddingRight: 20, paddingLeft: 30, paddingVertical:20, width: '100%'}}>
                <View style={{justifyContent: "center",alignItems: "flex-start",flexDirection: 'column', marginRight:30, marginTop: 30}}>
                    <View style={{justifyContent: "center",alignItems: "center",flexDirection: 'column'}}>
                        <Text style={{fontSize: 18}}>{item.from[0]}</Text>
                        <Text style={{fontSize: 14}}>{item.from[1]}/{item.from[2]}</Text>
                    </View>
                    <Image source={require("../images/home/down.png")} style={{height: 16, width: 13, margin: 15}}></Image>
                    <View style={{justifyContent: "center",alignItems: "center",flexDirection: 'column'}}>
                        <Text style={{fontSize: 18}}>{item.to[0]}</Text>
                        <Text style={{fontSize: 14}}>{item.to[1]}/{item.to[2]}</Text>
                    </View>
                </View>
                <View style={{height: 240, width: 280, backgroundColor: "#fffcd8", padding: 26}}>
                    <Text style={{fontSize: 16}}>{item.content}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    flexCenter: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row'
    },
    topBar:{
        backgroundColor: 'rgb(128, 194, 105)',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: 70,
        padding: 24,
    },
    flexStart:{
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    flexBetween: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row'
    },
    textBg: {
        height: 95,
        width:  95,
        backgroundColor: 'rgb(128, 194, 105)',
        borderRadius: 85,
        
    }
});

export default Home;
