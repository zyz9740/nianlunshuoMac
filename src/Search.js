import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Platform } from 'react-native';
const utils = require("./utils");


class Search extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            search: "",
            hotTags: [],
        }
        this._fetchData()
    }

    _fetchData = () => {
        console.log("[REQUEST]:\tget all hot tags\tvia /tags.");
        fetch("http://49.235.93.122:8080/letter/?hottags=1")
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                console.log("[RESPONSE]:\t200\t/hotTags:", responseJson);
                this.setState({
                    hotTags: responseJson
                });
            })
            .catch((error) => {
                console.error(error);

            });
    };

    _setTag = (hotTag) => {
        let setTag = this.props.navigation.getParam('setTag', '');
        let fresh = this.props.navigation.getParam('fresh', '');
        setTag( hotTag ? hotTag : this.state.search);
        fresh();
        this.props.navigation.goBack();
    };

    render() {
        let hotTags = this.state.hotTags.map((content) =>
            <Text style={{fontSize: 16, color: 'black', backgroundColor: "#E8E8E8",fontFamily: 'yuesong',
                paddingVertical: 5, paddingHorizontal: 12, marginRight: 15, marginVertical: 5}}
                onPress={() => this._setTag(content)}>
                {content}
            </Text>
        )
        return (
            <View style={{flex: 1, flexDirection: "column"}}>
                <View style={styles.topBar}>
                    <SearchBar
                        // style
                        containerStyle={{borderRadius: 30, flex: 8}}
                        inputContainerStyle={{height: 30}}
                        inputStyle={{fontSize: 15}}
                        round={true}
                        lightTheme={true}
                        platform={Platform.OS}
                        showCancel={true}
                        // value
                        ref={search => this.search = search}
                        placeholder="请输入您想搜索的标签"
                        value={this.state.search}
                        // action
                        onChangeText={search => this.setState({ search })}
                        onCancel={() => this.props.navigation.goBack()}
                    />
                    <TouchableOpacity onPress={() => this._setTag()} style={{flex: 2}}>
                        <Text style={{fontSize: 25, color: "white", textAlign:"center"}}>
                            {this.state.search ? "搜索":"取消"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "column", paddingHorizontal: 35, paddingVertical: 20}}>
                    <View style={styles.flexCenter}>
                        <Text style={{fontSize: 20}}>大家都在搜</Text>
                        <Image style={{height: 50, width: 50}} source={require("../images/search/HOT.png")} />
                    </View>
                    <View style={styles.flexCenter}>
                        {hotTags}
                    </View>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    topBar:{
        flexDirection: 'row',
        backgroundColor: 'rgb(128, 194, 105)',
        // justifyContent: "space-between",
        alignItems: "center",
        // maxHeight: 60,
        padding: 10,
        width: "100%",
    },
    flexCenter:{
        justifyContent:"flex-start",
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});


export default Search;
