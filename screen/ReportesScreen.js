import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState , useEffect} from "react";
import IconButton from "../components/IconButton";
import NewReporte from "../components/NewReporte";
import { ReporteContext } from "../store/reporte-context";
import ReporteItem from "../components/ReporteItem";
import {getReportes } from "../http";



function ReportesScreen(){
    const reporteCTX = useContext(ReporteContext);
    const [isError, setError]= useState(false);
    const navigator = useNavigation();

    const [showModal, setShowModal]=useState(false)


    function activeModal(){
        setShowModal(true)
    }

    function hideModal(){
        setShowModal(false)
    }


    useLayoutEffect(()=>{
        navigator.setOptions({
            headerRight:()=><IconButton 
                                name='add' 
                                color='#000000'
                                onPress={activeModal}/>
        })
    },[])

    useEffect(() => {
        setShowModal(false); 
    }, []);
    

    useEffect( ()=>{
        async function getReport(){
            try{
            const reportes = await getReportes()
            reporteCTX.modifyReportes(reportes)
            setError(false)
            }catch(error){
                setError(true)
            }
        }
    
        getReport();
    }, [])
    

    function renderReporte(obj){
        return <ReporteItem id={obj.item.id} name={obj.item.name} date={obj.item.date.toString()} location={obj.item.location}/>
    }

    return (
        <View>
            <NewReporte showModal={showModal} hideModal={hideModal} />
            {
                isError?
                <Text>
                    error
                </Text>
                :
            <FlatList
                data={reporteCTX.reportes}
                renderItem={renderReporte}
                keyExtractor={(item)=>item.id}
                />
            }

        </View>
    )
}

export default ReportesScreen;