import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import { InputItem,List,Toast } from "@ant-design/react-native";
import Button from 'apsl-react-native-button'
import {ActivityIndicator,} from '@ant-design/react-native';
import {TextInputLayout} from 'rn-textinputlayout';

const utils = require("./utils")

const Item = List.Item;


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
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        console.log("[REQUEST]:\tregister\tvia /letter/signin/.");

        fetch(utils.webroot + "/letter/signin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("[RESPONSE]:\t200\t/letter/signin: ", responseJson);
                let isSuccess = responseJson.isSuccess;
                if(isSuccess) {
                    this.setState({animating: !this.state.animating});
                    Toast.success("注册成功！", 1000);
                    this.props.navigation.state.params.onUsernameChange(this.state.username, responseJson.userId)
                    this.props.navigation.goBack()
                }else{
                    Toast.fail("用户已存在", 1000);
                    this.setState({
                        username:"",
                        password:"",
                        ensure:"",
                        animating: !this.state.animating
                    })
                }
            })
            .catch((error) => {
                console.error(error);
                Toast.fail("注册异常", 1000);
            });
    }

    _onPressSubmit(){

        if(this.state.password !== this.state.ensure){
            Toast.info("两次输入密码不一致！", 1000);
            Toast.info("请重新输入！", 1000);
            this.setState({
                password:"",
                ensure:"",
            })
        }else {
            this.setState({animating: !this.state.animating});
            this.register();
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems: "center", justifyContent: "center",}}>
                    <Text style={{fontSize:20,marginVertical:10}}>用户注册</Text>
                </View>
                <TextInputLayout
                    style={styles.inputLayout}
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
                <TextInputLayout style={styles.inputLayout}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'确认密码'}
                        secureTextEntry={true}
                        // onSubmitEditing={(event) => this.setState({password:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({ensure:value})}
                        value={this.state.ensure}
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
