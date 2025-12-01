import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const NewGoal = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [category, setCategory] = useState("Poupança");
  const [priority, setPriority] = useState("Média");
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // idUsuario vem da navegação (ex: Goals -> NewGoal)
  const idUsuario = route?.params?.idUsuario || 1;

  const handleCreateGoal = async () => {
    if (!title.trim() || !targetValue || !deadline) {
      Alert.alert("Erro", "Preencha os campos obrigatórios (Título, Valor Alvo, Data Limite)");
      return;
    }

    setLoading(true);
    try {
      // ⚠️ Ajuste a URL conforme ambiente:
      // - Emulador Android: http://10.0.2.2:3000/meta/nova
      // - Emulador iOS: http://localhost:3000/meta/nova
      // - Celular físico: http://SEU-IP-LOCAL:3000/meta/nova
      const response = await fetch("http://192.168.1.8:3000/meta/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descricao: title,
          valorObjetivo: parseFloat(targetValue),
          prazo: deadline.toISOString().split("T")[0], // formato YYYY-MM-DD
          progresso: currentValue ? parseFloat(currentValue) : 0,
          idUsuario,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.erro || "Não foi possível criar a meta");
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso", "Meta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Goals") },
      ]);
    } catch (err) {
      console.error("Erro ao criar meta:", err);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Nova Meta</Text>

      <Text style={styles.label}>Título da Meta *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Reserva de Emergência"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva sua Meta..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Valor Alvo *</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0,00"
        keyboardType="numeric"
        value={targetValue}
        onChangeText={setTargetValue}
      />

      <Text style={styles.label}>Valor Atual</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0"
        keyboardType="numeric"
        value={currentValue}
        onChangeText={setCurrentValue}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="Ativo" value="Ativo" />
          <Picker.Item label="Concluído" value="Concluído" />
        </Picker>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Poupança" value="Poupança" />
          <Picker.Item label="Investimento" value="Investimento" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Prioridade</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={priority} onValueChange={setPriority}>
          <Picker.Item label="Alta" value="Alta" />
          <Picker.Item label="Média" value="Média" />
          <Picker.Item label="Baixa" value="Baixa" />
        </Picker>
      </View>

      <Text style={styles.label}>Data Limite *</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>
          {deadline ? deadline.toLocaleDateString("pt-BR") : "Selecione uma data"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDeadline(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateGoal}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Criando..." : "Criar Meta"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 4,
    overflow: "hidden",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  dateText: { fontSize: 14, color: "#333" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  createButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#888",
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default NewGoal;