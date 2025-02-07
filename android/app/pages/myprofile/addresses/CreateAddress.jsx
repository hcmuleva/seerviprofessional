import React, { useState } from 'react';
import { View, Text, Button, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';
// import AddressComponent from '../../../components/address/AddressComponent';



export default function CreateAddress({ setType }) {
  const [addressType, setAddressType] = useState("");
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = () => {
    try {
      setType("LIST");
    } catch (error) {
      Alert.alert("Error", "There was an issue updating your profile.");
    }
  };

  const handleSelectAddressType = (type) => {
    setAddressType(type);
    setModalVisible(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Address Type</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}>
        <Text>{addressType || "Select address type"}</Text>
      </TouchableOpacity>

      {/* Modal for Address Type Selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 15 }}>Select Address Type</Text>
            <TouchableOpacity onPress={() => handleSelectAddressType('CURRENT')}>
              <Text style={{ marginVertical: 10 }}>CURRENT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectAddressType('PERMANENT')}>
              <Text style={{ marginVertical: 10 }}>PERMANENT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectAddressType('BUSINESS')}>
              <Text style={{ marginVertical: 10 }}>BUSINESS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectAddressType('ORIGINAL')}>
              <Text style={{ marginVertical: 10 }}>ORIGINAL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red', marginTop: 15 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <AddressComponent form={form} setForm={setForm} /> */}
      <Button title="Create Address" onPress={onFinish} />
    </View>
  );
}
