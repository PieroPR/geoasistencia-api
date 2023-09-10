class salonsService {
    constructor(docentsRepository) {
        this.salonsRepository = docentsRepository;
    }

    async getAllSalons() {
        try {
            const salons = await this.salonsRepository.getAllSalons();
            return salons;
        } catch (error) {
            throw new Error("Error al obtener los salones: " + error.message);
        }
    }

    async getSalonById(id) {
        try {
            const salon = await this.salonsRepository.getSalonById(id);
            return salon;
        } catch (error) {
            throw new Error("Error al obtener el salon por ID: " + error.message);
        }
    }

    async createSalon(dataSalon) {
        try {
            const salon = await this.salonsRepository.createSalon(dataSalon);
            return salon;
        } catch (error) {
            throw new Error("(SERVICE - createSalon) Error al crear el salon: " + error.message);
        }
    }

    async updateSalon(salonId, dataSalon) {
        try {
            return await this.salonsRepository.updateSalon(salonId, dataSalon);
        } catch (error) {
            console.error("(SERVICE - updateSalon) Error al actualizar el salon");
            throw error;
        }
    }

}

export default salonsService;