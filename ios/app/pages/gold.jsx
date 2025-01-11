import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoldCard = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <View style={styles.goldCard}>
        <View style={styles.goldHeader}>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureText}>{feature.name}</Text>
            <View style={styles.featureComparison}>
              <Text style={styles.comparisonText}>Free</Text>
              <Text style={styles.comparisonText}>Gold</Text>
            </View>
            <View style={styles.featureIcons}>
              <Text>{feature.free ? '✓' : '—'}</Text>
              <Text>{feature.gold ? '✓' : '—'}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All Features</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 8,
  },
  goldCard: { padding: 16 },
  goldHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  upgradeButton: { backgroundColor: '#FFB800', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  upgradeText: { color: '#000', fontWeight: 'bold' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  featureRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  featureText: { flex: 1 },
  featureComparison: { flexDirection: 'row', gap: 32 },
  featureIcons: { flexDirection: 'row', gap: 40 },
  seeAllButton: { alignItems: 'center', marginTop: 16 },
  seeAllText: { color: '#FFB800', fontWeight: 'bold' },
});

export default GoldCard;
