import React from 'react';
import { ScrollView,Alert } from 'react-native';
import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { ProfileAvatar } from './extra/profile-avatar.component';
import { ProfileSetting } from './extra/profile-setting.component';
import { CameraIcon } from './extra/icons';
import {useSelector} from 'react-redux'


export default ({ navigation }): React.ReactElement => {

  const [profile, setProfile] = React.useState({
    Nom : '',
  Prenom: '', 
  Email :'',
  Cin: '',
  Dateinscription : new Date(),
  phoneNumber : '',
  photo : null,
 });
 const fetchAndTry = useSelector(state => state.fetch);
 const site = useSelector(state => state.site);

 React.useEffect( () => {
  fetchAndTry('data',{})
  .then((p) => {
    setProfile({
      Nom : p.NomUtilisateur,
      Prenom: p.PrenomUtilisateur, 
      Email :p.identifiant,
      Cin: p.CIN,
      Dateinscription : p.Dateinscription,
      phoneNumber :  p.Telephone,
      photo : {uri :site+ 'user/user.png'}
     });
  })
  .catch((error) => {
    Alert.alert(
      "List vide!","",[{text: 'Ressayer', onPress: () => {}, style: 'cancel'}],{cancelable: true}
    )
  });
  

},[]);
 
  const styles = useStyleSheet(themedStyle);

  const onDoneButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status='basic'
      icon={CameraIcon}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ProfileAvatar
        style={styles.profileAvatar}
        source={profile.photo}
        //editButton={renderPhotoButton}
      />

      <ProfileSetting
      style={[styles.profileSetting, styles.section]}
      hint='Nom'
      value={profile.Nom}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint='Prenom'
        value={profile.Prenom}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint='Email'
        value={profile.Email}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint='CIN'
        value={`${profile.Cin}`}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint='Date d inscription'
        value={`${new Date(profile.Dateinscription).toISOString().replace("T"," ").replace("Z"," ").replace(".000","")}`}
      />
 
      <ProfileSetting
        style={styles.profileSetting}
        hint='Telephone'
        value={`${profile.phoneNumber} `}
      /> 
      
      <Button
        style={styles.doneButton}
        onPress={onDoneButtonPress}>
        Terminé
      </Button>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
