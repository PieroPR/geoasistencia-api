import { Op } from "sequelize";
import Assistance from "../../infraestructure/models/assistanceModel.js";
import Schedule from "../../infraestructure/models/scheduleModel.js";
import Salon from "../../infraestructure/models/salonModel.js";
import Course from "../../infraestructure/models/courseModel.js";

// Función para calcular la distancia entre dos puntos en coordenadas geográficas
function haversine(lat1, lon1, lat2, lon2) {
    // Radio de la Tierra en metros
    const R = 6371000;

    // Convertir grados a radianes
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;

    // Diferencia de latitud y longitud
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    // Fórmula Haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

// Función para verificar si las coordenadas actuales están dentro del diámetro especificado
function verificarDentroDelDiametro(baseLat, baseLon, diametro, currentLat, currentLon) {
    // Calcular la distancia entre las coordenadas base y actuales
    const distance = haversine(baseLat, baseLon, currentLat, currentLon);

    // Comprobar si la distancia es menor o igual al diámetro
    if (distance <= diametro / 2) {
        return true;
    } else {
        return false;
    }
}
// validarFechaRegistro(hora_ingreso_curso, tolerancia, hora_registro_asistencia);
function validarFechaRegistro(fechaEntrada, tolerancia, fechaActual) {
    if (fechaActual < fechaEntrada || fechaActual > new Date(fechaEntrada.getTime() + tolerancia)) {
        // console.log("Tu registro es inválido. No puedes marcar antes de la hora del curso o después del tiempo de tolerancia.");
        return false;
        // return "Tu registro es inválido. No puedes marcar antes de la hora del curso o después del tiempo de tolerancia.";
    } else {
        // console.log("Registro exitoso.");
        return true;
        // return "Registro exitoso.";
    }
}

function mostrar_mensaje(txt, value) {
    console.log(' \n \n ');
    console.log(txt + ": ", value);
    console.log("typeof " + txt + ": ", typeof value);
    console.log(' \n ');
}

class schedulesRepository {
    constructor(connection) {
        this.connection = connection;
    }

    async getAllAssistances() {
        try {
            const assistances = await Assistance.findAll({
                include: [],
                order: [["id_asistencia", "ASC"]],
            });

            if (assistances.length <= 0) {
                return false;
            }

            const assistancesData = assistances.map((assistance) => ({
                id_asistencia: assistance.id_asistencia,
                id_docente: assistance.id_docente,
                id_horario: assistance.id_asistencia,
                latitude_asistencia: assistance.latitude_asistencia,
                longitude_asistencia: assistance.longitude_asistencia,
                hora_registro_asistencia: assistance.hora_registro_asistencia,
            }));

            return assistancesData;
        } catch (error) {
            throw error;
        }
    }

    async createAssistance(dataAssistance) {
        try {
            const { id_docente, id_horario, latitude_asistencia, longitude_asistencia, hora_registro_asistencia } = dataAssistance;

            const schedule = await Schedule.findOne({
                where: { id_horario: id_horario },
            });

            const idSalon = schedule.dataValues.id_salon;
            const idCurso = schedule.dataValues.id_curso;

            const salon = await Salon.findOne({
                where: { id_salon: idSalon },
            });

            const course = await Course.findOne({
                where: { id_curso: idCurso },
            });


            const hora_ingreso_curso = course.dataValues.hora_ingreso_curso;
            const minutoSchedule = parseInt(schedule.dataValues.minuto);
            const hora_registro_asistence = new Date(hora_registro_asistencia);

            // mostrar_mensaje("hora_ingreso_curso", hora_ingreso_curso)

            const tolerancia = minutoSchedule * 60 * 1000; // 30 minutos en milisegundos

            // mostrar_mensaje("hora_ingreso_curso", hora_ingreso_curso)

            mostrar_mensaje("hora_ingreso_curso", hora_ingreso_curso);
            mostrar_mensaje("minutoSchedule", minutoSchedule);
            mostrar_mensaje("hora_registro_asistencia", hora_registro_asistencia);

            const resultado_validarFechaRegistro = validarFechaRegistro(hora_ingreso_curso, tolerancia, hora_registro_asistence);

            mostrar_mensaje("resultado_validarFechaRegistro", resultado_validarFechaRegistro)

            if (!resultado_validarFechaRegistro) {
                return 1;
            }

            const latitudeSalon = parseFloat(salon.dataValues.latitude_salon);
            const longitudeSalon = parseFloat(salon.dataValues.longitude_salon);
            const radiusSalon = parseFloat(salon.dataValues.radius_salon);

            const verificarDentroDelDiametro_valor = verificarDentroDelDiametro(latitudeSalon, longitudeSalon, radiusSalon, latitude_asistencia, longitude_asistencia);

            if (!verificarDentroDelDiametro_valor) {
                return 2;
            }

            const newAssistance = await Assistance.create({
                id_docente: id_docente,
                id_horario: id_horario,
                latitude_asistencia: latitude_asistencia,
                longitude_asistencia: longitude_asistencia,
                hora_registro_asistencia: hora_registro_asistencia
            });

            if (verificarDentroDelDiametro_valor && resultado_validarFechaRegistro && newAssistance) {
                return 3;
            }


        } catch (error) {
            throw error;
        }
    }

}

export default schedulesRepository;
