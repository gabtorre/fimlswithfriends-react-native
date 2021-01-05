import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { TMDBAPI } from "@env";
import { user } from "../navigation/AuthProvider";
import firebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth();

class SearchScreen extends React.Component {
  state = {
    query: "",
    suggestions: null,
    searched: false,
    TMDBAPI: TMDBAPI,
    userSuggestions: null,
  };

  search = () => {
    if (this.state.query) {
      axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.state.TMDBAPI}&language=en-US&query=${this.state.query}&page=1&include_adult=false`
      )
        .then((result) => {
          this.setState({
            suggestions: result.data.results,
          });
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    }
    if (this.state.query) {
      const docs = [];
      const updateUserSearch = () => {
        this.setState({ userSuggestions: docs, userFound: true });
      };
      firebase
        .firestore()
        .collection("users")
        .where("displayName", "==", this.state.query)
        .get()
        .then((snaps) => {
          snaps.forEach(async (doc) => {
            const pid = await doc.id;
            const pdata = await doc.data();
            let followedStatus = await firebase
              .firestore()
              .collection("users")
              .where(
                firebase.firestore.FieldPath.documentId(),
                "==",
                auth.currentUser.uid
              )
              .where("friendlist", "array-contains", pid)
              .get();
            docs.push({
              displayName: pdata.displayName,
              uid: pid,
              photoURL: pdata.photoURL,
              followed: followedStatus.empty,
            });
            updateUserSearch();
          });
        })
        .catch(function (error) {
          console.error("Error getting documents: ", error);
        });
    }
  };

  handleFollow = async () => {
    const usersRef = await firebase.firestore().collection("users").doc(uid);
    await usersRef.update({
      friendlist: firebase.firestore.FieldValue.arrayUnion(props.data.uid),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TextInput
            editable
            style={styles.searchbar}
            onChangeText={(text) =>
              this.setState({ query: text }, () => this.search())
            }
            placeholder="Movie Lookup"
            placeholderTextColor="grey"
          />
        </SafeAreaView>
        <ScrollView style={styles.posts}>
        <View style={styles.row}>
            {this.state.userSuggestions &&
              this.state.userSuggestions.map((friend) => (
                <View style={styles.userCard} key={friend.uid}>
                  <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("FriendLibraryModal", {
                      uid: friend.uid,
                      displayName: friend.displayName
                    })
                  }
                  key={friend.uid}
                  style={styles.userCardWrapper}>
                    <Text style={styles.userCardText}>
                      {friend.displayName}
                    </Text>
                  </TouchableOpacity>
                  {friend.followed ? (
                    <TouchableOpacity
                      style={styles.userFollowBtn}
                      onPress={() => this.handleFollow}
                    >
                      <Text style={styles.userCardText}>+ Follow</Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.userFollowBtn}
                      onPress={() => this.handleFollow}
                    >
                      <Text style={styles.userCardText}>Followed</Text>
                    </View>
                  )}
                </View>
              ))}
              </View>
              <View style={styles.row}>
            {this.state.suggestions &&
              this.state.suggestions.map((post) => (
                <TouchableOpacity
                  style={styles.movie}
                  key={post.id}
                  onPress={() =>
                    this.props.navigation.navigate("AddPostModal", {
                      title: post.title,
                      poster: post.poster_path,
                      date: post.release_date,
                      year: post.release_date.substring(0, 4),
                      movieid: post.id,
                      overview: post.overview,
                      rating: post.vote_average,
                    })
                  }
                >
                  <ImageBackground
                    key={post.id}
                    style={styles.column}
                    source={
                      post.poster_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500/${post.poster_path}`,
                          }
                        : {
                            uri:
                              "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg",
                          }
                    }
                  >
                    {post.release_date ? (
                      <Text style={styles.midTitle}>
                        {post.title} ({post.release_date.substring(0, 4)})
                      </Text>
                    ) : (
                      <Text style={styles.midTitle}>{post.title}</Text>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181D2F",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    maxWidth: 200,
    height: 250,
    width: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  movie: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  posts: {
    paddingTop: 10,
    width: "100%",
  },
  header: {
    margin: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    alignItems: "center",
  },
  midTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    backgroundColor: "#000000a0",
  },
  postPoster: {
    height: 250,
    width: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  searchbar: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    color: "white",
    borderRadius: 10,
    padding: 5,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 5,
    backgroundColor: "#0E111D",
  },
  userCardWrapper: {
    flexDirection: "row",
    width: "50%",
    backgroundColor: "#0E111D",
  },
  userCardText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
  },
  userFollowBtn: {
    flexDirection: "row",
    backgroundColor: "#DC3545",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
});
export default SearchScreen;
