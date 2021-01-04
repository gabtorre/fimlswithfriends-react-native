import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddPost from '../components/Post/AddPost'
import { WatchButton } from "../components/Post/LikeButton";
import { db } from "../firebase";

export default function SearchModal({ route, navigation }) {
  const { title, poster, movieid, year, date, overview, rating } = route.params;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView style={styles.posts}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.postPoster}
            resizeMode={"cover"}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${poster}`,
            }}
          ></ImageBackground>
          <View style={styles.btnsRow}>
            <WatchButton
              style={styles.add}
              title={title}
              poster={poster}
              movieid={movieid}
              date={date}
            />
          </View>
          <View key={movieid} style={styles.postBigWrapper}>
            <View style={styles.sectionWrapper}>
                <Text style={styles.header}>{title} ({year})</Text>
              <View key={movieid} style={styles.movieWrapper}>
                <Text style={styles.overviewText}>{overview}</Text>
              </View>
              <AddPost/>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#181D2F",
    alignItems: "center",
  },
  sectionWrapper: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  minicolumn: {
    flexDirection: "column",
    marginLeft: 5,
  },
  postLeft: {
    width: "30%",
    padding: 10,
  },
  postRight: {
    width: "70%",
    padding: 10,
  },
  header: {
    color: "#F5F5F1",
    fontSize: 20,
    fontWeight: "bold",
  },
  posts: {
    width: "100%",
    flexDirection: "column",
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postWrapper: {
    padding: 10,
    alignItems: "center",
    width: "99%",
    overflow: "hidden",
    borderRadius: 10,
    margin: 5,
  },
  movieWrapper: {
    padding: 20,
    alignItems: "center",
    width: "100%",

  },
  postBigWrapper: {
    padding: 10,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#0E111D",
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 20,
    margin: 5,
    color: "#F5F5F1",
  },
  postText: {
    color: "#F5F5F1",
    fontSize: 10,
    margin: 2,
    width: 500
  },
  overviewText: {
    color: "#F5F5F1",
    fontSize: 15,
    margin: 2,
    width: '100%',
    padding: 10,
  },
  posterWrapper: {
    alignItems: "center",
    width: "100%",
  },
  postPoster: {
    minHeight: 500,
    minWidth: "100%",
    resizeMode: "cover",
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
  btnsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
