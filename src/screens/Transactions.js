import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const Transaction = ({ navigation }) => {
  const [type, setType] = useState('Despesa');
  const [value, setValue] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const idUsuario = 1;

  useEffect(() => {
    fetch(`http://192.168.1.8:3000/categorias/${idUsuario}`)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error('Erro ao carregar categorias:', err);
        Alert.alert('Erro', 'Não foi possível carregar as categorias');
      });
  }, []);

  const handleSave = async () => {
    if (!value || !idCategoria) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios: Valor e Categoria');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.8:3000/transacao/nova", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: type === 'Despesa' ? 'saida' : 'entrada',
          valor: parseFloat(value),
          idCategoria,
          descricao: description,
          data: date.toISOString().split('T')[0],
          idUsuario,
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        Alert.alert('Erro', 'Servidor não retornou JSON válido');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        Alert.alert('Erro', data.erro || 'Não foi possível salvar a transação');
      } else {
        Alert.alert('Sucesso', 'Transação salva com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      Alert.alert('Erro', 'Falha na conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'Despesa' && styles.despesaActive]}
          onPress={() => setType('Despesa')}
        >
          <Text style={styles.typeText}>- Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'Receita' && styles.receitaActive]}
          onPress={() => setType('Receita')}
        >
          <Text style={styles.typeText}>+ Receita</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Valor *</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0,00"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Text style={styles.label}>Categoria *</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={idCategoria} onValueChange={setIdCategoria}>
          <Picker.Item label="Selecione uma categoria" value="" />
          {categorias.map((cat) => (
            <Picker.Item key={cat.idCategoria} label={cat.nome} value={cat.idCategoria} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{date.toLocaleDateString('pt-BR')}</Text>
          <Ionicons name="calendar" size={20} color="#555" />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Descrição (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Adicione uma descrição"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 4,
    overflow: 'hidden',
  },
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  despesaActive: { backgroundColor: '#f44336' },
  receitaActive: { backgroundColor: '#4CAF50' },
  typeText: { color: '#fff', fontWeight: 'bold' },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontSize: 14, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Transaction;