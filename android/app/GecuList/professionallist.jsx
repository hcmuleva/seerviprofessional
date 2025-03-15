import React, { useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Book,
  GitBranch,
  Droplet,
  Briefcase,
  GraduationCap,
  User,
  Building2,
} from "react-native-feather"
import { Icon } from "react-native-paper"

const ProfileScreenGecu = ({route}) => {
    const { user } = route.params;
    console.log("username", user.FirstName);
    
  const profileData = {
    name: `${user.FirstName + ' ' + user.LastName}`,
    title: "Filmi",
    position: "Superintendent Engineer",
    department: "Retired from U P Irrigation department",
    year: "1967-1973, Civil",
    location: "Lucknow",
    phone: `${user.FirstName + ' ' + user.LastName}`,
    email: "nvsingh23@rediffmail.com",
    birthday: "08-12-XXXX",
    hobbies: "Watching movies, reading and traveling",
    branch: "Civil",
    bloodGroup: "Not Available",
  }

  const [activeTab, setActiveTab] = React.useState("Experience")

  const InfoRow = ({ icon: Icon, label, value }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>
        <Icon stroke="#666" width={18} height={18} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-03-15%2004-29-53.png-4VB0mUqEyl8zNKmgyeiaJj5SO0UMTq.jpeg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.title}>{profileData.title}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.positionInfo}>
            {/* <Building2 stroke="#666" width={20} height={20} /> */}
            <Text style={styles.position}>{profileData.position}</Text>
          </View>
          <Text style={styles.department}>{profileData.department}</Text>
          <Text style={styles.year}>{profileData.year}</Text>
          <View style={styles.locationContainer}>
            {/* <MapPin stroke="#666" width={16} height={16} /> */}
            <Text style={styles.location}>{profileData.location}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <InfoRow icon={Phone} label="Phone :" value={profileData.phone} />
          <InfoRow icon={Mail} label="Email :" value={profileData.email} />
          <InfoRow icon={Calendar} label="Birthday:" value={profileData.birthday} />
          <InfoRow icon={Book} label="Hobbies :" value={profileData.hobbies} />
          <InfoRow icon={GitBranch} label="Branch:" value={profileData.branch} />
          <InfoRow icon={Droplet} label="Blood Group:" value={profileData.bloodGroup} />
        </View>

        <View style={styles.tabContainer}>
          {["Experience", "Education", "About"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <View style={styles.tabContent}>
                {tab === "Experience" && (
                  <Icon width={20} height={20} stroke={activeTab === tab ? "#FF6B6B" : "#666"} />
                )}
                {tab === "Education" && (
                  <Icon width={20} height={20} stroke={activeTab === tab ? "#FF6B6B" : "#666"} />
                )}
                {tab === "About" && <Icon width={20} height={20} stroke={activeTab === tab ? "#FF6B6B" : "#666"} />}
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </View>
            </TouchableOpacity>
          ))}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  positionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  position: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  department: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
    marginLeft: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FFF0F0",
    borderRadius: 8,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
})

export default ProfileScreenGecu;

