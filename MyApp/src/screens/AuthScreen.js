import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleAuth = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      // Simulate authentication
      Alert.alert('Success', `${isLogin ? 'Login' : 'Signup'} successful as ${role}!`);
      navigation.navigate(role === 'Patient' ? 'PatientPortal' : 'DoctorPortal');
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Social Login', `Logging in with ${provider}`);
    // Implement social login logic here
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password recovery functionality to be implemented.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="CardiacTek" subtitle="Healthcare Portal" />
        <Card.Content>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'Patient' && styles.selectedRole]}
              onPress={() => setRole('Patient')}
            >
              <Text style={styles.roleText}>Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'Doctor' && styles.selectedRole]}
              onPress={() => setRole('Doctor')}
            >
              <Text style={styles.roleText}>Doctor</Text>
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              {passwordError && password !== confirmPassword ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </>
          )}

          {/* Auth Button */}
          <Button mode="contained" onPress={handleAuth} style={styles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>

          {/* Forgot Password */}
          {isLogin && (
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Toggle Login/Signup */}
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
                <Icon name="android" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Apple')}>
                <Icon name="phone-iphone" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedRole: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  roleText: {
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
  toggleText: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    alignItems: 'center',
  },
  orText: {
    marginVertical: 10,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  socialButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default AuthScreen;
