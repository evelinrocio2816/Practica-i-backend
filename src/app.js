const express = require("express")
const app =express();
const exphds= require("express-handlebars")
const multer= require("multer")

const PORT = 8080;

const imageRoutes= require("./routes/image.router.js")
require("../src/db/database.js")

//Handlebars

app.engine("handlebars",exphds.engine()) 
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))


//multer
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./src/public/img")
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})
app.use(multer({storage}).single("image"))

//importo rutas
app.use("/", imageRoutes)



app.listen(PORT ,()=>{
    console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
})