import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, Plus, Edit2 } from 'react-native-feather';

const ProfileTabs = ({ route }) => {
  const { userData, userid, itemKey } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(itemKey.key === 'professional' ? 'jobs' :
    itemKey.key === 'address' ? 'address' :
    itemKey.key === 'project' ? 'project' : 
    itemKey.key === 'activities' ? 'activities' : 'personalInfo');

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not Provided") return "Not Provided";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Not Provided";
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const calculateDuration = (fromDate, toDate) => {
    if (!fromDate || fromDate === "Not Provided") return "";
    
    const startDate = new Date(fromDate);
    const endDate = toDate && toDate !== "Not Provided" ? new Date(toDate) : new Date();
    
    if (isNaN(startDate.getTime())) return "";
    
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    
    let totalMonths = years * 12 + months;
    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;
    
    let duration = "";
    if (finalYears > 0) {
      duration += `${finalYears} year${finalYears > 1 ? 's' : ''}`;
    }
    if (finalMonths > 0) {
      if (duration) duration += ' ';
      duration += `${finalMonths} month${finalMonths > 1 ? 's' : ''}`;
    }
    
    return duration ? `(${duration})` : '';
  };

  // Define tabs based on itemKey.key
  const getTabs = () => {
    if (itemKey.key === 'professional') {
      return [
        { id: 'jobs', label: 'Jobs' },
        { id: 'educationInfo', label: 'Education' },
        { id: 'skills', label: 'Skills' }
      ];
    } else if (itemKey.key === 'address') {
      return [
        { id: 'address', label: 'Address' }, // Adding the 'address' tab here
      ];
    }
    else if (itemKey.key === 'project') {
      return [
        { id: 'project', label: 'Project' }, // Adding the 'address' tab here
      ];
    }
    else if (itemKey.key === 'activities') {
      return [
        { id: 'activities', label: 'activities' }, // Adding the 'address' tab here
      ];
    }
    return [
      { id: 'personalInfo', label: 'Personal' },
      { id: 'jobs', label: 'Job' },
      { id: 'contactInfo', label: 'Contact' },
      { id: 'familyDetails', label: 'Family' },
      { id: 'educationInfo', label: 'Educational' },
      { id: 'lifestyle', label: 'LifeStyle' },
      { id: 'preferences', label: 'Preferences' },
    ];
  };

  const getContent = (activeTab) => {
    switch (activeTab) {
      case "personalInfo":
        return {
          name: `${userData?.firstname} ${userData?.lastname}`,
          dob: userData?.dob || "Not Provided",
          age: 28,
          gender: userData?.sex || "Not Provided",
          height: "5'11\"",
          weight: "75 kg",
          bodyType: "Athletic",
          ethnicity: userData?.jati || "Not Provided",
          religion: "Agnostic",
          zodiacSign: "Leo",
        };
      case "jobs":
        return userData?.jobs?.map(job => {
          const fromFormatted = formatDate(job.from);
          const toFormatted = job.to ? formatDate(job.to) : 'Present';
          const duration = calculateDuration(job.from, job.to);
          
          return {
            jobid: job.id || "Not Provided",
            jobTitle: job.post || "Not Provided",
            company: job.organization || "Not Provided",
            experience: job.experience || "Not Provided",
            duration: `${fromFormatted} to ${toFormatted} ${duration}`,
          }
        }) || [];
      case "skills":
        return {
          technicalSkills: "React Native, JavaScript, Python",
          softSkills: "Leadership, Communication",
          languages: "English, Spanish",
          certifications: "AWS Certified Developer",
        };
      case "contactInfo":
        return {
          phone: userData?.mobile || "Not Provided",
          email: userData?.email || "Not Provided",
          address: "Not Available",
        };
      case "familyDetails":
        return {
          mother: userData?.mother || "Not Provided",
          father: userData?.father || "Not Provided",
          siblings: "2 brothers, 1 sister",
        };
      case "educationInfo":
        return {
          degree: userData?.education_level || "Not Provided",
          university: "XYZ University",
          graduationYear: "2019",
        };
      case "lifestyle":
        return {
          hobbies: "Reading, Hiking, Swimming",
          diet: "Vegetarian",
          exercise: "Gym 3 times a week",
        };
      case "preferences":
        return {
          preferredLanguage: "English",
          preferredMusic: "Pop, Jazz",
          travelDestinations: "Japan, Australia, Italy",
        };
      default:
        return {};
    }
  };

  const renderContent = () => {
    const content = getContent(activeTab);

    if (activeTab === 'jobs' && Array.isArray(content)) {
      return (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.addButton}  
            onPress={() => {
              navigation.navigate('AddJob', {
                userid: userid
              });
            }}
          >
            <Plus stroke="white" width={24} height={24} />
            <Text style={styles.addButtonText}>Add Job</Text>
          </TouchableOpacity>
          
          {content.map((job, index) => (
            <View key={index} style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Job Title:</Text>
                <Text style={styles.value}>{job.jobTitle}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Company:</Text>
                <Text style={styles.value}>{job.company}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Experience:</Text>
                <Text style={styles.value}>{job.experience}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Duration:</Text>
                <Text style={styles.value}>{job.duration}</Text>
              </View>
              
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  navigation.navigate('EditJob', {
                    jobid: job.jobid,
                  });
                }}
              >
                <Edit2 stroke="white" width={24} height={24} />
                <Text style={styles.editButtonText}>Edit Job</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      );
    }
    else if (activeTab === 'address') {
      return (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.addButton}  
            onPress={() => {
              navigation.navigate('AddAddress', {
                userid: userid
              });
            }}
          >
            <Plus stroke="white" width={24} height={24} />
            <Text style={styles.addButtonText}>Add Address</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{content.address}</Text>
            </View>
          </View>
        </ScrollView>
      );
    }
    else if (activeTab === 'project') {
      return (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.addButton}  
            onPress={() => {
              navigation.navigate('AddProject', {
                userid: userid
              });
            }}
          >
            <Plus stroke="white" width={24} height={24} />
            <Text style={styles.addButtonText}>Add Project</Text>
          </TouchableOpacity>

        </ScrollView>
      );
    }
    else if (activeTab === 'activities') {
      return (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.addButton}  
            onPress={() => {
              navigation.navigate('AddActivities', {
                userid: userid
              });
            }}
          >
            <Plus stroke="white" width={24} height={24} />
            <Text style={styles.addButtonText}>Add Activities</Text>
          </TouchableOpacity>

        </ScrollView>
      );
    }


    return (
      <ScrollView style={styles.formContainer}>
        <View style={styles.infoContainer}>
          {Object.entries(content).map(([key, value]) => (
            <View key={key} style={styles.infoRow}>
              <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate('EditBasicAll', {
                userid: userid,
                currentData: content,
                activeTab: activeTab
              });
            }}
          >
            <Edit2 stroke="white" width={24} height={24} />
            <Text style={styles.editButtonText}>Edit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    
    <View style={styles.tabsWrapper}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsScrollContainer}
      >
        {getTabs().map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

    {renderContent()}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabsScrollContainer: {
    padding: 16,
    gap: 12,
  },
  tab: {
    minWidth: 120,
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    display: "flex",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    padding: 4,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfileTabs;