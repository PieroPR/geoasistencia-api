import SalonsRepository from "../../domain/repositories/salonsRepository.js";
import SalonsService from "../../application/services/salonsService.js";
import connection from "../../infraestructure/config/db.js";

const salonsRepository = new SalonsRepository(connection);
const salonsService = new SalonsService(salonsRepository);

const getAllSalons = async (req, res) => {
    try {
        const salons = await salonsService.getAllSalons();

        if (!salons || salons.length <= 0) {
            res.status(404).json({ error: "No se encontraron salones" });
        } else {
            res.json(salons);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor (Controller - getAllSalons)",
        });
    }
};

const getSalonById = async (req, res) => {
    try {
        const { id } = req.params;
        const salons = await salonsService.getSalonById(id);

        if (salons) {
            res.json(salons);
        } else {
            res.status(404).json({ error: "Salon no encontrado por ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor (Controller - getSalonById)",
        });
    }
};

const createSalon = async (req, res) => {
    try {
        const dataSalon = req.body;
        const newSalon = await salonsService.createSalon(dataSalon);

        if (!newSalon) {
            res.status(400).json({ error: "El salon ya existe" });
        } else {
            res.json({ message: "Salon registrado exitosamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor (controller - createSalon)" });
    }
};

const updateSalon = async (req, res) => {
    try {
        const { id } = req.params;
        const dataSalon = req.body;

        const updatedSalon = await salonsService.updateSalon(id, dataSalon);

        // Si se actualizó correctamente
        if (updatedSalon) {
            res.json({ message: "Salon actualizado exitosamente" });
        } else {
            res.status(400).json({ error: "No se pudo actualizar, por favor revise sus datos e intente nuevamente." });
        }
    } catch (error) {
        console.error("Error en el servidor al actualizar el salon (controller - updateSalon)");
        res.status(500).json({ error: error.message });
    }
};


export { getAllSalons, getSalonById, createSalon, updateSalon };