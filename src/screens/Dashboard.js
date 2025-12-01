import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function Dashboard({ navigation }) {
  const [balanceData, setBalanceData] = useState({ total: 0, income: 0, expenses: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const idUsuario = 1; // pode vir do contexto ou login

  // Carregar transações do backend
  useEffect(() => {
    fetch(`http://192.168.1.8:3000/transacao/${idUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          Alert.alert('Erro', 'Resposta inválida do servidor');
          return;
        }

        // Calcular receitas e despesas
        let income = 0;
        let expenses = 0;
        data.forEach((t) => {
          if (t.tipo === 'entrada') {
            income += t.valor;
          } else if (t.tipo === 'saida') {
            expenses += t.valor;
          }
        });

        setBalanceData({
          total: income - expenses,
          income,
          expenses,
        });

        // Mostrar apenas últimas 5 transações
        setRecentTransactions(data.slice(0, 5));
      })
      .catch((err) => {
        console.error('Erro ao carregar transações:', err);
        Alert.alert('Erro', 'Não foi possível carregar as transações');
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Maria!</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Card de Saldo */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo Total</Text>
        <Text style={styles.balanceValue}>R$ {balanceData.total.toFixed(2)}</Text>
        <View style={styles.balanceDetails}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Receitas</Text>
            <Text style={styles.incomeValue}>+ R$ {balanceData.income.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Despesas</Text>
            <Text style={styles.expenseValue}>- R$ {balanceData.expenses.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Atalhos */}
      <View style={styles.shortcuts}>
        <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('NewGoal')}>
          <Text style={styles.shortcutIcon}>🎯</Text>
          <Text style={styles.shortcutText}>Nova Meta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('Goals')}>
          <Text style={styles.shortcutIcon}>📊</Text>
          <Text style={styles.shortcutText}>Metas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.shortcutIcon}>💰</Text>
          <Text style={styles.shortcutText}>Transações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shortcutButton} onPress={() => navigation.navigate('Relatorio')}>
          <Text style={styles.shortcutIcon}>📈</Text>
          <Text style={styles.shortcutText}>Relatório</Text>
        </TouchableOpacity>
      </View>

      {/* Últimas Transações */}
      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Últimas Transações</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.seeAllButton}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((transaction) => (
          <View key={transaction.idTransacao} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionDescription}>{transaction.descricao || 'Sem descrição'}</Text>
              <Text style={styles.transactionDate}>{transaction.data}</Text>
            </View>
            <Text
              style={[
                styles.transactionValue,
                transaction.tipo === 'entrada' ? styles.incomeValue : styles.expenseValue,
              ]}
            >
              {transaction.tipo === 'entrada' ? '+' : '-'} R$ {transaction.valor.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 48 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
  date: { color: '#666', marginTop: 4 },
  avatar: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#2e7d32', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  balanceCard: { backgroundColor: '#2e7d32', margin: 16, padding: 20, borderRadius: 12, elevation: 2 },
  balanceLabel: { color: '#fff', opacity: 0.8 },
  balanceValue: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  balanceDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  balanceItem: { flex: 1 },
  balanceItemLabel: { color: '#fff', opacity: 0.8, fontSize: 12 },
  shortcuts: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 16 },
  shortcutButton: { alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, width: '30%', elevation: 1, marginBottom: 12 },
  shortcutIcon: { fontSize: 24, marginBottom: 8 },
  shortcutText: { color: '#2e7d32', fontSize: 12, fontWeight: '600' },
  transactionsSection: { backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12, elevation: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#2e7d32' },
  seeAllButton: { color: '#2e7d32', fontSize: 14 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  transactionDescription: { fontSize: 16, fontWeight: '500' },
  transactionDate: { color: '#666', fontSize: 12, marginTop: 4 },
  transactionValue: { fontSize: 16, fontWeight: '600' },
  incomeValue: { color: '#2e7d32' },
  expenseValue: { color: '#c62828' },
});