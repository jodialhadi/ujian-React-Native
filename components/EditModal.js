import React, {Component} from 'react';
import { AppRegistry, FlatList, View, Dimensions, Platform, Text, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/flatListData';
import flatListData from '../data/flatListData';

var screen= Dimensions.get('window');
export default class EditModal extends Component{
    constructor (props){
        super (props);
        this.state ={
            FoodName: '',
            FoodDescription: ''
        };
    }
    showEditModal = (editingfood,flatListItem) => {
            console.log('editingFood = ${JSON stringify(editingFood)}');
            this.setState({
            key: editingfood.key, 
            foodName: editingfood.name,
            FoodDescription: editingfood.description,
            flatListItem: flatListItem
        });
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require ('random-string') ({length: numberOfCharacters });
    }
    render(){
        return (
            <Modal
            ref={"myModal"}
            style= {{
                justifyContent: 'center',
                borderRadius: Platform.OS === 'android' ? 30: 0,
                showRadius: 10,
                width: screen.width - 80,
                height: 280
            }}
            position='center'
            backdrop= {true}
            onClosed= {()=> {
                // alert("Modal ditutup");
            }}

            >
                <Text 
                style= {{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}
                >Ini Informasi Makanan</Text>
                    <TextInput
                        style={{
                            height: 10,
                            borderBottomColor: 'black',
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 20,
                            marginBottom: 10,
                            borderBottomWidth: 1
                        }}
                        onChangeText= {(text) => this.setState ({FoodName: text})}
                        placeholder="Tambahkan Makanan Baru"
                        value={this.state.FoodName}
                        />
                        <TextInput
                        style={{
                            height: 10,
                            borderBottomColor:'black',
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 20,
                            marginBottom: 10,
                            borderBottomWidth: 1
                        }}
                        onChangeText= {(text) => this.setState ({FoodDescription: text})}
                        placeholder="Tambahkan Deskripsi"
                        value={this.state.FoodDescription}
                        />
                        <Button
                            style={{
                                fontSize: 18,
                                color: 'white',
                            }}
                            containerStyle= {{
                                padding: 8,
                                marginLeft: 70,
                                marginRight: 70,
                                height: 40,
                                borderRadius: 6,
                                backgroundColor: 'Red'

                            }}
                            onPress={()=> {
                                if(this.state.FoodName.length == 0 || this.state.FoodDescription.length == 0){
                                alert("Form belum diinput");    
                                }
                                var foundIndex=flatListData.findIndex(item=> this.state.key== item.key);
                                if(foundIndex < 0){
                                return;
                                }    
                                flatListData[foundIndex].name = this.state.FoodName;
                                flatListData[foundIndex].description = this.state.FoodDescription;
                                this.state.flatListItem.refreshFlatListItem();
                                this.refs.myModal.close();
                            }}
                        >
                            Save
                        </Button>

            </Modal>
        )
    }
}
