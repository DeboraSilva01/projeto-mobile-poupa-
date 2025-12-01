import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ViewShot from 'react-native-view-shot';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 40;

export default function RelatorioScreen() {
  const viewShotRef = useRef(null);
  const [pieData, setPieData] = useState([]);
  const idUsuario = 1; // pode vir do contexto ou login

  useEffect(() => {
    fetch(`http://192.168.1.8:3000/transacao/${idUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          Alert.alert('Erro', 'Resposta inválida do servidor');
          return;
        }

        // Agrupar valores por categoria
        const categoriasMap = {};
        data.forEach((t) => {
          const cat = t.idCategoria || 'Outros';
          if (!categoriasMap[cat]) {
            categoriasMap[cat] = { receita: 0, despesa: 0 };
          }
          if (t.tipo === 'entrada') {
            categoriasMap[cat].receita += t.valor;
          } else if (t.tipo === 'saida') {
            categoriasMap[cat].despesa += t.valor;
          }
        });

        // Converter para formato do PieChart
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0', '#00BCD4'];
        const pieArray = Object.keys(categoriasMap).map((cat, i) => {
          const total = categoriasMap[cat].receita - categoriasMap[cat].despesa;
          return {
            name: `Cat ${cat}`,
            population: Math.abs(total), // valor absoluto para mostrar no gráfico
            color: colors[i % colors.length],
            legendFontColor: '#333',
            legendFontSize: 12,
          };
        });

        setPieData(pieArray);
      })
      .catch((err) => {
        console.error('Erro ao carregar transações:', err);
        Alert.alert('Erro', 'Não foi possível carregar os dados do relatório');
      });
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Tela Relatório</Text>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { marginBottom: 32 }]}>Distribuição de Gastos e Receitas</Text>

          <View style={styles.topBox}>
            <ViewShot
              ref={viewShotRef}
              options={{ format: 'png', quality: 0.9, result: 'base64' }}
              style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-start', paddingTop: 8 }}
            >
              <View style={styles.chartWrap}>
                <PieChart
                  data={pieData}
                  width={chartWidth}
                  height={200}
                  hasLegend={false}
                  chartConfig={{
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>
            </ViewShot>

            <View style={styles.legenda}>
              {pieData.map((item) => (
                <View key={item.name} style={styles.legendaItem}>
                  <View style={[styles.bullet, { backgroundColor: item.color }]} />
                  <Text style={styles.legendaText}>{item.name}: R$ {item.population.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f2f2' },
  container: { padding: 12, paddingBottom: 120 },
  headerTitle: { color: '#999', fontSize: 14, marginLeft: 4, marginBottom: 6 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, elevation: 4 },
  topBox: { height: 360, backgroundColor: '#f5f5f5', borderRadius: 6, marginBottom: 14, padding: 8 },
  legenda: { marginTop: 12, flexDirection: 'column', alignItems: 'flex-start' },
  legendaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  bullet: { width: 10, height: 10, borderRadius: 6, marginRight: 8 },
  legendaText: { fontSize: 15, color: '#222' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 6, marginBottom: 8, textAlign: 'center' },
  chartWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});