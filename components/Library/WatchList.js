import React from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import Firebase, { db } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Movie from './Movie';

export default function WatchList() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;
  const [movies] = useDocumentData(db.doc('users/' + currentUser));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Watched List</Text>
      <ScrollView horizontal bounces style={styles.scrollView}>
        {movies && movies.watchlist.map(movie =>
          <Movie key={movie.movieid} title={movie.title} poster={movie.poster}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 10,
  },
  header: {
    color: 'white',
    fontSize: 23,
    fontWeight: '700',
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});
