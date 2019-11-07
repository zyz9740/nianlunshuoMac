import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput} from 'react-native';

class Edit extends Component {
    static navigationOptions = {
        header: null,  
    };  

    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }


    _sendLetter = () =>{
        let formData = new FormData();
        let now = new Date();
        formData.append('start_year',now.getFullYear());
        formData.append('start_month', now.getMonth()+1);
        formData.append('start_day', now.getDate());
        formData.append('end_year',now.getFullYear());
        formData.append('end_month', now.getMonth()+1);
        formData.append('end_day', now.getDate());
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
            // return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
    }


    render() {
        return (
            <View style={{backgroundColor:'#fefdfb', flex:1}}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={[{height:22,width:28,marginRight:30}]} onPress={this._sendLetter}>
                        <Image source={require("../images/edit/confirm.png")} style={[{height:22,width:28,marginRight:30}]}></Image>
                    </TouchableOpacity>
                    <Image source={require("../images/edit/more.png")} style={[{height:27,width:5,marginLeft:40,marginRight:10}]}></Image>
                </View>
                <TextInput style={{flex: 1, padding: 25, textAlignVertical: 'top', fontSize: 20}} 
                            autoFocus={true} placeholder="刻录你的年轮" multiline={true}  
                            onChangeText={text => {this.setState({content:text})}} value={this.state.text}/>
                <View style={styles.flexStretch}>
                    <Image style={styles.border} source={require("../images/edit/template.png")} resizeMode="contain"></Image>
                    <Image style={styles.border} source={require("../images/edit/calendar.png")} resizeMode="contain"></Image>
                    <Image style={styles.border} source={require("../images/edit/list.png")} resizeMode="contain"></Image>
                    <Image style={styles.border} source={require("../images/edit/rollBack.png")} resizeMode="contain"></Image>
                    <Image style={styles.border} source={require("../images/edit/rollForward.png")} resizeMode="contain"></Image>
                    <Image style={styles.border} source={require("../images/edit/indentation.png")} resizeMode="contain"></Image>
                </View>
            </View>
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
