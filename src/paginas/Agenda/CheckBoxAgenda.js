import React, { useState } from "react"; 
//import Switch from "../../components/Switch/Switch"; 
//import Calendario from '../../components/Calendario/Calendario' 
//import ComboBox from "../../components/ComboBox/ComboBox"; 
 
const CheckBoxAgenda = (props) => { 
 
  const [enteredTratamiento, setEnteredTratamiento] = useState({ 
    corte:false, 
    maquina: false, 
    barba: false, 
    laciado: false, 
    decoloracion: false, 
    tinta:false, 
  }); 
  
 
    const checkBoxHandlerCorte = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        corte:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
    const checkBoxHandlerMaquina = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        maquina:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
  
    const checkBoxHandlerBarba = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        barba:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
    const checkBoxHandlerLaciado = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        laciado:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
    const checkBoxHandlerDecoloracion = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        decoloracion:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
    const checkBoxHandlerTinta = (event) => { 
      //event.preventDefault(); 
      console.log(event); 
      const datosCheckBox = {   
       ...enteredTratamiento,  
        tinta:event.target.checked        
      }; 
      console.log(datosCheckBox); 
      props.onSaveDatosCheckBox(datosCheckBox); 
    setEnteredTratamiento(datosCheckBox); 
    }; 
 
  return ( 
        <div className="nueva-agenda__control"> 
          <label>Tratamiento</label>    
 
            Corte<input 
            type="checkbox"         
            value= "corte" 
            onChange={checkBoxHandlerCorte}    
            checked = {enteredTratamiento.corte}          
          />   
 
           Maquina<input 
            type="checkbox"         
            value= "maquina" 
            onChange={checkBoxHandlerMaquina}    
            checked = {enteredTratamiento.maquina}          
          />    
          Barba<input 
            type="checkbox"         
            value= "barba" 
            onChange={checkBoxHandlerBarba}    
            checked = {enteredTratamiento.barba}          
          />     
             
           Laciado<input 
            type="checkbox"         
            value= "laciado" 
            onChange={checkBoxHandlerLaciado}    
            checked = {enteredTratamiento.laciado}          
          />   
           Decoloracion<input 
            type="checkbox"         
            value= "decoloracion" 
            onChange={checkBoxHandlerDecoloracion}    
            checked = {enteredTratamiento.decoloracion}          
          />   
           Tinta<input 
            type="checkbox"         
            value= "tinta" 
            onChange={checkBoxHandlerTinta}    
            checked = {enteredTratamiento.tinta}          
          />   
        </div> 
  ); 
} 
 
export default CheckBoxAgenda;