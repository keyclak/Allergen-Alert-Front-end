import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../style';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [code, setCode] = useState();

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar has type ${type} and data ${data}`);
    };

    if (hasPermission === null) {
        return (
            <View>
                <Text style={Styles.labelText, {marginTop: StyleConstants.FormItemTextSize, textAlign: "center"}}>
                    Awaiting permission to access the camera
                </Text>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Go To Search' onPress={onGoToSearch}/>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Go To Home' onPress={onGoToHome}/>
            </View>   
        )
    }
    if (hasPermission === false) {
        return (
            <View>
                <Text style={Styles.labelText, {marginTop: StyleConstants.FormItemTextSize, textAlign: "center"}}>
                    AllergenAlert needs permission to access the camera before you can use scanner
                </Text>
                <TextLoadingButton style={{ marginTop: StyleConsatants.FormItemTextSize }} text='Go To Search' onPress={onGoToSearch}/>
                <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Go To Home' onPress={onGoToHome}/>
            </View>  
        )
    }

    function onGoToSearch() {
        // TODO: Insert navigation here
    }

    function onGoToHome(){
        // TODO: Insert navigation here
    }


    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end',}}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />

        {scanned && <TextLoadingButton title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}