

import { StyleSheet } from "react-native";

const inputs = StyleSheet.create({
    inputs:{
        backgroundColor: "#5767742f",
        height: 59,
        width:"326", 
        flexDirection:"row",
        borderRadius: 10,
        overflow: "hidden",    // garante que o conteúdo não ultrapasse as bordas arredondadas
        alignItems: "center",
        borderWidth:1,
        borderColor:"#4D5963",
        paddingLeft:15,
        margin:20,
    },
    text:{
        fontSize:16,
        color:"#000000",
        fontFamily:"Poppins",
        fontWeight:"bold",
        marginLeft:20,
        marginBottom:-15,
        marginTop:10,   


    },
  picker: {
    height: 50,
    width: "100%",
  }
})

export default inputs;

