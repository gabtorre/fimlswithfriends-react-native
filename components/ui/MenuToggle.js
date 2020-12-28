import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function MenuToggle({ navigation }) {

  return (
    <View style={styles.container}>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
