import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MemberCard = ({
  name = "श्रीमान तरुण जी काग",
  title = "Sports Minister",
  location = "Sunkadakatte, Bangalore",
  imageUrl = "/placeholder.svg?height=200&width=200",
  message = "सीरवी समाज ट्रस्ट सुनकदकट्टे बेंगलौर पश्चिम के खेल मंत्री बनने पर श्रीमान तरुण जी काग को सीरवी खेल और सांस्कृतिक क्लब की ओर से हार्दिक बधाई एवं शुभकामनाएं।",
  clubName = "Seervi Sports & Cultural Club"
}) => {
  return (
    <View style={styles.card}>
      {/* Gold corner accents */}
      <View style={styles.cornerTopRight} />
      <View style={styles.cornerBottomLeft} />

      {/* Club Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: '/placeholder.svg?height=96&width=96' }}
          style={styles.logo}
        />
      </View>

      {/* Club Name and Location */}
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{clubName}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Member Photo with Laurel Wreath */}
      <View style={styles.photoContainer}>
        <View style={styles.laurelLeft}>
          <Image
            source={{ uri: '/placeholder.svg?height=120&width=60' }}
            style={styles.laurel}
          />
        </View>
        
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.laurelRight}>
          <Image
            source={{ uri: '/placeholder.svg?height=120&width=60' }}
            style={styles.laurel}
          />
        </View>
      </View>

      {/* Name Banner */}
      <View style={styles.nameBanner}>
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeContainer}>
        <Image
          source={{ uri: '/placeholder.svg?height=64&width=64' }}
          style={styles.decorativeImage}
        />
        <Image
          source={{ uri: '/placeholder.svg?height=64&width=64' }}
          style={styles.decorativeImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#1a1150',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    opacity: 0.2,
    transform: [{ rotate: '45deg' }],
    translateX: 16,
    translateY: -16,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    opacity: 0.2,
    transform: [{ rotate: '45deg' }],
    translateX: -16,
    translateY: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  clubInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  clubName: {
    fontSize: 24,
    color: '#FFD700',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  location: {
    fontSize: 18,
    color: 'white',
  },
  photoContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  laurelLeft: {
    position: 'absolute',
    left: -30,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  laurelRight: {
    position: 'absolute',
    right: -30,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  nameBanner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    backgroundColor: '#FFD700',
    color: '#1a1150',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  decorativeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  decorativeImage: {
    width: 64,
    height: 64,
  },
});

export default MemberCard;
