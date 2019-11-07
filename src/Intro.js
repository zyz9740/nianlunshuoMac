import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

class Intro extends Component {
    static navigationOptions = {
        header: null,  
    };  
    render() {
        return (
            <View style={[styles.flexCenter, {flex: 1, flexDirection: "column"}]}>
                <Image source={require('../images/intro/title.png')} style={{height:199,width: 64, marginBottom:80}} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <View style={[styles.textBg,styles.flexCenter]}>
                        <Text style={{fontSize: 16,color:'white'}}> 点击进入 </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
    textBg: {
        height: 113,
        width:  113,
        backgroundColor: 'rgb(128, 194, 105)',
        borderRadius: 85
    }
});

export default Intro;
