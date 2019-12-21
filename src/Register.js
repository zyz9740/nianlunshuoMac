import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import { InputItem,List } from "@ant-design/react-native";
import Button from 'apsl-react-native-button'
import {ActivityIndicator,} from '@ant-design/react-native';



import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'

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


export default class Register extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            ensure:"",
            animating: false,
        }
    }

    //发起网络请求注册
    register(){
        // fetch(webRoot + "register", {
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
        //         console.log("isSuccess=",isSuccess)
        //         if(isSuccess) {
        //             this.setState({animating: !this.state.animating});
        //             ToastAndroidTest.show("注册成功！", ToastAndroidTest.SHORT);
        //             this.props.navigation.state.params.onUserLogin(this.state.username)
        //             this.props.navigation.goBack()
        //         }else{
        //             ToastAndroidTest.show("用户已存在", ToastAndroidTest.SHORT);
        //             this.setState({
        //                 username:"",
        //                 password:"",
        //                 ensure:"",
        //                 animating: !this.state.animating
        //             })
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         ToastAndroidTest.show("注册异常", ToastAndroidTest.SHORT);
        //     });
    }

    //??为什么他用箭头函数不行？？？？
    _onPressSubmit(){
        // // console.log("state:");
        // // console.log(this.state);
        // if(this.state.password !== this.state.ensure){
        //     ToastAndroidTest.show("两次输入密码不一致！", ToastAndroidTest.SHORT);
        //     ToastAndroidTest.show("请重新输入！", ToastAndroidTest.SHORT);
        //     this.setState({
        //         password:"",
        //         ensure:"",
        //     })
        // }else {
        //     this.setState({animating: !this.state.animating});
        //     this.register();
        //     // this.closeTimer = setTimeout(() => {
        //     //     this.setState({animating: !this.state.animating});
        //     //     ToastAndroidTest.show("登陆成功", ToastAndroidTest.SHORT);
        //     //     this.props.navigation.state.params.onUserRegister(this.state.username)
        //     //     this.props.navigation.goBack()
        //     // }, 5000);
        //     // this.props.onUserRegister(this.state.username);
        //     // console.log(this.props.navigation.state)
        //
        // }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems: "center", justifyContent: "center",}}>
                    <Text style={{fontSize:20,marginVertical:10}}>用户注册</Text>
                </View>
                {/*<TextInputLayout*/}
                {/*    style={styles.inputLayout}*/}
                {/*    // checkValid={t => EMAIL_REGEX.test(t)}*/}
                {/*>*/}
                    <TextInput
                        style={styles.textInput}
                        placeholder={'用户名'}
                        // onSubmitEditing={(event) => this.setState({username:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({username:value})}
                        value={this.state.username}
                    />
                {/*</TextInputLayout>*/}
                {/*<TextInputLayout style={styles.inputLayout}>*/}
                    <TextInput
                        style={styles.textInput}
                        placeholder={'密码'}
                        secureTextEntry={true}
                        // onSubmitEditing={(event) => this.setState({password:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({password:value})}
                        value={this.state.password}
                    />
                {/*</TextInputLayout>*/}
                {/*<TextInputLayout style={styles.inputLayout}>*/}
                    <TextInput
                        style={styles.textInput}
                        placeholder={'确认密码'}
                        secureTextEntry={true}
                        // onSubmitEditing={(event) => this.setState({password:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({ensure:value})}
                        value={this.state.ensure}
                    />
                {/*</TextInputLayout>*/}
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
                    text="正在注册..."
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
