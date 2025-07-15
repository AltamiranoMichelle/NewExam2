import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función para interpretar errores y mostrar mensajes amigables
  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado';
      case 'auth/invalid-email':
        return 'Correo no válido';
      case 'auth/weak-password':
        return 'La contraseña es muy débil (mínimo 6 caracteres)';
      default:
        return 'Error en el registro. Intente de nuevo.';
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      setError('');
      onSignUp();
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
