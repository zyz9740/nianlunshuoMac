import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import {ActivityIndicator, InputItem, List} from "@ant-design/react-native";
import Button from 'apsl-react-native-button'

import {TextInputLayout} from 'rn-textinputlayout';
const Item = List.Item;

//日期格式化
Date.prototype.Format = function(formatStr)
{
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,(this.getMonth()+1)>9?this.getMonth().toString():'0' + (this.getMonth()+1));
    str=str.replace(/M/g,(this.getMonth()+1));

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
}

export default class Login extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            animating:false,
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    login(){
        // fetch(webRoot + "login", {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password,
        //         time: new Date().Format("yyyy/MM/dd"),
        //     })
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //         let isSuccess = responseJson.isSuccess;
        //         let userExist = responseJson.userExist;
        //         console.log("responseJson",responseJson);
        //         if(!userExist){     //如果用户不存在
        //             ToastAndroidTest.show("用户名不存在", ToastAndroidTest.SHORT);
        //             this.setState({
        //                 username:"",
        //                 password:"",
        //                 animating: !this.state.animating
        //             })
        //         }else if(!isSuccess){
        //             ToastAndroidTest.show("登陆异常", ToastAndroidTest.SHORT);
        //             this.setState({
        //                 username:"",
        //                 password:"",
        //                 ensure:"",
        //                 animating: !this.state.animating
        //             });
        //         }else {
        //             this.setState({animating: !this.state.animating});
        //             ToastAndroidTest.show("登陆成功", ToastAndroidTest.SHORT);
        //             this.props.navigation.state.params.onUserLogin(this.state.username);
        //             this.props.navigation.goBack()
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         ToastAndroidTest.show("您的用户名已被注册", ToastAndroidTest.SHORT);
        //         ToastAndroidTest.show("请重新输入", ToastAndroidTest.SHORT);
        //         this.setState({
        //             username:"",
        //             password:"",
        //             ensure:"",
        //             animating: !this.state.animating
        //         })
        //     });
    }

    //??为什么他用箭头函数不行？？？？
    _onPressSubmit(){
        // this.setState({animating: !this.state.animating});
        // //网络请求
        // this.login()
        // this.closeTimer = setTimeout(() => {
        //     this.setState({animating: !this.state.animating});
        //     ToastAndroidTest.show("登陆成功", ToastAndroidTest.SHORT);
        //     this.props.navigation.state.params.onUserLogin(this.state.username)
        //     this.props.navigation.goBack()
        // }, 5000);
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems: "center", justifyContent: "center",}}>
                    <Text style={{fontSize:20,marginVertical:10}}>用户登陆</Text>
                </View>
                <TextInputLayout
                    style={styles.inputLayout}
                    // checkValid={t => EMAIL_REGEX.test(t)}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'用户名'}
                        // onSubmitEditing={(event) => this.setState({username:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({username:value})}
                        value={this.state.username}
                    />
                </TextInputLayout>
                <TextInputLayout style={styles.inputLayout}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'密码'}
                        secureTextEntry={true}
                        // onSubmitEditing={(event) => this.setState({password:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({password:value})}
                        value={this.state.password}
                    />
                </TextInputLayout>
                <View style={styles.buttonLayout}>
                    <Button onPress={this._onPressSubmit.bind(this)} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>提交</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.goBack()} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>取消</Text>
                    </Button>
                </View>
                <ActivityIndicator
                    animating={this.state.animating}
                    toast
                    size="large"
                    text="正在登陆..."
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    buttonLayout:{
        marginVertical:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal: 30,
        backgroundColor:"#33A3F4",
        borderWidth:0,
    }
});
