import axios from 'axios';

// BASE DE DATOS
const URL = 'https://tarea-crud-829b3-default-rtdb.firebaseio.com';

// GUARDAR EN BASE DE DATOS
export async function saveReporte(task) {
    try {
        await axios.post(`${URL}/reportes.json`, task);
        console.log("Reporte guardado en Firebase");
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
    }
}

// ELIMINAR
export function removeReporte(id) {
    return axios.delete(`${URL}/reportes/${id}.json`);
}

// EDITAR
export function updateReporte(id, task) {
    return axios.put(`${URL}/reportes/${id}.json`, task);
}

// OBTENER DESDE BASE DE DATOS
export async function getReportes() {
    const response = await axios.get(`${URL}/reportes.json`);
    const reportes = [];

    for (const key in response.data) {
        const obj = {
            id: key,
            name: response.data[key].name,
            date: new Date(response.data[key].date), 
            location: {
                lat: response.data[key].location?.lat,
                lng: response.data[key].location?.lng
            }
        };
        reportes.push(obj);
    }

    return reportes.reverse();
}
