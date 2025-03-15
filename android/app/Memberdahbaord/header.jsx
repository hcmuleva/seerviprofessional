// components/Header.js
import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MenuIcon, NotificationIcon } from './icons';

const Header = () => (
  <LinearGradient
    colors={['#FF7043', '#FF5252']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.header}
  >
    <MenuIcon />
    <View style={styles.logoContainer}>
      <Image source={require('../images/geculogo.png')} style={styles.logo} />
    </View>
    <View style={styles.headerRight}>
      <NotificationIcon count={1} />
      <Image source={require('../images/geculogo.png')} style={styles.profilePic} />
    </View>
  </LinearGradient>
);

export default Header;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, height: 60 },
  logoContainer: { height: 40, width: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  logo: { height: 30, width: 30, borderRadius: 15 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#FFFFFF' },
});
