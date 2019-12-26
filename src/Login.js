import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import {ActivityIndicator, InputItem, List, Toast} from "@ant-design/react-native";
import Button from 'apsl-react-native-button'

import {TextInputLayout} from 'rn-textinputlayout';
const Item = List.Item;

const utils = require("./utils")

export default class Login extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            animating:false,
        }
    }


    login(){
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);

        console.log("[REQUEST]:\tlogin\tvia /letter/login.");

        fetch( utils.webroot + "/letter/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                let isSuccess = responseJson.isSuccess;
                let userExist = responseJson.userExist;
                console.log("[RESPONSE]:\t200\t/letter/login: ", responseJson);

                if(!userExist){     //如果用户不存在
                    Toast.info("用户名不存在", 1000);
                    this.setState({
                        username:"",
                        password:"",
                        animating: !this.state.animating
                    })
                }else if(!isSuccess){
                    Toast.fail("登陆异常", 1000);
                    this.setState({
                        username:"",
                        password:"",
                        ensure:"",
                        animating: !this.state.animating
                    });
                }else {
                    this.setState({animating: !this.state.animating});
                    Toast.info("登陆成功", 1000);
                    this.props.navigation.state.params.onUsernameChange(this.state.username, responseJson.userId);
                    this.props.navigation.goBack()
                }
            })
            .catch((error) => {
                console.error(error);
                Toast.fail("您的用户名已被注册", 1000);
                Toast.fail("请重新输入", 1000);
                this.setState({
                    username:"",
                    password:"",
                    ensure:"",
                    animating: !this.state.animating
                })
            });
    }

    _onPressSubmit(){
        this.setState({animating: !this.state.animating});
        //网络请求
        this.login();
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
