import { Op } from "sequelize";
import Docent from "../../infraestructure/models/docentModel.js";
// import Office from "../../infraestructure/models/officeModel.js";
// import FacultyStaff from "../../infraestructure/models/facultyStaffModel.js";
// import Staff from "../../infraestructure/models/staffModel.js";
// import ImgFaculty from "../../infraestructure/models/imgFacultyModel.js";

class docentsRepository {
  constructor(connection) {
    this.connection = connection;
  }


  async authenticateDocent(email, password) {
    try {
      const docent = await Docent.findOne({
        where: { email: email },
      });

      if (docent && (await docent.comprobarPassword(password))) {
        console.log("Password correcto");
        return docent;
      } else {
        console.log("Password incorrecto");
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllDocents() {
    try {
      const docents = await Docent.findAll({
        include: [],
        order: [["nombre", "ASC"]],
      });

      if (docents.length <= 0) {
        return false;
      }

      const docentsData = docents.map((docent) => ({
        id_docente: docent.id_docente,
        nombre: docent.nombre,
        apellido_paterno: docent.apellido_paterno,
        apellido_materno: docent.apellido_materno,
        email: docent.email,
        password: docent.password

      }));

      return docentsData;
    } catch (error) {
      throw error;
    }
  }

  async getDocentById(id) {
    try {
      const docent = await Docent.findOne({
        where: { id_docente: id }
      });

      if (!docent) { return false; }

      return docent;
    } catch (error) {
      throw error;
    }
  }

  async getDocentsGeneral(search) {
    try {
      const whereCondition = {
        [Op.or]: [
          { nombre: { [Op.like]: `%${search}%` } },
        ],
      };

      const docents = await Docent.findAll({
        where: whereCondition,
        include: [],
        order: [["nombre", "ASC"]],
      });

      if (docents.length <= 0) {
        return false;
      }

      const docentsData = docents.map((docent) => ({
        id_docente: docent.id_docente,
        nombre: docent.nombre,
        apellido_paterno: docent.apellido_paterno,
        apellido_materno: docent.apellido_materno,
        email: docent.email,
        password: docent.password
      }));

      return docentsData;
    } catch (error) {
      throw error;
    }
  }

  async createDocent(dataDocent) {
    try {
      const { nombre, apellido_paterno, apellido_materno, email } = dataDocent;
      const docentExist = await Docent.findOne({
        where: { nombre: nombre, apellido_paterno: apellido_paterno, apellido_materno: apellido_materno, email: email },
      });

      if (docentExist) { return false; }

      const docent = await Docent.create(dataDocent);
      return docent;
    } catch (error) {
      throw error;
    }
  }

  async updateDocent(id_docent, dataDocent) {
    try {
      const docent = await Docent.findOne({
        where: { id_docente: id_docent },
      });

      const { nombre, apellido_paterno, apellido_materno, email, password } = dataDocent;

      const docentTitle = nombre ? await Docent.findOne({ where: { nombre } }) : null;
      const emailTitle = email ? await Docent.findOne({ where: { email } }) : null;
      const passwordTitle = password ? await Docent.findOne({ where: { password } }) : null;

      if (!docent) {
        throw new Error('Docente no encontrado');
      }

      if (emailTitle && emailTitle.email !== docent.email) {
        throw new Error('La dirección de correo electrónico ya está en uso');
      }

      if (emailTitle && emailTitle.email !== docent.email) {
        console.log("gaaaaa")
        docent.email = email;
      }

      if (password && password !== docent.password) {
        docent.password = password;
      }

      docent.apellido_paterno = apellido_paterno;
      docent.apellido_materno = apellido_materno;

      await docent.save();
      return docent;
    } catch (error) {
      throw error;
    }
  }

}

export default docentsRepository;
