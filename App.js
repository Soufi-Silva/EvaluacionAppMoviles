import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReportesScreen from './screen/ReportesScreen';
import ReporteEditScreen from './screen/ReporteEditScreen';
import ReporteContextProvider from './store/reporte-context';


const Stack = createStackNavigator();
export default function App() {
  return (
    <>
    <StatusBar style='dark'/>
    <ReporteContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Reporte' component={ReportesScreen} />
          <Stack.Screen name='Edit' component={ReporteEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReporteContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  
});
