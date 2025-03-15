// components/MemberList.js
import React from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MemberList = ({ data, activeView, isFetchingNextPage, handleLoadMore }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (activeView === 'grid') {
      return (
        <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu')}>
          <View style={styles.gridCard}>
            <View style={styles.gridAvatarContainer}>
              {item.avatar ? (
                <Image source={item.avatar} style={styles.gridAvatar} />
              ) : (
                <View style={styles.gridPlaceholderAvatar}>
                  <View style={styles.placeholderIcon} />
                </View>
              )}
            </View>
            <Text style={styles.gridMemberName} numberOfLines={1}>
              {item.FirstName + ' ' + item.LastName}
            </Text>
            <Text style={styles.gridMemberPosition} numberOfLines={1}>
              {item.position || "Software"}
            </Text>
            <Text style={styles.gridMemberYears} numberOfLines={1}>
              {item.years || "5"} years
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu', {
        user : item 
      })}>
        <View style={styles.memberItem}>
          <View style={styles.avatarContainer}>
            {item.avatar ? (
              <Image source={item.avatar} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <View style={styles.placeholderIcon} />
              </View>
            )}
          </View>
          <View style={styles.memberDetails}>
            <Text style={styles.memberName}>{item.FirstName + ' ' + item.LastName}</Text>
            <Text style={styles.memberPosition}>{item.position || "Software"}</Text>
            <Text style={styles.memberYears}>{item.years || "5"}</Text>
            <Text style={styles.memberLocation}>{item?.addresses?.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MemberList;

const styles = StyleSheet.create({
  gridItemContainer: { flex: 1, margin: 8 },
  gridCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, alignItems: 'center', elevation: 2 },
  gridAvatarContainer: { marginBottom: 12 },
  gridAvatar: { width: 80, height: 80, borderRadius: 40 },
  gridPlaceholderAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: '#BDBDBD', justifyContent: 'center', alignItems: 'center' },
  gridMemberName: { fontSize: 14, fontWeight: 'bold', color: '#424242', marginBottom: 4, textAlign: 'center' },
  gridMemberPosition: { fontSize: 12, color: '#757575', marginBottom: 4, textAlign: 'center' },
  gridMemberYears: { fontSize: 12, color: '#9E9E9E', textAlign: 'center' },
  listItemContainer: {},
  memberItem: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  avatarContainer: { marginRight: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  placeholderAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: '#BDBDBD', justifyContent: 'center', alignItems: 'center' },
  placeholderIcon: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: '#BDBDBD' },
  memberDetails: { flex: 1, justifyContent: 'center' },
  memberName: { fontSize: 16, fontWeight: 'bold', color: '#424242', marginBottom: 2 },
  memberPosition: { fontSize: 14, color: '#757575', marginBottom: 2 },
  memberYears: { fontSize: 14, color: '#9E9E9E', marginBottom: 2 },
  memberLocation: { fontSize: 14, color: '#9E9E9E' },
  loadingFooter: { padding: 10, alignItems: 'center' },
  listContainer: { paddingBottom: 20 },
});
