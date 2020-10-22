import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarcodeScanner } from 'expo-barcode-scanner';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../style';
import {} from '../hooks/api';
import { AuthContext } from '../context';
import { HideNavigationBar } from 'react-native-navigation-bar-color';

export default function Scanner({navigation}) {
    const context = useContext(AuthContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const barCodeScanned = ({ type, data }) => {
          setScanned(true);
          
      }

      function onGoToSearch() {
          // TODO: Insert navigation here
      }

      function onGoToHome(){
          // TODO: Insert navigation here
      }

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
            <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Go To Search' onPress={onGoToSearch}/>
            <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Go To Home' onPress={onGoToHome}/>
          </View>  
          )
      }

      return (
        <View>
            <BarcodeScanner
                onBarCodeScanned={scanned ? undefined : barCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        
            {scanned && <TextLoadingButton style={Styles.Button} text='Scan Again' onPress={() => setScanned(false)} /> }
        </View>
      )
}