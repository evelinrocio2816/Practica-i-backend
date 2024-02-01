const express=require("express")
const router = express.Router()
const fs =require("fs").promises;
const path =require("path")

const imageModel=require("../models/image.models.js")

//obtener el arrays de viajes!!


//Rutas, raiz
router.get("/",async(req, res)=>{
 const images = await imageModel.find()
 const newArrImages = images.map(image => {
    return {
        id: image._id,
        title:image.title,
        description: image.description,
        filename: image.filename,
        path: image.path
    }
})

res.render("index", {images: newArrImages , title: "practica"} )
})
   


//ruta para acceder al formulario

router.get("/upload", (req, res)=>{
    res.render("upload")
})
//ruutes para enviar el firmulario
router.post("/upload",async(req, res )=>{
    const image = new imageModel();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/img/" + req.file.filename;

    //Guardo en la base de datos: 
    await image.save()

    // res.send("Se subio ok!");
    res.redirect("/");
})
//Creamos una ruta para eliminar la imagen: 

router.get("/image/:id/delete", async(req, res) => {
    const {id} = req.params;
    //Borramos de la BD y me guardo una referencia
    const image = await imageModel.findByIdAndDelete(id);
    //Borro la img fisicamente
    await fs.unlink(path.resolve("./src/public" + image.path));
    res.redirect("/");
})
module.exports= router