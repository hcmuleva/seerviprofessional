// components/Icons.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
  </View>
);

export const NotificationIcon = ({ count }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.notificationIcon} />
    {count > 0 && (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationCount}>{count}</Text>
      </View>
    )}
  </View>
);

export const GridIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.gridContainerIcon}>
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
    </View>
  </View>
);

export const ListIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.listContainer}>
      <View style={styles.listItem} />
      <View style={styles.listItem} />
      <View style={styles.listItem} />
    </View>
  </View>
);

export const FilterIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.filterContainer}>
      <View style={styles.filterTop} />
      <View style={styles.filterMiddle} />
      <View style={styles.filterBottom} />
    </View>
  </View>
);

export const SortIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.sortContainer}>
      <View style={styles.sortLine1} />
      <View style={styles.sortLine2} />
      <View style={styles.sortLine3} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  menuIcon: { width: 24, height: 24, justifyContent: 'space-around' },
  menuLine: { width: 24, height: 2, backgroundColor: '#FFFFFF' },
  notificationContainer: { marginRight: 15 },
  notificationIcon: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#FFFFFF' },
  notificationBadge: { position: 'absolute', top: -5, right: -5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFEB3B', justifyContent: 'center', alignItems: 'center' },
  notificationCount: { fontSize: 10, fontWeight: 'bold', color: '#000000' },
  viewIcon: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  gridContainerIcon: { width: 20, height: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: 8, height: 8, backgroundColor: '#757575', margin: 1 },
  listContainer: { width: 20, height: 20, justifyContent: 'space-around' },
  listItem: { width: 20, height: 4, backgroundColor: '#757575' },
  filterContainer: { width: 20, height: 20, alignItems: 'center' },
  filterTop: { width: 16, height: 2, backgroundColor: '#757575', marginBottom: 3 },
  filterMiddle: { width: 12, height: 2, backgroundColor: '#757575', marginBottom: 3 },
  filterBottom: { width: 8, height: 2, backgroundColor: '#757575' },
  sortContainer: { width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  sortLine1: { width: 16, height: 2, backgroundColor: '#757575', marginBottom: 3 },
  sortLine2: { width: 12, height: 2, backgroundColor: '#757575', marginBottom: 3 },
  sortLine3: { width: 8, height: 2, backgroundColor: '#757575' },
});
