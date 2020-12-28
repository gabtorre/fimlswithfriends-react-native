import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const {login} = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../assets/landing.jpg")} style={styles.bgImage}>
			<Text style={styles.title}>Films with Friends</Text>
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

			<TouchableHighlight
				style={styles.loginBtn}
				onPress={() => login(email, password)}
			>
				<Text style={styles.loginBtnText}>Login</Text>
			</TouchableHighlight>
			</ImageBackground>
		</View>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0E111D',
		flex: 1
	  },
	logo: {
	  height: 150,
	  width: 150,
	  resizeMode: 'cover',
	},
	title: {
	  fontSize: 28,
	  marginBottom: 50,
	  color: '#F5F5F1',
	  textAlign: "center",
	},
	loginBtn: {
		backgroundColor: '#DC3545',
		width: '50%',
		borderRadius: 10
	},
	loginBtnText: {
	color: '#F5F5F1',
	textAlign: "center",
	padding: 3,
	fontSize: 20,

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
	bgImage: {
		flex: 1,
		resizeMode: "cover",
		alignItems: 'center',
		padding: 20,
		paddingTop: 50,
	}
  });
