class assistancesService {
    constructor(assistancesRepository) {
        this.assistancesRepository = assistancesRepository;
    }

    async getAllAssistances() {
        try {
            const assistances = await this.assistancesRepository.getAllAssistances();
            return assistances;
        } catch (error) {
            throw new Error("Error al obtener las Asistencias: " + error.message);
        }
    }

    async createAssistance(dataAssistance) {
        try {
            const assistance = await this.assistancesRepository.createAssistance(dataAssistance);
            return assistance;
        } catch (error) {
            throw new Error("(SERVICE - createAssistance) Error al generar asistencia: " + error.message);
        }
    }

}

export default assistancesService;