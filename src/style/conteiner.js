

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    conteinerMain:{
        flex: 1,
        backgroundColor: "#F6F7F9",
        alignItems: "center",
        justifyContent: "center",
    
    },
    controlScroll:{
        width: "90%",
        height: "90%",
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        overflow: "hidden", 
        backgroundColor: "#ffffff",
    },
    Text:{
        fontSize:25,
        fontFamily:"Poppins",
        fontWeight:"bold",
        width:"170",
    
    },
    subTitle:{
        fontSize:18,
        fontFamily:"Poppins",
        fontWeight:"bold",
        color:"#4D5963",
    },
    iconPefil:{
        backgroundColor:"#18B351",
        width:78,
        height:74,
        borderRadius:44,
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:28,
        fontFamily:"Poppins",
        color:"#FFFFFF",
        fontWeight:"bold",
    },
    perfilEnd:{
        width:"73%",
    },

    iconConfig:{
        backgroundColor:"#E7F8ED",
        width:78,
        height:74,
        borderRadius:10,
        display: "flex", // não faz muita diferença em usar ou não, mas é bom para consistência
        alignItems: "center",
        justifyContent: "center",

    },
    imageIcon:{
        width: 46,
        height: 46,

    },
    iconsInput:{
        width: 31,
        height: 31,
        marginEnd:10,
    }
    
})

export default styles;

