import React, { useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, Text } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserList from './UserList';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.card}>
          {showSignUp ? (
            <>
              <SignUp onSignUp={() => setShowSignUp(false)} />
              <Button
                title="¿Ya tienes cuenta? Iniciar sesión"
                onPress={() => setShowSignUp(false)}
                color="#4B7BEC"
              />
            </>
          ) : (
            <>
              <SignIn onSignIn={() => {}} />
              <Button
                title="¿No tienes cuenta? Registrarse"
                onPress={() => setShowSignUp(true)}
                color="#4B7BEC"
              />
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.card, { flex: 1 }]}>
        <UserList />
        <View style={styles.logoutButton}>
          <Button title="Cerrar sesión" onPress={() => signOut(auth)} color="#FF5C5C" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  logoutButton: {
    marginTop: 20,
  },
});
