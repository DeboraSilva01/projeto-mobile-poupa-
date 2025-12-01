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
  ActivityIndicator,
} from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.0.100:3000/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.erro || "Credenciais inválidas");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", `Bem-vindo, ${data.nome}!`, [
        { text: "OK", onPress: () => navigation.navigate("Dashboard") },
      ]);
    } catch (err) {
      console.error("login error", err);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.appTitle}>Poupa+</Text>
          <Text style={styles.welcome}>Entrar</Text>

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

          <Text style={[styles.label, { marginTop: 12 }]}>Senha:</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Digite sua senha"
              placeholderTextColor="#8a8a8a"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
            />
            <TouchableOpacity
              onPress={() => setSecure((s) => !s)}
              style={styles.eyeBtn}
            >
              <Text style={styles.eyeText}>{secure ? "👁" : "🙈"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.smallText}>Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Criar conta</Text>
            </TouchableOpacity>
          </View>
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
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
    textAlign: "center",
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
  passwordRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  eyeBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeText: {
    fontSize: 18,
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
  link: {
    color: "#1877f2",
    marginTop: 12,
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  smallText: {
    color: "#666",
  },
});