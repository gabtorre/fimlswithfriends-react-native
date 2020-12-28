import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const {login} = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Login</Text>
			<FormInput
				labelValue={email}
				onChangeText={(userEmail) => setEmail(userEmail)}
				placeholderText="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<FormInput
				labelValue={password}
				onChangeText={(userPassword) => setPassword(userPassword)}
				placeholderText="Password"
				secureTextEntry={true}
			/>

			<FormButton
				buttonTitle="Sign In"
				onPress={() => login(email, password)}
			/>
		</View>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 20,
	  paddingTop: 50
	},
	logo: {
	  height: 150,
	  width: 150,
	  resizeMode: 'cover',
	},
	text: {
	  fontSize: 28,
	  marginBottom: 10,
	  color: '#051d5f',
	},
	navButton: {
	  marginTop: 15,
	},
	forgotButton: {
	  marginVertical: 35,
	},
	navButtonText: {
	  fontSize: 18,
	  fontWeight: '500',
	  color: '#2e64e5',
	},
  });
