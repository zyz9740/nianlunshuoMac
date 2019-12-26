import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, FlatList, TouchableOpacity} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Icon, List} from "@ant-design/react-native";

// import {setCustomText} from 'react-native-global-props';
import Drawer from 'react-native-drawer'

import Menu from "./Menu"

const utils = require("./utils");
// setCustomText({style: {fontFamily: 'yuesong'}});

class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            //data
            letterCount: 0,
            letterList: [],
            filter:{
                from:   "",
                to:     "",
                tag:    "",                // only one tag can be searched at one time
            },
            username:   "",
            userId:     -1,
            //state
            isDateTimePickerVisible: false,
            dateTimePickerType: "",              // the type of dateTime, type is one of ["", "navigation", "pickFrom", "pickTo"]
            refreshing: true
        };
        this._fetchData();
    }

    _closeDrawer = () => {
        this._drawer.close()
    };
    _openDrawer = () => {
        this._drawer.open()
    };

    // use the tag(string) to update filter.tags
    _setTag = (tag) => {
        let filter = this.state.filter;
        filter.tag = tag;
        this.setState({
            filter: filter
        });
        console.log("[UPDATE]:\t\tupdate filter.tag to", tag)
    };



    _fetchData = () => {
        console.log("[REQUEST]:\tget all letters\tvia /letter.");
        console.log(this.state);
        fetch(utils.webroot + "/letter/?from=" + this.state.filter.from +
            '&to=' + this.state.filter.to +'&tag=' + this.state.filter.tag + '&userId=' + this.state.userId)
        .then((response) => {
            if(response.status === 200)
                return response.json();
            else
                throw "[RESPONSE]:\t" + response.status.toString() + "\t/letter: ..."
        })
        .then((responseJson) => {
            console.log("[RESPONSE]:\t200\t/letter: ", responseJson);
            this.setState({
                letterCount: responseJson.letterCount,
                letterList: responseJson.letterList,
                refreshing: false
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                refreshing: false
            });
        });
    };

    _initFilter = () => {
        let filter = {from: "", to: "", tag: ""};
        this.setState({filter: filter, refreshing: true}, this._fetchData);
    }

    onUsernameChange = (username, userId) => {
        this.setState({
            username: username,
            userId: userId,
        });
        console.log("[UPDATE]:\t\tupdate username to", username);
        console.log("[UPDATE]:\t\tupdate userId to", userId);
    }


    render() {
        // this._fetchData();
        // let letterList = this.state.letterList.map((item, index) => this.renderLetter(item, index));
        let now = new Date();
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<Menu
                    navigation={this.props.navigation}
                    username={this.state.username}
                    onUsernameChange={this.onUsernameChange}
                />}
                openDrawerOffset={0.3}
                tapToClose={true}

            >
                <View style={{backgroundColor:'#f8f8f8', flex:1}}>
                    <View style={styles.topBar}>
                        <View style={styles.flexStart}>
                            <TouchableOpacity onPress={this._openDrawer}>
                                <Image source={require('../images/home/setting.png')} style={[{height: 34, width: 34, marginRight: 30}]}/>
                            </TouchableOpacity>
                            <Text style={{fontSize:20,color:'white'}}>{now.getMonth()+1}月{now.getDate()}日</Text>
                        </View>
                        <View style={styles.flexStart}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Search', {
                                    setTag: this._setTag,
                                    fresh: this._fetchData,
                                })}}>
                                <Image source={require('../images/home/search.png')} style={{height: 25, width: 25}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._initFilter}>
                                <Image source={require('../images/home/refresh.png')}
                                       style={{height: 25, width: 25, marginLeft: 40, marginRight: 10}}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row",justifyContent: "space-around",alignItems: "center",
                                    maxHeight: 60,padding: 20, backgroundColor: 'white'}}>
                        <Text style={{fontSize: 16}}>送往日期</Text>
                        <TouchableOpacity onPress={() => {this.setState({dateTimePickerType: "pickFrom"});this.showDateTimePicker()}} >
                            <Text style={{fontSize: 16, backgroundColor: "#f8f8f8", paddingVertical: 5, paddingHorizontal:15 }}>
                                {this.state.filter.from ? this.state.filter.from : '盘古开天辟地'}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 16}}>至</Text>
                        <TouchableOpacity onPress={() => {this.setState({dateTimePickerType: "pickTo"});this.showDateTimePicker()}} >
                            <Text style={{fontSize: 16, backgroundColor: "#f8f8f8", paddingVertical: 5, paddingHorizontal:15}}>
                                {this.state.filter.to ?
                                    this.state.filter.to :
                                    new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate()
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={this.state.letterList} renderItem={({item}) => this.renderLetter(item)}
                                keyExtractor={(item, index) => item.id}
                                ListHeaderComponent={
                                    <View style={[styles.flexCenter,{marginTop: 20}]}>
                                        <Text style={{fontSize: 16}}>—— 当前已有 {this.state.letterCount} 封信件 ——</Text>
                                    </View>}
                                ListFooterComponent={
                                     <View style={[styles.flexCenter,{marginBottom: 20}]}>
                                        <Text style={{fontSize: 16
                                        }}>—— 完 ——</Text>
                                    </View>}
                                onRefresh={() => {this._fetchData()}}
                                refreshing={this.state.refreshing}
                                />
                    <TouchableOpacity onPress={() => {this.setState({dateTimePickerType: "navigation"});this.showDateTimePicker()}}
                                        style={{position: 'absolute',bottom: 35,right: 37,}}>
                        <View style={[styles.flexCenter, styles.textBg]}>
                            <Image source={require('../images/home/send.png')} style={{height: 48, width: 56}}/>
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
            </Drawer>
        );
    }

    // letter的render策略：
    // 每次fetchData调取某个固定数量的信件，比如10.
    // 当距离页面底部不远的时候，再次fetchData，填充letterList

    renderLetter(item){
        let tagContents = item.tags;
        let tags = tagContents.map((content) =>
            <Text style={{fontSize: 16, color: 'black', backgroundColor: "#E8E8E8",
                        paddingVertical: 5, paddingHorizontal: 12, marginRight: 15, marginVertical: 5}}>
                {content}
            </Text> );
        return (
            <View style={{justifyContent: "space-between",alignItems: "center",flexDirection: 'row', flex: 1,
                            paddingLeft: 30, paddingVertical:20, width: '100%'}} key={item}>
                <View style={{justifyContent: "center",alignItems: "center",flexDirection: 'column', marginRight:30, flex: 2}}>
                    <View style={{justifyContent: "center",alignItems: "center",flexDirection: 'column'}}>
                        <Text style={{fontSize: 18}}>{item.from[0]}</Text>
                        <Text style={{fontSize: 14}}>{item.from[1]}/{item.from[2]}</Text>
                    </View>
                    <Image source={require('../images/home/down.png')} style={{height: 16, width: 13, margin: 5}}/>
                    <View style={{justifyContent: "center",alignItems: "center",flexDirection: 'column'}}>
                        <Text style={{fontSize: 18}}>{item.to[0]}</Text>
                        <Text style={{fontSize: 14}}>{item.to[1]}/{item.to[2]}</Text>
                    </View>
                </View>

                <View style={{/*minHeight: 160, */backgroundColor: "white", padding: 20, flex: 8}}>
                    <Text style={{fontSize: 18, color: "#2B1301", marginBottom: 10}} >{item.title}</Text>
                    <Text style={{fontSize: 16,marginBottom: 20}}>{item.content}</Text>
                    <View style={{justifyContent: "flex-start",alignItems: "center",flexDirection: 'row',flexWrap: "wrap"}}>
                        {tags}
                    </View>
                </View>
            </View>
        )
    }


    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({
            isDateTimePickerVisible: false,
            dateTimePickerType: "",
        });
    };

    handleDatePicked = date => {
        let filter = this.state.filter;
        switch(this.state.dateTimePickerType){
            case "navigation":
                // console.log("A date has been picked: ", date);
                this.hideDateTimePicker();
                this.props.navigation.navigate('Edit',{
                    end_year: date.getFullYear(),
                    end_month: date.getMonth()+1,
                    end_day: date.getDate(),
                    fresh: this._fetchData,
                    userId: this.state.userId,
                });
                break;
            case "pickFrom":
                filter.from = utils.encodeDate(date)
                this.setState({
                    filter: filter,
                })
                this._fetchData()
                this.hideDateTimePicker()
                break;
            case "pickTo":
                filter.to = utils.encodeDate(date)
                this.setState({
                    filter: filter,
                })
                this._fetchData();
                this.hideDateTimePicker()
                break;
        }

    };
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
        maxHeight: 60,
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

    },
    yuesong:{
        fontFamily: 'yuesong'
    },
});

export default Home;
