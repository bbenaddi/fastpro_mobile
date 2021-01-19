import React from 'react';
import { StyleSheet, View,Alert,AsyncStorage, BackHandler  ,ActivityIndicator  } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { EyeIcon, EyeOffIcon, PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';

export default ({ navigation }): React.ReactElement => {
  
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [loading,setLoading] = React.useState(false);
  const fetchAndTry = useSelector(state => state.fetch);
  var STORAGE_KEY = 'id_token';
  
  const _onValueChange = async (item, selectedValue) => {
    try {
      await AsyncStorage.removeItem(item);
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  const onSignInButtonPress = (): void => {
    setLoading(true);

    fetchAndTry('sessions/create',{
      username: email,
      password: password,
    })
    .then((result) => {
      setLoading(false);
      _onValueChange(STORAGE_KEY, result.id_token)        
      setTimeout(()=>{
      navigation && navigation.navigate('Home');
//navigation && navigation.navigate('VehiculeList');
    })})
    .catch((error) => {
      setLoading(false);
      Alert.alert(
        "Connexion echouée!","Identifiant ou mot de passe erroné",[{text: 'Ressayer', onPress: () => {}, style: 'cancel'}],{cancelable: true}
      )
    });

 
  };
  
  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
<View style={styles.container}>
  <View style={[styles.primary,loading && styles.hidePrimary]}>
<KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require('./assets/image-background.jpg')}>
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'>
            Bienvenue 
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Connectez-vous
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            placeholder='Email'
            icon={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status='control'
            placeholder='Mot de passe'
            icon={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              status='control'
              onPress={onForgotPasswordButtonPress}>
              Mot de passe oublié?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          status='control'
          size='giant'
          onPress={onSignInButtonPress}>
          CONNECTION
        </Button>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'>
          Pas de compte? Contactez votre agence :) !
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
    </View>
    <View style={[styles.alertContainer,loading && styles.showAlert]}>
      <ActivityIndicator size="large" color="#FF0000" />
      <Text style={styles.text}>Loading ...</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  primary : {
    flex : 1 ,
  },
  hidePrimary : {
    opacity : 0.4
  },
  alertContainer: {
    flex: 1,
    position : 'absolute',
    top : '40%',
    left : '40%',
    zIndex : -1
  },
  showAlert : {
    zIndex : 99
  },
  text:{
    fontWeight : 'bold'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

