import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Picker, Switch} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Portal, Toast, Provider,Button } from '@ant-design/react-native'

const utils = require('./utils');

class Edit extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            end_year:   JSON.stringify(this.props.navigation.getParam('end_year', '')),
            end_month:  JSON.stringify(this.props.navigation.getParam('end_month', '')),
            end_day:    JSON.stringify(this.props.navigation.getParam('end_day', '')),
            content:    "",
            title:      "",
            tag:        "",
            tags:       [],
            font:       "",
            isSecret:   false,
            //state
            isDateTimePickerVisible: false,
            isTagEditBarVisible:  false,
            isFontPickerVisible: false,
            isSecretSwitchVisible: false,
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
        let content = this.state.content;
        content = content.trim();
        let title = this.state.title;
        title = title.trim();
        if(content.length === 0){
            console.log("[INFO]\t\t content is empty.");
            Toast.info("不能发送空信件。", 1);
            return;
        }
        if(title.length === 0){
            console.log("[INFO]\t\t title is empty.");
            Toast.info("不能发送标题为空的信件。", 1);
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
        formData.append('title', this.state.title);
        formData.append('tags', this.state.tags.toString());
        formData.append('userId', this.props.navigation.state.params.userId);
        formData.append('isSecret', this.state.isSecret);

        console.log(formData);
        fetch(utils.webroot + '/letter/',{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then((response) => {
            if(response.status === 200) {
                console.log("[RESPONSE]:\t200\t/letter(post): ", response.ok);
                this.setState({
                    content: "",
                    title: "",
                });
                Toast.success("信件发送成功。", 1);
                let fresh = this.props.navigation.getParam('fresh', '');
                fresh();
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 1500);
            }else{
                throw "[RESPONSE]:\t" + response.status.toString() + "\t/letter: ..."
            }
        })
        .catch((error) => {
            console.error(error);
        });

    };

    _addTag = () => {
        let tag = this.state.tag.trim();
        let tags = this.state.tags;
        if(tag.length === 0) {
            Toast.fail("标签不能为空")
        } else if(tag.length > 7) {
            Toast.fail("标签的长度不得超过7个字");
        } else if(tags.length > 2){
            Toast.fail("最多只能添加三个标签");
        } else {
            tags.push(tag);
            this.setState({
                tags: tags,
            });
            Toast.success("标签添加成功")
            console.log("[UPDATE]:\t\tupdate tags to", tags)
        }
        this.setState({
            tag: "",
            isTagEditBarVisible: false,
        });
    };

    render() {
        let now = new Date();
        let tags = this.state.tags.map((content) =>
            <Text style={{fontSize: 18, color: 'black', backgroundColor: "#E8E8E8",fontFamily:this.state.font,
                paddingVertical: 8, paddingHorizontal: 10, marginRight: 10, marginVertical: 5}}>
                {content}
            </Text>
        );
        return (
            <Provider>
                <View style={{backgroundColor:'#fefdfb', flex:1}}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={[{height:22,width:28,marginRight:30}]} onPress={this._sendLetter}>
                            <Image source={require('../images/edit/confirm.png')} style={[{height: 22, width: 28, marginRight: 30}]}/>
                        </TouchableOpacity>
                        <Image source={require('../images/edit/more.png')} style={[{height: 27, width: 5, marginLeft: 40, marginRight: 10}]}/>
                    </View>
                    <TextInput style={{flex: 2, paddingHorizontal: 25, textAlignVertical: 'top', fontSize: 26, fontFamily:this.state.font}}
                               autoFocus={true} placeholder="请输入标题" multiline={false}
                               onChangeText={text => {this.setState({title:text})}} value={this.state.title}/>
                    <TextInput style={{flex: 8, padding: 25, textAlignVertical: 'top', fontSize: 20, fontFamily:this.state.font}}
                                autoFocus={false} placeholder="刻录你的年轮" multiline={true}
                                onChangeText={text => {this.setState({content:text})}} value={this.state.content}/>
                    <View style={{position: 'absolute', bottom: 0,flexDirection: 'column', width: "100%"}}>
                        {this.state.isTagEditBarVisible ?
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <TextInput style={{paddingHorizontal: 25, textAlignVertical: 'top', fontSize: 16}}
                                           placeholder="请输入要添加的标签（不超过7个字）" multiline={false}
                                           onChangeText={text => {
                                               this.setState({tag: text})
                                           }} value={this.state.tag}/>
                                <Text style={{ backgroundColor: 'rgb(128, 194, 105)', height: 30, width: 50, marginHorizontal: 20,
                                                textAlign: 'center', textAlignVertical: 'center', color: 'white', fontSize: 16,
                                                fontFamily:this.state.font }}
                                      onPress={this._addTag}>
                                    确认
                                </Text>
                            </View>
                            :
                            <View style={{justifyContent:"flex-start", alignItems: "center", flexDirection: 'row',
                                paddingHorizontal: 10, flexWrap: "wrap"}}>
                                {tags}
                            </View>
                        }
                        {this.state.isFontPickerVisible ?
                            <Picker
                                selectedValue={this.state.font}
                                style={{height: 50, width: '100%', paddingHorizontal: 25}}
                                mode={'dropdown'}
                                prompt={"选择字体"}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        font: itemValue,
                                        isFontPickerVisible: false,
                                    })
                                }>
                                <Picker.Item label="康熙字典体" value="kangxi" />
                                <Picker.Item label="普通字体" value="" />
                                <Picker.Item label="清刻悦宋本" value="yuesong" />
                                <Picker.Item label="灵动" value="Qute" />
                            </Picker>
                            : null
                        }
                        {this.state.isSecretSwitchVisible ?
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Text style={{fontSize: 18}}>是否私有 </Text>
                                    <Switch onValueChange={() => {this.setState({isSecret: !this.state.isSecret})}}
                                            value={this.state.isSecret} />
                                </View>
                                <Text style={{ backgroundColor: 'rgb(128, 194, 105)', height: 30, width: 50, textAlign: 'center',
                                    textAlignVertical: 'center', color: 'white', fontSize: 16, fontFamily:this.state.font }}
                                onPress={() => {this.setState({isSecretSwitchVisible: false})}}>
                                确认
                                </Text>
                            </View>
                            : null
                        }
                        <View style={styles.flexStretch}>
                            <TouchableOpacity onPress={() => this.setState({isTagEditBarVisible: true})}>
                                <Image style={styles.border} source={require('../images/edit/tag.png')} resizeMode="contain"/>
                            </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => this.setState({isFontPickerVisible: true})}>
                                <Image style={styles.border} source={require('../images/edit/font.png')} resizeMode="contain"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({isSecretSwitchVisible: true})}>
                                <Image style={styles.border} source={require('../images/edit/secret.png')} resizeMode="contain"/>
                            </TouchableOpacity>
                            <Image style={styles.border} source={require("../images/edit/rollForward.png")} resizeMode="contain"></Image>
                            <Image style={styles.border} source={require("../images/edit/indentation.png")} resizeMode="contain"></Image>
                        </View>
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
        // backgroundColor: "yellow",
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    border:{
        height: 20,
        width:  20,
    },
});

export default Edit;
