import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserItem from './UserItem';
import FilterModal from './FilterModal';
import { useOne } from '@refinedev/core';
import UserDashboard from './Test/reactuserdashbaord';


export default function Dashboard() {
  
  return (
   <>
   <UserDashboard/>
   </>
  );
}



