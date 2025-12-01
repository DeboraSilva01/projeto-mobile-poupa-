import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu e-mail");
      return;
    }
    // Aqui você implementaria a lógica de reset de senha
    Alert.alert(
      "E-mail enviado",
      "Instruções de recuperação foram enviadas para seu e-mail",
      [{ text: "OK", onPress: () => navigation.navigate("Login") }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.appTitle}>Poupa+</Text>
          
          <Text style={styles.welcome}>Recuperar Senha</Text>
          
          <Text style={styles.description}>
            Digite seu e-mail cadastrado para receber as instruções de recuperação de senha
          </Text>

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#8a8a8a"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleResetPassword}
          >
            <Text style={styles.primaryBtnText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.link}>Voltar para login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  card: {
    width: "92%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appTitle: {
    alignSelf: "flex-start",
    fontSize: 25,
    color: "#444343ff",
    marginBottom: 6,
    fontFamily: "Italiana_400Regular",
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#e9e9e9",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    color: "#222",
  },
  primaryBtn: {
    marginTop: 18,
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 16,
  },
  link: {
    color: "#1877f2",
    textDecorationLine: "underline",
  },
});