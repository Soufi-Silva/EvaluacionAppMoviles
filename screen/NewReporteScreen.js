import React from 'react';
import { View } from 'react-native';
import NewReporte from '../components/NewReporte';

function NewReporteScreen({ navigation }) { //cree esto para poder usar el context y vovler al newreportes porque no me dejaba al ser componente 
    return (  //perdi 2 dias en esto 
        <View style={{ flex: 1 }}>
            <NewReporte 
                onAddReporte={() => navigation.goBack()} 
                
            />
        </View>
        
    );
}

export default NewReporteScreen;
