import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../firebase';
import Movie from '../components/Library/Movie';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function LibraryScreen({ navigation }) {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;
  const [movies] = useDocumentData(db.doc('users/' + currentUser));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <Text style={styles.header}>Watch List</Text>
        <ScrollView horizontal bounces style={styles.scrollView}>
          {movies && movies.watchlist.map(movie =>
            <TouchableOpacity key={movie.movieid}
            onPress={() => navigation.navigate('MyModal', {
              title: movie.title,
              poster: movie.poster,
              date: movie.date,
              movieid: movie.movieid,
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
            onPress={() => navigation.navigate('MyModal',{ title: movie.title })} >
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
    marginBottom: 10,
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
});
