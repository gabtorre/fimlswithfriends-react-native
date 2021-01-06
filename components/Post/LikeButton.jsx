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
      alt="Like"
      onPress={handleLike}
    >
      <Ionicons name="heart" size={32} color="#DC3545" />
    </TouchableOpacity>
  );
};
