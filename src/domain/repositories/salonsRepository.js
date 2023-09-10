import { Op } from "sequelize";
import Salon from "../../infraestructure/models/salonModel.js";

class salonsRepository {
    constructor(connection) {
        this.connection = connection;
    }

    async getAllSalons() {
        try {
            const salons = await Salon.findAll({
                include: [],
                order: [["nombre_salon", "ASC"]],
            });

            if (salons.length <= 0) {
                return false;
            }

            const salonsData = salons.map((salon) => ({
                id_salon: salon.id_salon,
                nombre_salon: salon.nombre_salon,
                latitude_salon: salon.latitude_salon,
                longitude_salon: salon.longitude_salon,
                radius_salon: salon.radius_salon
            }));

            return salonsData;
        } catch (error) {
            throw error;
        }
    }

    async getSalonById(id) {
        try {
            const salon = await Salon.findOne({
                where: { id_salon: id }
            });

            if (!salon) { return false; }

            return salon;
        } catch (error) {
            throw error;
        }
    }

    async createSalon(dataSalon) {
        try {
            const { nombre_salon, latitude_salon, longitude_salon, radius_salon } = dataSalon;

            // Verificar si el salón ya existe
            const salonExist = await Salon.findOne({
                where: { nombre_salon: nombre_salon },
            });

            if (salonExist) {
                return false; // El salón ya existe, puedes manejar esto de acuerdo a tus necesidades
            }

            // Crear un nuevo salón en la base de datos
            const newSalon = await Salon.create({
                nombre_salon: nombre_salon,
                latitude_salon: latitude_salon,
                longitude_salon: longitude_salon,
                radius_salon: radius_salon,
            });

            return newSalon;
        } catch (error) {
            throw error;
        }
    }

    async updateSalon(id_salon, dataSalon) {
        try {
            const salon = await Salon.findOne({
                where: { id_salon: id_salon },
            });

            const { nombre_salon, latitude_salon, longitude_salon, radius_salon } = dataSalon;

            if (!salon) {
                throw new Error('Salon no encontrado');
            }

            salon.nombre_salon = nombre_salon;
            salon.latitude_salon = latitude_salon;
            salon.longitude_salon = longitude_salon;
            salon.radius_salon = radius_salon;

            await salon.save();
            return salon;
        } catch (error) {
            throw error;
        }
    }
}

export default salonsRepository;
