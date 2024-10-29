import axios from 'axios';

//BASE DE DATOS
const URL='https://tarea-crud-829b3-default-rtdb.firebaseio.com'

//GUARDAR EN BASE DE DATOS 
export function saveReporte(task){
    axios.post(URL+"/reportes.json", task)
}

//ELIMINAR
export function removeReporte(id){
    //axios.delete(URL+"/reportes/"+id+".json") 2 formas 
    axios.delete(`${URL}/reportes/${id}.json`)
}

//EDITAR 
export function updateReporte(id, task){
    //axios.put(URL+"/reportes/"+id+".json", task)
    axios.delete(`${URL}/reportes/${id}.json`, task)
}

//OBTENER DESDE BASE DE DATOS
export async function getReportes (){
    const response = await axios.get(`${URL}/reportes.json`)

    const reportes = []
    for (const key in response.data){
        const obj={
            id: key,
            name: response.data[key].name,
            date: Date(response.data[key].date)
        }
        reportes.push(obj)
    }
    return reportes;
}