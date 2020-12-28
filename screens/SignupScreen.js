import React, { useState, useContext} from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, ImageBackground, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [password2, setPassword2] = useState();
	const {register} = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<ImageBackground source={require("../assets/landing.jpg")} style={styles.bgImage}>
			<Text style={styles.title}>Create an Account</Text>
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
			<FormInput
				labelValue={password2}
				onChangeText={(userPassword2) => setPassword2(userPassword2)}
				placeholderText="Confirm Password"
				secureTextEntry={true}
			/>
			<TouchableHighlight
				style={styles.loginBtn}
				onPress={password == password2
					? () => register(email, password)
					: () => Alert.alert("passwords do not match")
				}
			>
				<Text style={styles.loginBtnText}>Register</Text>
			</TouchableHighlight>
			</ImageBackground>
		</View>
	)
}

export default SignupScreen;

const styles = StyleSheet.create({
	container: {
	  backgroundColor: '#0E111D',
	  flex: 1
	},
	title: {
		fontSize: 28,
		marginBottom: 50,
		color: '#F5F5F1',
		textAlign: "center",
	  },
	navButton: {
	  marginTop: 15,
	},
	navButtonText: {
	  fontSize: 18,
	  fontWeight: '500',
	  color: '#2e64e5',
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
	bgImage: {
		flex: 1,
		resizeMode: "cover",
		alignItems: 'center',
		padding: 20,
		paddingTop: 50,
	}
  });
