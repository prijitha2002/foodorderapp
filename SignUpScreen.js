import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Parse from 'parse/react-native';
import { useRoute } from '@react-navigation/native';

function SignUpScreen({ navigation }) {
  const route = useRoute();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const isStrongPassword = (input) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    return passwordRegex.test(input);
  };

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError('Oops! Passwords do not match');
        return;
      }

      if (!isStrongPassword(password)) {
        setPasswordError('Password requirements not met: it should be at least 8 characters long, feature an uppercase letter along with a special character');
        return;
      }

      const user = new Parse.User();
      user.set('username', username);
      user.set('password', password);

      if (emailOrMobile.includes('@')) {
        user.set('email', emailOrMobile);
      } else {
        user.set('mobileNumber', emailOrMobile);
      }

      await user.signUp();
      console.log('Signed up successfully:', user);
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.spaceAboveContainer} />

      <View style={styles.inputAndButtonContainer}>
        <View style={styles.loginSignupButtons}>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableButton,
              route.name === 'SignUp' && styles.activeButton,
            ]}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.buttonText,
              route.name === 'SignUp' && styles.activeButtonText,
            ]}>SignUp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.header}>Start Today</Text>
          <TextInput
            placeholder="Name"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            placeholderTextColor="#777777"
          />
          <TextInput
            placeholder="Email or Mobile Number"
            value={emailOrMobile}
            onChangeText={(text) => setEmailOrMobile(text)}
            style={styles.input}
            placeholderTextColor="#777777"
          />

          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="#777777"
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? require('./eye-on.png') : require('./eye-off.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            {passwordError !== '' && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>

          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              placeholderTextColor="#777777"
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={showConfirmPassword ? require('./eye-on.png') : require('./eye-off.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.ortext}>or</Text>

          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => {
                // Add your social media sign-up logic here (e.g., Google)
              }}
            >
              <View style={{ width: 50, height: 50 }}>
                <Image
                  source={require('./googleicon.png')}
                  style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => {
                // Add your social media sign-up logic here (e.g., Facebook)
              }}
            >
              <View style={{ width: 50, height: 50 }}>
                <Image
                  source={require('./fb.png')}
                  style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => {
                // Add your social media sign-up logic here (e.g., iOS)
              }}
            >
              <View style={{ width: 50, height: 50 }}>
                <Image
                  source={require('./ios.png')}
                  style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  spaceAboveContainer: {
    flex: 1,
    backgroundColor: '#FFC836',
  },
  inputAndButtonContainer: {
    backgroundColor: '#FFC836',
    marginBottom: 10,
  },
  loginSignupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  touchableButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 24,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderColor: 'red',
  },
  activeButtonText: {
    color: 'red',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#D1D0CE',
    borderColor: 'white',
    borderRadius: 15,
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
  },
  signUpButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 12,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ortext: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginRight: 20,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default SignUpScreen;
