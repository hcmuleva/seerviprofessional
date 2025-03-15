// components/ViewOptions.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterIcon, GridIcon, ListIcon, SortIcon } from './icons';

const ViewOptions = ({ activeView, setActiveView, onShowFilters }) => (
  <View style={styles.viewOptions}>
    <TouchableOpacity
      style={[styles.viewOption, activeView === 'grid' && styles.activeViewOption]}
      onPress={() => setActiveView('grid')}
    >
      <GridIcon />
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.viewOption, activeView === 'list' && styles.activeViewOption]}
      onPress={() => setActiveView('list')}
    >
      <ListIcon />
    </TouchableOpacity>
    <TouchableOpacity style={styles.viewOption} onPress={onShowFilters}>
      <FilterIcon />
    </TouchableOpacity>
    <TouchableOpacity style={styles.viewOption}>
      <SortIcon />
    </TouchableOpacity>
  </View>
);

export default ViewOptions;

const styles = StyleSheet.create({
  viewOptions: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  viewOption: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
  activeViewOption: { backgroundColor: '#F5F5F5', borderRadius: 4 },
});
