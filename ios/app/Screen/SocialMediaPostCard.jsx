import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SocialMediaPostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.postTime}>{post.postTime}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Interaction Buttons */}
      <View style={styles.interactionBar}>
        <TouchableOpacity style={styles.interactionButton}>
          <Feather name="heart" size={24} color="#666" />
          <Text style={styles.interactionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Feather name="message-circle" size={24} color="#666" />
          <Text style={styles.interactionText}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Feather name="share-2" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        {post.comments.slice(0, 2).map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.commentUser}>{comment.user}: </Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
        {post.comments.length > 2 && (
          <TouchableOpacity>
            <Text style={styles.viewMoreComments}>
              View all {post.comments.length} comments
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTime: {
    color: '#666',
    fontSize: 12,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    marginBottom: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 5,
    color: '#666',
  },
  commentsSection: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentContent: {
    flex: 1,
  },
  viewMoreComments: {
    color: '#666',
    marginTop: 5,
  },
});

export default SocialMediaPostCard;