class schedulesService {
    constructor(schedulesRepository) {
        this.schedulesRepository = schedulesRepository;
    }

    async getAllSchedules() {
        try {
            const schedules = await this.schedulesRepository.getAllSchedules();
            return schedules;
        } catch (error) {
            throw new Error("Error al obtener los horarios: " + error.message);
        }
    }

    async getScheduleById(id) {
        try {
            const schedule = await this.schedulesRepository.getScheduleById(id);
            return schedule;
        } catch (error) {
            throw new Error("Error al obtener el horario por ID: " + error.message);
        }
    }

    async createSchedule(dataSchedule) {
        try {
            const schedule = await this.schedulesRepository.createSchedule(dataSchedule);
            return schedule;
        } catch (error) {
            throw new Error("(SERVICE - createSchedule) Error al crear el horario: " + error.message);
        }
    }

    async updateSchedule(scheduleId, dataSchedule) {
        try {
            return await this.schedulesRepository.updateSchedule(scheduleId, dataSchedule);
        } catch (error) {
            console.error("(SERVICE - updateSchedule) Error al actualizar el horario");
            throw error;
        }
    }

}

export default schedulesService;