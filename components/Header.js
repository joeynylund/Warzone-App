import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({title, navigation}) => {

    const route = useRoute();


  return (

        <Pressable
          style={{
            height: 120,
            paddingTop: 60,
            padding: 15,
            backgroundColor: '#212121',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
              {route.name != 'Home' ? <Icon name='chevron-left' size={25} color='#fff' style={{position: 'absolute', left: 15, bottom: 25}} onPress={() => navigation.goBack()}></Icon> : <Icon name='bars' size={25} color='#fff' style={{position: 'absolute', left: 15, bottom: 25}} onPress={() => navigation.openDrawer()}></Icon>}
          <Text style={{color:'#fff', fontSize: 30, fontWeight: '800'}}>{title}</Text>
        </Pressable>
  );
};


export default Header;
