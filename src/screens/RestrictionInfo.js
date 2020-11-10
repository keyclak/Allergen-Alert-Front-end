import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddRestriction, useGetRestrictions, useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'


export default function SelectRestriction({navigation, route}) {
    const id = route.params;
    const context = useContext(AuthContext);

    const [dietID, setDietID] = useState(route.params);

    const [currentDiet, setDiets] = useState([
        { title: 'Wheat', key: '1', exception:true },
        { title: 'Barley', key: '2', exception:false },
        { title: 'Malt', key: '3', exception:true },
        { title: 'Oats', key: '4', exception:false },
        { title: 'Rye', key: '5', exception:true },
    ]);

    function changeButtonText(key, exception) {
        return function() {

            if(exception == 1) {


            } else {

            }
        }
    }
    
    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                
                <FlatList
                        data={currentDiet}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 20, paddingStart: 65, paddingEnd: 30}}>
                                <Text
                                    style={[Styles.buttonText]}
                                    >
                                    { item.title }
                                </Text>
                                <TouchableOpacity
                                    style={[Styles.button, {width: '70%'}]}
                                    >
                                    <Text
                                        style={[Styles.buttonText]}
                                    >  {item.exception ? 'Enabled' : 'Not Enabled'} </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        //keyExtractor={item => `${item.id}`}
                    />
            </View>
        </View>
    );
}