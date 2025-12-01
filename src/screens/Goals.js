import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

const Goals = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Exemplo: usuário logado com idUsuario = 1
  const idUsuario = 1;

  // Buscar metas do servidor
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.1.8:3000/meta/${idUsuario}`);
      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.erro || "Não foi possível carregar as metas");
        setLoading(false);
        return;
      }

      setGoals(data);
    } catch (err) {
      console.error("Erro ao buscar metas:", err);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const activeGoals = goals.filter((g) => g.progresso < g.valorObjetivo).length;
  const completedGoals = goals.filter((g) => g.progresso >= g.valorObjetivo).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas Financeiras</Text>
      <Text style={styles.subtitle}>Defina e acompanhe seus objetivos financeiros</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("NewGoal", { idUsuario })}
      >
        <Text style={styles.createButtonText}>Criar Meta</Text>
      </TouchableOpacity>

      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Metas Ativas</Text>
          <Text style={styles.statusValue}>{activeGoals}</Text>
        </View>
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Concluídas</Text>
          <Text style={styles.statusValue}>{completedGoals}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filter}>Todos</Text>
        <Text style={styles.filter}>|</Text>
        <Text style={styles.filter}>Ativos</Text>
        <Text style={styles.filter}>|</Text>
        <Text style={styles.filter}>Feitos</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <ScrollView style={styles.goalList}>
          {goals.map((goal) => {
            const progressPercent = ((goal.progresso / goal.valorObjetivo) * 100).toFixed(1);
            const expired = new Date(goal.prazo) < new Date();

            return (
              <View key={goal.idMeta} style={styles.goalCard}>
                <Text style={styles.goalStatus}>Ativo | Médio</Text>
                <Text style={styles.goalTitle}>{goal.descricao}</Text>
                <Text style={styles.goalProgress}>Progresso: {progressPercent}%</Text>

                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>

                <Text style={styles.goalAmount}>
                  R$ {goal.progresso.toFixed(2)} / R$ {goal.valorObjetivo.toLocaleString("pt-BR")}
                </Text>
                <Text style={styles.goalDeadline}>
                  {goal.prazo} - {expired ? "Vencida" : "Em andamento"}
                </Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity>
                    <Text style={styles.actionText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.actionText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  createButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  createButtonText: { color: "#fff", fontWeight: "bold" },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  statusBox: { alignItems: "center" },
  statusLabel: { fontSize: 14, color: "#888" },
  statusValue: { fontSize: 18, fontWeight: "bold" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  filter: { marginHorizontal: 8, fontSize: 14, color: "#555" },
  goalList: { flex: 1 },
  goalCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  goalStatus: { fontSize: 12, color: "#999" },
  goalTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 4 },
  goalProgress: { fontSize: 14, marginTop: 8 },
  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: { height: 8, backgroundColor: "#4CAF50" },
  goalAmount: { fontSize: 14, fontWeight: "bold", marginTop: 4 },
  goalDeadline: { fontSize: 12, color: "#d32f2f", marginTop: 4 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionText: { color: "#2196F3", fontWeight: "bold" },
});

export default Goals;