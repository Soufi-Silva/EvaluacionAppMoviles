import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import { ReporteContext } from "../store/reporte-context";
import ReporteItem from "../components/ReporteItem";
import { getReportes } from "../http";

function ReportesScreen() {
    const reporteCTX = useContext(ReporteContext);
    const [isError, setError] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton 
                    name="add" 
                    color="#000000" 
                    onPress={() => navigation.navigate('NewReporte')}
                />
            )
        });
    }, [navigation]);

    useEffect(() => {
        async function getReport() {
            try {
                const reportes = await getReportes();
                reporteCTX.modifyReportes(reportes);
                setError(false);
            } catch (error) {
                setError(true);
            }
        }
    
        getReport();
    }, [reporteCTX]);
    
    function renderReporte(obj) {
        return <ReporteItem id={obj.item.id} name={obj.item.name} date={obj.item.date.toString()} location={obj.item.location} />;
    }

    return (
        <View>
            {isError ? (
                <Text>Error al cargar los reportes</Text>
            ) : (
                <FlatList
                    data={reporteCTX.reportes}
                    renderItem={renderReporte}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

export default ReportesScreen;
