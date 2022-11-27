import React from "react"
import { View, Text, TouchableOpacity, Share} from "react-native"
import { styles } from "./style"




export const ResultImc = ({messageImc, Imc}) =>{
    const onShare = async () =>{
   const result = await Share.share({
            message: `Meu imc de hoje é : ${Imc}`
        })
    }
    return(
        
        <View style={styles.Container}>
           <Text style={styles.messageImc}>{messageImc}</Text>
            <Text style={styles.messageResult}>{Imc}</Text> 
            <TouchableOpacity onPress={onShare} style={styles.buttonShare}>
                <Text style={styles.textShare}>Compartilhar</Text>
            </TouchableOpacity> 
        </View>
               
        
        
    )
}

