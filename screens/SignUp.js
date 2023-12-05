import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";


const localImage = require('../assets/karacare.png')

const SignUpScreen = () => {
    const nav = useNavigation();
    const [isUserFocused, setIsUserFocused] = useState(false);
    const [user, setUser] = useState('');
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [pass, setPass] = useState('');
    const [load, setLoad] = useState(false);

    const handleSignUp = async () => {
            if(!user || !pass){
                Alert.alert('WARNING', 'Please fill up the fields to login');
            }
            else{
                try{
                    setLoad(true);
                    await createUserWithEmailAndPassword(auth, user, pass);
                    nav.navigate('LoginScreen');
                } catch(error){
                    Alert.alert('ERROR', 'Error signing up');
                } finally{
                    setLoad(false);
                }

            }

    }

    const handleFocus = (field) => {
        switch (field){
            case 'user':
                setIsUserFocused(true);
                break;
            case 'pass':
                setIsPassFocused(true);
                break;
            default:
                break;
        }
    }

    const handleBlur = (field) => {
        switch (field){
            case 'user':
                setIsUserFocused(false);
                break;
            case 'pass':
                setIsPassFocused(false);
                break;
            default:
                break;
        }
    }

    return(
        <View style={styles.container}>
            <LinearGradient colors = {['#00598B', '#8FBC8F']} style = {styles.something}>
                <View style={styles.recOne}/>
                <Text style={styles.title}>KaraCare EMERGENCY SYSTEM</Text>
                <Image style={styles.image} source = {localImage}/>
                <View style={styles.recTwo}/>
                <View style={styles.header}></View>
                <Text style={styles.headerText}>SIGNUP</Text>
                
                <TouchableOpacity style = {styles.buttonTwo} onPress={handleSignUp}/>
                <Text style={styles.signupText}>Sign Up</Text>

                <View style={styles.fieldOne}>
                    <TextInput  style={styles.user}
                            value={user}
                            onChangeText={(text) => setUser(text)}
                            placeholder = {(isUserFocused || user) ? '': 'Email Address'}
                            placeholderColor = "#888"
                            textAlign= "center"
                            onFocus = {() => handleFocus('user')}
                            onBlur = {() => handleBlur('user')}
                            />
                </View>

                <View style={styles.fieldTwo}>
                    <TextInput  style={styles.pass}
                        value={pass}
                        textAlign= "center"
                        onFocus = {() => handleFocus('pass')}
                        onBlur = {() => handleBlur('pass')}
                        secureTextEntry={true}
                        onChangeText={(text) => setPass(text)}
                        placeholder = {(isPassFocused || pass) ? '': 'Password'}
                        placeholderColor = "#888"/>
                </View>

                {load &&(
                    <View style={styles.loadingPop}>
                        <Text style = {{ color: '#fff', marginLeft: 10, fontSize: 24, fontFamily: 'Roboto' }}>Loading...</Text>
                        <ActivityIndicator size="large" color="#fff"/>
                    </View>
                )}

                    <View style={styles.recFour}/>
                    <View style={styles.recFive}/>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {width: 424, left: 0, top: 0, flex: 1, alignItems: 'center',justifyContent: 'center', backgroundColor: 'black'},
    something: {width: '100%', height: '100%', position: 'relative', borderRadius: 50, overflow: 'hidden'},
    recOne: {width: 350, height: 800, left: 40, top: 65, position: 'absolute', backgroundColor: '#BCBCBC'},
    image: {width: 68, height: 66, left: 76, top: 140, position: 'absolute'},
    title: {width: 200, height: 49, left: 166, top: 150, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Roboto', fontWeight: '700'},

    buttonTwo: {width: 70, height: 40, left: 180, top: 450, position: 'absolute', backgroundColor: '#46525E', borderRadius: 50},
    signupText: {width: 50, height: 20, left: 190, top: 459, position: 'absolute', textAlign: 'center', color: '#D9D9D9', fontSize: 13, fontFamily: 'Roboto', fontWeight: '700'},

    headerText: {width: 151, height: 40, left: 140, top: 235, position: 'absolute', textAlign: 'center', color: '#FFFDFD', fontSize: 25, fontFamily: 'Roboto', fontWeight: '700'},
    header: {width: 350, height: 70, left: 40, top: 222, position: 'absolute', backgroundColor: '#46525E'},
    
    user: {width: 250, height: 40, left: 0, top: 0, position: 'absolute', backgroundColor: '#D9D9D9', borderRadius: 50},
    pass: {width: 250, height: 40, left: 0, top: 0, position: 'absolute', backgroundColor: '#D9D9D9', borderRadius: 50},
    recFour: {width: 350, height: 200, left: 40, top: 665, position: 'absolute', backgroundColor: '#46525E'},
    recFive: {width: 350, height: 50, left: 40, top: 65, position: 'absolute', backgroundColor: '#46525E'},
    fieldOne: {width: 250, height: 40, left: 90, top: 320, position: 'absolute', backgroundColor: '#D9D9D9', borderRadius: 50},
    fieldTwo: {width: 250, height: 40, left: 90, top: 380, position: 'absolute', backgroundColor: '#D9D9D9', borderRadius: 50},
    loadingPop: {flexDirection:'row', width: 300, height: 100, left: 65, top: 400, justifyContent: 'center', alignItems: 'center', backgroundColor: '#444444', borderRadius: 20},
    loadingtext: {width: 151, height: 40, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#FFFDFD', fontSize: 25, fontFamily: 'Roboto', fontWeight: '700'},


})

export default SignUpScreen;