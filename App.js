import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReportesScreen from './screen/ReportesScreen';
import ReporteEditScreen from './screen/ReporteEditScreen';
import Map from './screen/Map'; 
import ReporteContextProvider from './store/reporte-context';
import { LocationProvider } from './context/LocationContext';

const Stack = createStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <LocationProvider>
                <ReporteContextProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Reporte" component={ReportesScreen} />
                            <Stack.Screen name="Edit" component={ReporteEditScreen} />
                            <Stack.Screen name="Map" component={Map} /> 
                        </Stack.Navigator>
                    </NavigationContainer>
                </ReporteContextProvider>
            </LocationProvider>
        </>
    );
}
