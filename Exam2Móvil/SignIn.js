import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función para interpretar errores y mostrar mensajes amigables
  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/user-not-found':
        return 'No tiene cuenta registrada';
      case 'auth/invalid-email':
        return 'Correo no válido';
      case 'auth/user-disabled':
        return 'Cuenta deshabilitada. Contacte soporte.';
      default:
        return 'Datos no válidos. Intente de nuevo.';
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      onSignIn();
    } catch (e) {
      setError(getErrorMessage(e.code));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F7FB',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D0D7DE',
  },
  error: {
    color: '#FF4D4F',
    marginBottom: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4B7BEC',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#4B7BEC',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
