import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Styles, Colors } from '../style';
import { useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'

export default function Settings() {
    const context = useContext(AuthContext);

    return (
        <View style={[Styles.container, {paddingTop: 0}]}>   
            {/* <TextLoadingButton text="Log Out" onPress={() => context.logOut()} /> */}
            <ListItem containerStyle = {{backgroundColor: Colors.Background}} style = {{width: '100%'}} bottomDivider onPress={() => context.logOut()}>
                <Icon name='keyboard-tab' color={Colors.Accent}/>
                <ListItem.Title style={{color:Colors.Accent}}>
                    Log Out
                </ListItem.Title>
            </ListItem>
        </View>
    );
}