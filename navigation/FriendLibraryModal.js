import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import Movie from '../components/Library/Movie';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FriendLibraryModal({ route, navigation }) {
    const { uid, displayName } = route.params;
    const [movies] = useDocumentData(db.doc('users/' + uid));

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <Text style={styles.header}>{displayName}'s Watch List</Text>
        <ScrollView horizontal bounces style={styles.scrollView}>
          {movies && movies.watchlist.map(movie =>
            <TouchableOpacity key={movie.movieid}
            onPress={() => navigation.navigate('MyModal', {
              title: movie.title,
              poster: movie.poster,
              date: movie.date,
              movieid: movie.movieid,
              rating: movie.rating,
              list: "watchlist"
            })} >
              <Movie key={movie.movieid} title={movie.title} poster={movie.poster} />
            </TouchableOpacity>
          )}
        </ScrollView>
        <Text style={styles.header}>Watched List</Text>
        <ScrollView horizontal bounces style={styles.scrollView}>
          {movies && movies.watched.map(movie =>
            <TouchableOpacity key={movie.movieid}
            onPress={() => navigation.navigate('MyModal', {
              title: movie.title,
              poster: movie.poster,
              date: movie.date,
              movieid: movie.movieid,
              rating: movie.rating,
              list: "watched"
            })} >
              <Movie key={movie.movieid} title={movie.title} poster={movie.poster} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    width: '100%',
  },
  header: {
    color: 'white',
    fontSize: 23,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
  },
  close: {
    position: "absolute",
    right: "5%",
    top: "5%",
    zIndex: 999,
    shadowOffset: { width: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
});
