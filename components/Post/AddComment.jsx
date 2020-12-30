import React from "react";
import { StyleSheet, View, TextInput, Button, Form } from "react-native";

export default function AddComment() {
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.commentWrapper}>
        <View style={styles.row}>
          <TextInput
            style={{ height: 40, flex: 0.9 , color: "white" }}
            placeholder="Enter Comment Here"
            placeholderTextColor="grey"
          />
          <Button style={{flex: 0.1}} title="submit" type="submit"/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
