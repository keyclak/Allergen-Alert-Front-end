import React, { useContext, useEffect, useState } from 'react';
import { CheckBox,TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useGetIngredients } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';


export default function SelectRestriction({navigation, route}) {

    const id = route.params;
    const context = useContext(AuthContext);
    const getIngredients = useGetIngredients();

    const [dietID, setDietID] = useState(route.params);

    useEffect(() => {
        navigation.addListener('focus', () =>  getIngredients.execute(id));
    }, [navigation]);

    FlatListItemSeparator = () => {
        return(

            <View>
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#607D8B",
                }}
            </View>
        )
    }
    
    return (

        <View style={[Styles.containerIngredient, {justifyContent: 'flex-start', paddingTop:40}]}>   
            <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>{getIngredients.response?.name}</Text>
            <FlatList
                data={getIngredients.response?.ingredients}
                renderItem={({ item }) => (

                    <View style={Styles.flatListRow}>
                        <View style={Styles.flatListRowSpacing}>
                            <Text
                                style={[Styles.buttonText, {paddingLeft: 25}]}
                                >
                                {item}
                            </Text>
                            <View style={{paddingRight: 25}}>
                                <TouchableOpacity
                                    style={[Styles.button,{width: "100%"}]}
                                    >
                                    <Text
                                        style={[Styles.buttonText]}
                                    >  Enabled  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => 'key'+index}
                />
            </View>
    );
}