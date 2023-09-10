import Sequelize from "sequelize";
import bcrypt from 'bcrypt';
import connection from "../config/db.js";

const Docent = connection.define(
  "docentes",
  {
    id_docente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    apellido_paterno: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    apellido_materno: {
      type: Sequelize.STRING(255),
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    }
  },
  {
    tableName: "docentes",
  }
);

// Método para comprobar la contraseña
Docent.prototype.comprobarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Método para hashear la contraseña
Docent.addHook('beforeSave', async (docent) => {
  if (docent.changed('password') || docent.isNewRecord) {
    const salt = await bcrypt.genSalt(10);
    docent.password = await bcrypt.hash(docent.password, salt);
  }

  return Promise.resolve();
});


export default Docent;
