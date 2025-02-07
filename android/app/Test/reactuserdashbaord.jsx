import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useList } from "@refinedev/core";
import { useNavigation } from '@react-navigation/native';

// Avatar Image Component
const AvatarImage = () => {
  return (
    // <Image
    //   source={src ? { uri: src } : require('./assets/Person.png')}
    //   style={styles.avatar}
    // />
    <>
    </>
  );
};

// Table Header Component
const TableHeader = () => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.imageCell}><Text style={styles.headerText}>Picture</Text></View>
      <View style={styles.cell}><Text style={styles.headerText}>ID</Text></View>
      <View style={styles.cell}><Text style={styles.headerText}>Name</Text></View>
      <View style={styles.cell}><Text style={styles.headerText}>Father</Text></View>
      <View style={styles.cell}><Text style={styles.headerText}>Vyaapar</Text></View>
      <View style={styles.cell}><Text style={styles.headerText}>City</Text></View>
    </View>
  );
};

// Table Row Component
const TableRow = ({ item }) => {
  return (
    <View style={styles.row}>
      <View style={styles.imageCell}>
        <AvatarImage src={item.profilePicture?.url} />
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.id}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.FirstName}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.FatherName}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.VyaaparType}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.WorkingCity}</Text>
      </View>
    </View>
  );
};

const UserDashboard = () => {
  const navigation = useNavigation();
  const { data: usersData, isLoading, isFetching } = useList({
    resource: "users",
    meta: {
      populate: ["profilePicture", "vyaapars"],
    },
  });

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const rowData = usersData?.data?.map((user) => ({
    id: user.id,
    profilePicture: user.profilePicture,
    FirstName: user.firstname,
    FatherName: user.father,
    VyaaparType: user?.vyaapars[0]?.type,
    State: user.State,
    Country: user.Country,
    City: user.City,
    WorkingCity: user.WorkingCity,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={rowData}
        ListHeaderComponent={TableHeader}
        renderItem={({ item }) => <TableRow item={item} />}
        keyExtractor={item => item.id.toString()}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        horizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
    minWidth: 100,
  },
  imageCell: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#495057',
  },
  cellText: {
    fontSize: 14,
    color: '#212529',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default UserDashboard;