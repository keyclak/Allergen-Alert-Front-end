import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddRestriction, useGetRestrictions, useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'


export default function SelectRestriction({navigation, route}) {

    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            
            <Text>
                
            </Text>
        </View>
    );
}