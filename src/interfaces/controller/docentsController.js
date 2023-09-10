import DocentsRepository from "../../domain/repositories/docentsRepository.js";
import DocentsService from "../../application/services/docentsService.js";
import connection from "../../infraestructure/config/db.js";

const docentsRepository = new DocentsRepository(connection);
const docentsService = new DocentsService(docentsRepository);

const authenticateDocent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const docent = await docentsService.authenticateDocent(email, password);

    if (docent) {
      res.json({
        id_docente: docent.id_docente,
        nombre: docent.nombre,
        apellido_paterno: docent.apellido_paterno,
        apellido_materno: docent.apellido_materno,
        email: docent.email,
        password: docent.password,
      });
    } else {
      res.status(400).json({ error: "Correo o contraseña no válidos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor al autenticar el usuario (controller - authenticateDocent)" });
  }
};

const getAllDocents = async (req, res) => {
  try {
    const docents = await docentsService.getAllDocents();

    if (!docents || docents.length <= 0) {
      res.status(404).json({ error: "No se encontraron docentes" });
    } else {
      res.json(docents);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ocurrió un error en el servidor (Controller - getAllDocents)",
    });
  }
};

const getDocentById = async (req, res) => {
  try {
    const { id } = req.params;
    const docent = await docentsService.getDocentById(id);

    if (docent) {
      res.json(docent);
    } else {
      res.status(404).json({ error: "Docente no encontrado por ID" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error en el servidor (Controller - getDocentById)",
      });
  }
};

const getDocentsGeneral = async (req, res) => {
  try {
    const { search } = req.params;
    const docents = await docentsService.getDocentsGeneral(search);

    if (docents) {
      res.json(docents);
    } else {
      res.status(404).json({ error: "No hay resultados" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Ocurrió un error en el servidor (Controller - getDocentsGeneral)",
      });
  }
};

const createDocent = async (req, res) => {
  try {
    const dataDocent = req.body;
    const newDocent = await docentsService.createDocent(dataDocent);

    if (!newDocent) {
      res.status(400).json({ error: "El docente ya existe" });
    } else {
      res.json({ message: "Docente registrado exitosamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error en el servidor (controller - createDocents)" });
  }
};

const updateDocent = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDocent = req.body;
    const updatedDocent = await docentsService.updateDocent(id, dataDocent);

    if (updatedDocent) {
      res.json({ message: "Docente actualizado exitosamente" });
    } else {
      res.status(400).json({ error: "No se pudo actualizar, por favor revise sus datos e intente nuevamente." });
    }
  } catch (error) {
    console.error("Error en el servidor al actualizar el docente (controller - updateDocent)");
    res.status(500).json({ error: error.message });
  }
};


export { getAllDocents, getDocentById, getDocentsGeneral, createDocent, updateDocent, authenticateDocent };
