import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import Firebase, { db } from "../../firebase";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../navigation/AuthProvider";

export const LikeButton = ({ postid }) => {
  const { user, setUser } = useContext(AuthContext);
  const uid = user.uid;
  const post = db.collection("posts").doc(postid);

  const handleLike = async () => {
    await post.update({
      likes: firebase.firestore.FieldValue.arrayUnion(uid),
    });
  };

  return (
    <TouchableOpacity
      style={{ marginLeft: "10%" }}
      width="auto"
      alt="Like"
      onPress={handleLike}
      className="mr-2"
    >
      <Ionicons name="heart" size={25} color="#DC3545" />
    </TouchableOpacity>
  );
};

export const WatchButton = ({ movieid, title, date, poster, navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const uid = user.uid;
  const movieRef = db.collection("users").doc(uid);
  const movieDetails = { movieid, title, date, poster };

  const addWatchList = () => {
    movieRef
      .update({
        watchlist: firebase.firestore.FieldValue.arrayUnion(movieDetails),
      })
      .then(async () => {
        navigation.goBack();
      });
  };

  return (
    <TouchableOpacity
      width="auto"
      alt="Add to Watch List"
      onPress={addWatchList}
      className="mr-2"
    >
      <Ionicons name="add" size={32} color="#F5F5F1" />
    </TouchableOpacity>
  );
};
