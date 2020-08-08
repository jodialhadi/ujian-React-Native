import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, TouchableOpacity} from 'react-native';
import flatListData from '../data/flatListData';
import Header from '../components/header';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';

class FlatListItem extends Component{
    constructor (props) {
        super (props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0
        };
    }
    refreshFlatListItem=() => {
        this.setState((prevState)=> {
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }
    render(){
        const swipeSettings = {
            autoClose:true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({activeRowKey:null});
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () => {
                        // alert("update");
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index],this);
                    },
                    text: 'Edit', type:'primary'
                },
                {
                    onPress:() => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Apakah kamu yakin ingin menghapus?',
                            [
                                {text: 'No', onPress: () => console.log ('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                    flatListData.splice(this.props.index, 1);
                                    this.props.parentFlatList.refreshFlatlist(deletingRow);
                                }},
                            ],
                            {cancelable:true}
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            left: [
                {
                    onPress:() => {
                        Alert.alert(
                            'Alert',
                            'Apakah kamu yakin ingin menambahkan?',
                            [
                                {text: 'No', onPress: () => console.log ('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                    flatListData.splice(this.props.index, 1);
                                }},
                            ],
                            {cancelable:true}
                        )
                    },
                    text: 'Add', type: 'primary'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return(
            <Swipeout {...swipeSettings}>
            <View style={{
                flex: 1,
                flexDirection: 'column'
            }}>
            
            <View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#F0F8FF'
            }}>
                <Image
                source={{uri:this.props.item.imageUrl}}
                style={{width:100, height: 100, margin:5}}
                >
                </Image>
                <View style={{
                    flex: 1,
                    FlexDirection:'column',
                    height: 100
                }}>
                    <TouchableOpacity onPress= {()=> {this.setState ({show:true})}}>
                <Text style={styles.FlatListItem}>{this.props.item.name}</Text>
                    </TouchableOpacity>

                <Text style={styles.FlatListItem}>{this.props.item.description}</Text>
                </View>
                </View>
                <View style={{
                    height:1,
                    backgroundColor: 'black',
                    borderBottomWidth: 5,
                }}>
            </View>
            </View>
            </Swipeout>
            
        )
    }
}
const styles = StyleSheet.create({
    FlatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 20,
    }
});
export default class BasicFlatListData extends Component{
    constructor (props) {
        super (props);
        this.state = ({
            deletedRowKey: null
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatlist = (activeKey) => {
        this.setState ((prevState) => {
            return{
                deletedRowKey: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }
            _onPressAdd () {
            // alert("Berhasil ditambahkan");
            this.refs.AddModal.showAddModal();
            }
    render (){
        return(
            <View style={{ flex:1, marginTop: Platform.OS === 'android' ? 34 : 0}}>
                
                <View
                    style={{
                        backgroundColor: '#C0C0C0',
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'

                    }}>
                        <TouchableHighlight
                        style= {{marginRight: 10}}
                        underlayColor= 'skyblue'
                        onPress={this._onPressAdd}>
                            <Image 
                            style={{width:45, height: 45}}
                            source= {require('../icon/add.png')}
                            />
                        </TouchableHighlight>
                </View>
                <Header />
                <FlatList
                ref="flatList"
                    data={flatListData}
                    renderItem={({item, index}) =>{
                        return(
                            <FlatListItem item={item} index={index} parentFlatList={this}>

                            </FlatListItem>
                        );
                    }}
                >
                </FlatList>
                <AddModal ref = {'AddModal'} parentFlatList={this}>

                </AddModal>
                <EditModal ref = {'editModal'} parentFlatList={this}>

                </EditModal>
            </View>
        )
    }
}