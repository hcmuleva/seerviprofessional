import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOne } from "@refinedev/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");
const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

const ProfileMobile = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [userid, setUserid] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: "Manish",
    age: "24",
    bio: "I love coding and outdoor activities!",
  });
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userid");
      setUserid(storedUserId);
    };

    getUserId();
  }, []);

  const { data, isLoading, error } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["photo", "jobs"],
    },
  });

  useEffect(() => {
    if (data?.data) {
      setProfileImageUrl(data.data.photo?.url); // Set initial profile image URL
    }
  }, [data]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data?.data;

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant camera roll permissions to upload photos."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        uploadPhoto(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error(error);
    }
  };

  const uploadPhoto = async (photoAsset) => {
    setUploading(true);

    try {
      const userId = await AsyncStorage.getItem("userid");
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!userId || !token) {
        Alert.alert("Error", "Please login first");
        return;
      }

      // First, upload the file
      const formData = new FormData();
      const fileExtension = photoAsset.uri.split(".").pop();
      formData.append("files", {
        uri: photoAsset.uri,
        type: `image/${fileExtension}`,
        name: `profile-photo.${fileExtension}`,
      });

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      const uploadedFiles = await uploadResponse.json();
      const photoId = uploadedFiles[0].id;

      // Then update the user's photo field
      const updateResponse = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: photoId }),
      });

      if (!updateResponse.ok) throw new Error("Failed to update user profile");

      Alert.alert("Success", "Profile photo updated successfully");

      // Refresh profile image URL after upload
      setProfileImageUrl(uploadedFiles[0].url); // Assuming you get the URL back in response
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", error.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const sections = [
    {
      key: "overview",
      label: "BasicInfo",
      features: [
        "Personal",
        "Job",
        "Contact",
        "Family",
        "Educational",
        "LifeStyle",
      ],
    },
    {
      key: "professional",
      label: "Professional",
      features: ["Experience", "Skills", "Certifications"],
    },
    {
      key: "address",
      label: "Address",
      features: ["Current Address", "Permanent Address"],
    },
    {
      key: "project",
      label: "Project",
      features: ["Current Projects", "Completed Projects"],
    },
    {
      key: "activities",
      label: "Activities",
      features: ["Recent Activities", "Achievements"],
    },
    {
      key: "subscriptions",
      label: "Subscription",
      features: ["Current Plan", "Benefits"],
    },
  ];

  const renderGoldCard = ({ item }) => (
    <View style={styles.goldCard}>
      <View style={styles.goldHeader}>
        <View style={styles.goldTitleContainer}>
          <FontAwesome name="fire" size={20} color="#FFB800" />
          <Text style={styles.goldTitle}>{item.label}</Text>
        </View>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() =>
            navigation.navigate("ProfileTabs", {
              userData: user,
              userid: userid,
              itemKey: item,
            })
          }
        >
          <Text style={styles.upgradeButtonText}>See</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.featuresTitle}>What's Included</Text>
      <View style={styles.featureTable}>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureText}>{feature}</Text>
            <FontAwesome name="check" size={16} color="#000" />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {user?.myrole && (
        <View style={[styles.roleBadge, { backgroundColor: "#86878B" }]}>
          <Text style={styles.roleBadgeText}>{user.myrole}</Text>
        </View>
      )}

      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: "../images/logo.png" }} style={styles.logo} />
          <View style={styles.headerRight}>
            {/* <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
              <Image
                source={{ uri: profileImageUrl || "../images/logo.png" }}
                style={styles.profileIcon}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.editButton}Edit
                onPress={pickImage}
              >
                <Feather
                  name="edit-2"
                  size={12}
                  color="#fff"
                />
              </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="settings" size={20} color="#86878B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {/* Displaying Profile Image */}
            <Image
              style={styles.profileImage}
              source={{ uri: profileImageUrl || "../images/logo.png" }}
            />
            {/* Completion Badge */}
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>55% COMPLETE</Text>
            </View>
          </View>
          {/* User Name */}
          <Text style={styles.nameText}>
            {`${user?.firstname || ""} ${user?.lastname || ""}`}
          </Text>
          {/* User Username */}
          <Text style={styles.usernameText}>{user?.username || ""}</Text>
        </View>

        {/* Gold Cards Section */}
        <FlatList
          data={sections}
          renderItem={renderGoldCard}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goldCardsContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#FF406C",
  },
  editButton: {
    position: "absolute",
    right: 109, // Adjust this value to position the button closer to or further from the image
    bottom: -135, // Adjust this value to position the button higher or lower
    backgroundColor: "#000",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF406C",
    zIndex: 1,
  },
  completionBadge: {
    position: "absolute",
    bottom: -8,
    backgroundColor: "#FF406C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  usernameText: {
    fontSize: 14,
    color: "#86878B",
    marginVertical: 4,
  },
  roleText: {
    fontSize: 16,
    marginTop: 4,
  },
  goldCardsContainer: {
    paddingHorizontal: 12,
  },
  goldCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    width: width - 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  goldHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goldTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  goldTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  upgradeButton: {
    backgroundColor: "#FFB800",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  upgradeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
  },
  roleBadge: {
    position: "absolute",
    top: 70,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  roleBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ProfileMobile;
