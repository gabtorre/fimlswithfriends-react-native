import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Firebase, { db } from "../firebase";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WatchButton } from "../components/Post/LikeButton";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

export default function AddPostModal({ route, navigation }) {
  const [text, onChangeText] = useState("");
  const { title, poster, movieid, year, date, overview, rating } = route.params;
  const [star, setStar] = useState(rating / 2);

  const auth = Firebase.auth();
  const uid = auth.currentUser.uid;
  const postRef = db.collection("posts");
  const movieRef = db.collection("users").doc(uid);

  const movieDetails = { movieid, title, date, poster };

  console.log(movieDetails);

  const newPost = {
    text,
    movieid,
    title,
    poster,
    release: date,
    synopsis: overview,
    username: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    rating: star,
    comments: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    uid,
    likes: [],
  };

  const addPost = async () => {
    await movieRef.update({
      watched: firebase.firestore.FieldValue.arrayUnion(movieDetails),
    });

    await postRef.add(newPost).then(async () => {
      navigation.goBack();
    });
    onChangeText("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <ImageBackground
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster}`,
          }}
        >
          <View style={styles.btnsRow}>
            <WatchButton
              style={styles.add}
              title={title}
              poster={poster}
              movieid={movieid}
              date={date}
              navigation={navigation}
            />
          </View>
          <LinearGradient
            colors={["transparent", "rgba(24,29,47,1)"]}
            style={styles.gradientPosition}
          />
        </ImageBackground>

        <View key={movieid} style={styles.postBigWrapper}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.header}>
              {title} ({year})
            </Text>
            <Text style={styles.title}>Release Date: {date}</Text>
            <View key={movieid} style={styles.movieWrapper}>
              <Text style={styles.overviewText}>Overview: {overview}</Text>
            </View>
            <Stars
              half={true}
              default={rating / 2}
              update={(val) => {
                setStar(val);
              }}
              spacing={5}
              starSize={100}
              count={5}
              fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={"star-outline"}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={"star-half"} style={[styles.myStarStyle]} />
              }
            />
            <View style={styles.sectionWrapper}>
              <View style={styles.commentWrapper}>
                <View>
                  <TextInput
                    style={{ height: 100, color: "white" }}
                    placeholder="What do you think?"
                    placeholderTextColor="grey"
                    editable
                    maxLength={40}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => onChangeText(text)}
                    value={text}
                  />
                  <Button
                    title="share"
                    onPress={() => addPost()}
                    type="submit"
                  />
                </View>
              </View>
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
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
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
    paddingTop: 0,
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
    width: 500,
  },
  overviewText: {
    color: "#F5F5F1",
    fontSize: 15,
    margin: 2,
    width: "100%",
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
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    height: 500,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  sectionWrapper: {
    width: "100%",
    alignItems: "center",
  },
  commentWrapper: {
    padding: 10,
    alignItems: "center",
    width: "99%",
    overflow: "hidden",
    backgroundColor: "#171C2E",
    borderRadius: 10,
    margin: 5,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});
