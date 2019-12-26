import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Button from 'apsl-react-native-button';
import {List} from '@ant-design/react-native';

const Item = List.Item;

class Menu extends Component{
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

    }



    render(){
        return(
            <View>
                <View style={{height: 40, flexDirection: "row", backgroundColor:"#d77484", justifyContent: "space-between",
                    alignItems: "center", padding: 30, width: '100%'}}>
                    <Text style={{color: "#d77484"}}>占位</Text>
                    <Text style={{color: "white"}}>配置</Text>
                    { this.props.username ? <Text style={{color: "white"}} onPress={() => {
                        this.props.onUsernameChange("", -1);
                    }}>登出</Text> :
                    <Text style={{color: "#d77484"}}>占位</Text>}
                </View>
                <View style={{backgroundColor:"#d77484", justifyContent: "flex-start", alignItems: "center",
                    height: 180, flexDirection: "column", paddingTop: 10}}>
                    <Image style={{height:75, width:75, borderRadius: 75, backgroundColor:"white"}}
                           source={require("../images/home/avatar.jpg")} />
                    {this.props.username ?
                        // 如果已经登陆
                        <Text style={{marginTop: 30, color: "white"}}>{this.props.username}</Text> :
                        //如果没有登陆
                        <View style={{flexDirection: "row",marginVertical:15, alignItems:"center"}}>
                            <Button onPress={() => {
                                this.props.navigation.navigate("Login",
                                    { onUsernameChange: this.props.onUsernameChange})
                            }}
                                    style={{paddingHorizontal:20, marginHorizontal: 30, backgroundColor:"#a16a72", borderWidth:0,}}
                                    textStyle={{fontSize: 18}}>
                                <Text style={{color: "white"}}>登陆</Text>
                            </Button>
                            <Button onPress={() => {
                                this.props.navigation.push("Register",
                                    { onUsernameChange: this.props.onUsernameChange })
                            }}
                                    style={{paddingHorizontal:20, marginHorizontal: 10, backgroundColor:"#a16a72", borderWidth:0,}}
                                    textStyle={{fontSize: 18}}>
                                <Text style={{color: "white"}}>注册</Text>
                            </Button>
                        </View>
                    }
                </View>
                <View>
                    <List>
                        {/*<Item*/}
                        {/*    thumb={*/}
                        {/*        <Image source={require("../images/home/font.png")}*/}
                        {/*               style={{height:20,width:20,marginRight:20}}*/}
                        {/*               resizeMode={"contain"}/>}*/}
                        {/*    arrow="horizontal"*/}
                        {/*    key="1"*/}
                        {/*    onPress={() => this.props.navigation.push('Statistics',{*/}
                        {/*        'plan':this.state.plan,*/}
                        {/*        'username':this.state.username,*/}
                        {/*    })}*/}
                        {/*>*/}
                        {/*    字体更改*/}
                        {/*</Item>*/}
                        {/*<Item*/}
                        {/*    thumb={*/}
                        {/*        <Image source={require("../images/home/letter.png")}*/}
                        {/*               style={{height:20,width:20,marginRight:20}}*/}
                        {/*               resizeMode={"contain"}/>}*/}
                        {/*    arrow="horizontal"*/}
                        {/*    key="2"*/}
                        {/*    onPress={this.showPicker}*/}
                        {/*>*/}
                        {/*    我的信件*/}
                        {/*</Item>*/}
                        <Item
                            thumb={
                                <Image source={require("../images/home/about.png")}
                                       style={{height:20,width:20,marginRight:20}}
                                       resizeMode={"contain"}/>}
                            arrow="horizontal"
                            key="3"
                        >
                            关于
                        </Item>
                    </List>
                </View>
            </View>
        )
    }
}

export default Menu
