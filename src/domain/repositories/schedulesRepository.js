import { Op } from "sequelize";
import Schedule from "../../infraestructure/models/scheduleModel.js";

class schedulesRepository {
    constructor(connection) {
        this.connection = connection;
    }

    async getAllSchedules() {
        try {
            const schedules = await Schedule.findAll({
                include: [],
                order: [["id_horario", "ASC"]],
            });

            if (schedules.length <= 0) {
                return false;
            }

            const schedulesData = schedules.map((schedule) => ({
                id_horario: schedule.id_horario,
                id_curso: schedule.id_curso,
                id_salon: schedule.id_salon,
                hora: schedule.hora,
                minuto: schedule.minuto
            }));

            return schedulesData;
        } catch (error) {
            throw error;
        }
    }

    async getScheduleById(id) {
        try {
            const schedule = await Schedule.findOne({
                where: { id_horario: id }
            });

            if (!schedule) { return false; }

            return schedule;
        } catch (error) {
            throw error;
        }
    }

    async createSchedule(dataSchedule) {
        try {
            const { id_curso, id_salon, hora, minuto } = dataSchedule;

            // Crear un nuevo salón en la base de datos
            const newSchedule = await Schedule.create({
                id_curso: id_curso,
                id_salon: id_salon,
                hora: hora,
                minuto: minuto
            });

            return newSchedule;
        } catch (error) {
            throw error;
        }
    }

    async updateSchedule(id_schedule, dataSchedule) {
        try {
            const schedule = await Schedule.findOne({
                where: { id_horario: id_schedule },
            });

            const { id_curso, id_salon, hora, minuto, fecha } = dataSchedule;

            if (!schedule) {
                throw new Error('Horario no encontrado');
            }

            schedule.id_curso = id_curso;
            schedule.id_salon = id_salon;
            schedule.hora = hora;
            schedule.minuto = minuto;
            schedule.fecha = fecha;

            await schedule.save();
            return schedule;
        } catch (error) {
            throw error;
        }
    }
}

export default schedulesRepository;
