import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import Firebase, { db } from '../firebase';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';

export default function AddPostModal({ route, navigation }) {

  const [text, onChangeText] = useState('');
  const { title, poster, movieid, date, overview } = route.params;

  const auth = Firebase.auth();
  const uid = auth.currentUser.uid;
  const postRef = db.collection("posts");
  const movieRef = db.collection("users").doc(uid);

  const movieDetails = { movieid, title, date, poster };

  const newPost = {
    text,
    movieid,
    title,
    poster,
    release: date,
    synopsis: overview,
    username: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    rating: 0,
    comments: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    uid,
    likes: []};

  const addPost = async () => {
    await movieRef.update({
      watched: firebase.firestore.FieldValue.arrayUnion(movieDetails)
    })

    await postRef.add(newPost)
    .then(async () => {
      navigation.goBack();
    })
    onChangeText("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
    <StatusBar hidden />
      <ScrollView bounces={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()} >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster}`,
          }}
          />
          <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>Release Date: {date}</Text>
            <Text style={styles.title}>Overview: {overview}</Text>
          </View>
          <TextInput
          editable
          maxLength={40}
          multiline
          numberOfLines={4}
          style={{ borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => onChangeText(text)}
          value={text}
          />
          <FormButton buttonTitle="Post" onPress={addPost}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#181D2F',
  },
  wrapper: {
    marginLeft: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
  },
  image: {
    height: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 999,
  }
});
