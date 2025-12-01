import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../style/conteiner";
import inputs from "../components/input";
import button from "../components/Button";

export default function Profile() {
  const [nome, setNome] = useState("Maria Silva");
  const [email, setEmail] = useState("maria@exemple.com");
  const [sistema, setSistema] = useState("");
  const [idioma, setIdioma] = useState("");
  const [moeda, setMoeda] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    if (isEditing) {
      // Aqui você pode salvar os dados com AsyncStorage se quiser
      console.log("Salvando dados:", { nome, sistema, idioma, moeda });
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.conteinerMain}>
      <View style={styles.controlScroll}>
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}>
          {/* Cabeçalho */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 20, height: 80, alignItems: "center", paddingLeft: 5 }}>
            <Text style={styles.Text}>Informações Pessoais</Text>
            <TouchableOpacity style={button.button} onPress={toggleEdit}>
              <Text style={button.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
            </TouchableOpacity>
          </View> 

          {/* Perfil */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", height: 80, alignItems: "center" }}>
            <Text style={styles.iconPefil}>{nome.charAt(0)}</Text>
            <View style={styles.perfilEnd}>
              <Text style={styles.Text}>{nome}</Text>
              <Text style={styles.subTitle}>{email}</Text>
            </View>
          </View>

          {/* Nome completo */}
          <View>
            <Text style={inputs.text}>Nome completo</Text>
            <View style={inputs.inputs}>
              <Image style={styles.iconsInput} source={require("../image/do-utilizador.png")} />
              <TextInput
                placeholder="Nome Completo"
                placeholderTextColor={"#4D5963"}
                value={nome}
                onChangeText={setNome}
                editable={isEditing}
              />
            </View>
          </View>

          {/* Email */}
          <View style={inputs.conteiner}>
            <Text style={inputs.text}>Email</Text>
            <View style={inputs.inputs}>
              <Image style={styles.iconsInput} source={require("../image/e-mail.png")} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#4D5963"}
                value={email}
                editable={false}
              />
            </View>
          </View>

          {/* Preferência */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", height: 80, alignItems: "center" }}>
            <View style={styles.iconConfig}>
              <Image style={styles.imageIcon} source={require("../image/globo.png")} />
            </View>
            <View style={styles.perfilEnd}>
              <Text style={styles.Text}>Preferência</Text>
              <Text style={styles.subTitle}>Configure idioma, moeda e aparência</Text>
            </View>
          </View>

          {/* Sistema */}
          <View>
            <Text style={inputs.text}>Sistema</Text>
            <View style={inputs.inputs}>
              <Picker
                selectedValue={sistema}
                onValueChange={setSistema}
                style={inputs.picker}
                enabled={isEditing}
              >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Claro" value="claro" />
                <Picker.Item label="Escuro" value="escuro" />
              </Picker>
            </View>
          </View>

          {/* Idioma */}
          <View>
            <Text style={inputs.text}>Idioma</Text>
            <View style={inputs.inputs}>
              <Picker
                selectedValue={idioma}
                onValueChange={setIdioma}
                style={inputs.picker}
                enabled={isEditing}
              >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Português (BRL)" value="br" />
                <Picker.Item label="Inglês (USD)" value="us" />
              </Picker>
            </View>
          </View>

          {/* Moeda */}
          <View>
            <Text style={inputs.text}>Moeda</Text>
            <View style={inputs.inputs}>
              <Picker
                selectedValue={moeda}
                onValueChange={setMoeda}
                style={inputs.picker}
                enabled={isEditing}
              >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Real Brasileiro (BRL)" value="brl" />
                <Picker.Item label="Dólar Americano (USD)" value="usd" />
              </Picker>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}