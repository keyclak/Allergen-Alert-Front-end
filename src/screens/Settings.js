import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Styles } from '../style';
import { useLogin } from '../hooks/api';
import { AuthContext } from '../context';
import { ListItem, Icon } from 'react-native-elements'

export default function Settings() {
    const context = useContext(AuthContext);

    return (
        <View style={[Styles.container, {backgroundColor: 'white'}]}>   
            {/* <TextLoadingButton text="Log Out" onPress={() => context.logOut()} /> */}
            <ListItem style = {{width: '100%'}} bottomDivider onPress={() => context.logOut()}>
                <Icon name='keyboard-tab' color={"#666"}/>
                <ListItem.Title style={{color:"#666"}}>
                    Log Out
                </ListItem.Title>
            </ListItem>
        </View>
    );
}