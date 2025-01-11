import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DonationScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const temples = [
    {
      id: 1,
      name: 'Seervi Bader',
      location: 'Bilara, Rajasthan',          
      image: require('../images/temple3.png')
    },
    {
      id: 2,
      name: 'Lingrajapuram Temple',
      location: 'Bangalore, Karnataka',
      image: require('../images/temple2.png')
    }
  ];

  const predefinedAmounts = [501, 1001, 2001, 5001, 10001];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'phone' },
    { id: 'card', name: 'Card', icon: 'card' },
    { id: 'bank', name: 'Net Banking', icon: 'bank' },
    { id: 'wallet', name: 'Wallet', icon: 'wallet' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#007AFF", "#004ECC"]} style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Temple Donation</Text>
          <Text style={styles.headerSubtitle}>  Support our heritage</Text>
        </View>
        <MaterialCommunityIcons name="gift-outline" size={24} color="#fff" />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Temple Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Temple</Text>
          <View style={styles.templesGrid}>
            {temples.map((temple) => (
              <TouchableOpacity
                key={temple.id}
                style={[
                  styles.templeCard,
                  selectedTemple?.id === temple.id && styles.selectedTempleCard
                ]}
                onPress={() => setSelectedTemple(temple)}
              >
                <Image source={temple.image} style={styles.templeImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.templeOverlay}
                >
                  <Text style={styles.templeName}>{temple.name}</Text>
                  <Text style={styles.templeLocation}>{temple.location}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          <View style={styles.amountsGrid}>
            {predefinedAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.amountButton,
                  amount === amt.toString() && styles.selectedAmountButton
                ]}
                onPress={() => setAmount(amt.toString())}
              >
                <Text style={[
                  styles.amountText,
                  amount === amt.toString() && styles.selectedAmountText
                ]}>
                  ₹{amt.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.customAmount}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter custom amount"
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentButton,
                  selectedPayment?.id === method.id && styles.selectedPaymentButton
                ]}
                onPress={() => setSelectedPayment(method)}
              >
                <MaterialCommunityIcons
                  name={method.icon}
                  size={24}
                  color={selectedPayment?.id === method.id ? '#fff' : '#4a90e2'}
                />
                <Text style={[
                  styles.paymentText,
                  selectedPayment?.id === method.id && styles.selectedPaymentText
                ]}>
                  {method.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity
          style={[
            styles.donateButton,
            (!amount || !selectedTemple || !selectedPayment) && styles.disabledButton
          ]}
          disabled={!amount || !selectedTemple || !selectedPayment}
        >
          <LinearGradient
            colors={['#4a90e2', '#357abd']}
            style={styles.donateGradient}
          >
            <Text style={styles.donateText}>Proceed to Donate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  templesGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  templeCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedTempleCard: {
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  templeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  templeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  templeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  templeLocation: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  amountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  amountButton: {
    width: (width - 64) / 3,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedAmountButton: {
    backgroundColor: '#4a90e2',
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedAmountText: {
    color: '#fff',
  },
  customAmount: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 16,
  },
  paymentGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedPaymentButton: {
    backgroundColor: '#4a90e2',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPaymentText: {
    color: '#fff',
  },
  donateButton: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  donateGradient: {
    padding: 16,
    alignItems: 'center',
  },
  donateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DonationScreen;