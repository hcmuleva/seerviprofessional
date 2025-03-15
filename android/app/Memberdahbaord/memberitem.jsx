
import React, { memo } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const MemberItem = memo(({ item, viewMode, navigation }) => {
  if (viewMode === 'grid') {
    return (
      <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu')}>
        {/* Grid item content */}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu')}>
      {/* List item content */}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  // Item styles
});

export default MemberItem;