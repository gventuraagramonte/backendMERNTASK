const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  // Extraer el proyecto y comprobar si existe
  const { proyecto } = req.body;

  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si el proyecto actual pertenece al usuario authentica
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  // Extraer el proyecto y comprobar si existe

  try {
    const { proyecto } = req.query;
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // Revisar si el proyecto actual pertenece al usuario authentica
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    // Revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(401).json({ msg: "No existe tarea" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario authentica
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // crear un objketo con la nueva informacion
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    // Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;

    // Revisar si la tarea existe
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(401).json({ msg: "No existe tarea" });
    }

    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario authentica
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
