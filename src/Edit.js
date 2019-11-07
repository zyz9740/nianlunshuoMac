import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, DatePickerAndroid} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Portal, Toast, Provider } from '@ant-design/react-native'

class Edit extends Component {
    static navigationOptions = {
        header: null,  
    };  

    constructor(props) {
        super(props);
        this.state = {
            end_year: JSON.stringify(this.props.navigation.getParam('end_year', '')),
            end_month: JSON.stringify(this.props.navigation.getParam('end_month', '')),
            end_day: JSON.stringify(this.props.navigation.getParam('end_day', '')),
            content: "",
            isDateTimePickerVisible: false,
        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            end_year: date.getFullYear(),
            end_month: date.getMonth()+1,
            end_day: date.getDate(),
        });
        console.log("A date has been picked: ", date);
        console.log(this.state.end_year);
        console.log(this.state.end_month);
        console.log(this.state.end_day);
        this.hideDateTimePicker();
    };

    
    _sendLetter = () =>{
        if(this.state.content.length === 0){
            console.log("空")
            Toast.info("不能发送空信件。", 1);
            return;
        }

        let formData = new FormData();
        let now = new Date();
        formData.append('start_year',now.getFullYear());
        formData.append('start_month', now.getMonth()+1);
        formData.append('start_day', now.getDate());
        formData.append('start_hour', now.getHours());
        formData.append('start_minute', now.getMinutes());
        formData.append('start_second', now.getSeconds());

        formData.append('end_year',this.state.end_year);
        formData.append('end_month', this.state.end_month);
        formData.append('end_day', this.state.end_day);
        formData.append('content', this.state.content);

        console.log(formData);
        fetch("http://49.235.93.122:8080/letter/",{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then((response) => {
            console.log(response)
            this.setState({
                content: "",
            })
            Toast.success("信件发送成功。", 1);
            // return response.json();
            let feedBack = this.props.navigation.getParam('feedBack', '');
            console.log(feedBack);
            feedBack();
            setTimeout(()=>{this.props.navigation.goBack()}, 1500);
            
        })
        .catch((error) => {
            console.error(error);
        });

    }

    render() {
        console.log(this.state);
        let now = new Date();
        return (
            <Provider>
                <View style={{backgroundColor:'#fefdfb', flex:1}}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={[{height:22,width:28,marginRight:30}]} onPress={this._sendLetter}>
                            <Image source={require("../images/edit/confirm.png")} style={[{height:22,width:28,marginRight:30}]}></Image>
                        </TouchableOpacity>
                        <Image source={require("../images/edit/more.png")} style={[{height:27,width:5,marginLeft:40,marginRight:10}]}></Image>
                    </View>
                    <TextInput style={{flex: 1, padding: 25, textAlignVertical: 'top', fontSize: 20}} 
                                autoFocus={true} placeholder="刻录你的年轮" multiline={true}  
                                onChangeText={text => {this.setState({content:text})}} value={this.state.content}/>
                    <View style={styles.flexStretch}>
                        <Image style={styles.border} source={require("../images/edit/template.png")} resizeMode="contain"></Image>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <Image style={styles.border} source={require("../images/edit/calendar.png")} resizeMode="contain"></Image>
                            <DateTimePicker
                              isVisible={this.state.isDateTimePickerVisible}
                              onConfirm={this.handleDatePicked}
                              onCancel={this.hideDateTimePicker}
                              mode={'date'}
                              maximumDate={now}
                            />
                        </TouchableOpacity>
                        <Image style={styles.border} source={require("../images/edit/list.png")} resizeMode="contain"></Image>
                        <Image style={styles.border} source={require("../images/edit/rollBack.png")} resizeMode="contain"></Image>
                        <Image style={styles.border} source={require("../images/edit/rollForward.png")} resizeMode="contain"></Image>
                        <Image style={styles.border} source={require("../images/edit/indentation.png")} resizeMode="contain"></Image>
                    </View>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    topBar:{
        backgroundColor: 'rgb(128, 194, 105)',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: 70,
        padding: 24,
    },
    flexStretch:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        // backgroundColor: "yellow",
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    border:{
        height: 20,
        width:  20,
    },
});

export default Edit;
