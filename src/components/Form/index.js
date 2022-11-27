import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Vibration, Keyboard, Pressable, FlatList, Button } from "react-native";
import { ResultImc } from "./ResultImc";
import { styles } from "./style";
import {FontAwesome} from '@expo/vector-icons'


export const Form= ()=>{
const [height, setHeight] = useState ('')
const [weight, setWeight] = useState ('')
const [messageImc, setMessageImc] = useState ('preencha o peso e altura')
const [imc, setImc] = useState (null)
const [textButton, setTextButton] = useState ('calcular')
const [alertText, setAlertText] = useState ('')
const [imcList, setImcList] = useState ([])


const exItem =(index) =>{
const arrTemp = [...imcList]
arrTemp.splice(index, 1)
setImcList(arrTemp)
}

const imcCalculator = ()=>{
let converteHeight = height.replace(',', '.')
let converteWeight = weight.replace(',', '.')
let totalImc = ((converteWeight/(converteHeight*converteHeight)).toFixed(2))
setImc(totalImc)
setImcList([...imcList, {id:new Date().getTime().toString(), imc:totalImc}])
}

const validationImc = ()=>{
if(weight.length > 0 && height.length > 0){  
imcCalculator()
setHeight('')
setWeight('')
setMessageImc('Seu índice de massa corporal :')
setAlertText('')
setTextButton('calcular novamente')
}
else{
setAlertText('campo obrigatório')
setImc(null)
setTextButton('calcular')
setMessageImc('preencha o peso e altura')
Vibration.vibrate()
}  
    
}


    return(
       
       <View >
           {imc === null ?  //regra de renderização    
        <Pressable onPress={Keyboard.dismiss} style={styles.boxContainer}>
              <View style={styles.form}> 
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.alertText}>{height.length > 0 ? '' : alertText}</Text>
                    <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="Ex: 1.75" keyboardType="numeric" ></TextInput>
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.alertText}>{weight.length > 0 ? '' : alertText}</Text>
                    <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="Ex: 73.75" keyboardType="numeric"></TextInput>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={validationImc}><Text style={styles.textButtonCalculator}>{textButton}</Text></TouchableOpacity>
            </View>
        </Pressable>:
         // continuidade da regra
    <View style={styles.containerResult}>
            <View style={styles.containerImc}>
                    <ResultImc messageImc={messageImc}Imc={imc}/>
                    <TouchableOpacity style={styles.buttonCalculator} onPress={validationImc}>
                            <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.containerList}>

            <FlatList style={styles.List} keyExtractor={(item) => {item.id}}  data={imcList}  renderItem={({item, index})  => {return( 
                <View  style={styles.box}> 
                <Text style={styles.textResult}>Resultado IMC: {item.imc} </Text><TouchableOpacity onPress={() => exItem(index)} style={styles.buttonTrash}><FontAwesome name='trash' size={25}></FontAwesome></TouchableOpacity>
                </View>
            )}}/>
            </View>
            
            
    </View>} 
            

               
                      
    </View> 
                
    
    )
}
