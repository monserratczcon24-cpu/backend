import express from "express";
import ejs from "ejs";
import rutas from "./rutas/rutas.js";
import { conectarBD } from "./bd/bd.js";

const app = express();
const PORT = process.env.PORT || 3000;


async function conexionBD() {
  try {
    await conectarBD();
    console.log("✅ Base de datos conectada correctamente");
  } catch (error) {
    console.log("⚠️ No se pudo conectar a la base de datos:", error.message);
  }
}
conexionBD();

// 🔹 Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// 🔹 Configurar EJS como motor de vistas
app.set("view engine", "ejs");

// 🔹 Carpeta para archivos estáticos (CSS, imágenes, etc.)
app.use(express.static("public"));

// 🔹 Rutas principales (por ejemplo: /inicio, /contactanos, etc.)
app.use("/", rutas);


// Formulario de registro
app.get("/registrar", (req, res) => {
  res.render("registrar", { titulo: "Registrar usuario" });
});

// Cuando el usuario envía el formulario
app.post("/registrar", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  console.log("Nuevo usuario registrado:");
  console.log("Nombre:", nombre);
  console.log("Correo:", correo);
  console.log("Contraseña:", contrasena);

  res.render("mensaje", {
    titulo: "Registro exitoso",
    mensaje: `El usuario ${nombre} se registró correctamente 🎉`,
  });
});


app.use((req, res) => {
  res.status(404).render("404", { titulo: "Error 404" });
});


app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
