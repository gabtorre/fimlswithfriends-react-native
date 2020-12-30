import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const DeleteButton = (props) => {
  const auth = Firebase.auth();
  const uid = auth.currentUser.uid;
  const usersRef = db.collection("users").doc(uid);

  const [postData] = useDocumentData(usersRef)

    console.log(uid)

    const deleteMovie = async (e) => {

        const movieDetails = {
            movieid: props.id,
            title: props.title,
            date: props.release,
            poster: props.poster,
        }

        usersRef.update('watchlist', db.FieldValue.arrayRemove('movieDetails'));
    };

    return (
        <>
          <TouchableOpacity
              width="auto"
              alt="Delete Movie"
              onPress={deleteMovie}
              className="mr-2" >
              <Ionicons name="trash" size={32} color="white" />
              <Text>{props.movieid}{props.title}{props.date}{props.poster}{props.list}</Text>
          </TouchableOpacity>
        </>
    );
}

export default DeleteButton;
