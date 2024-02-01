//aca si trabajo con mongoose , importo con require

const mongoose= require("mongoose")

const  imageSchema= new mongoose.Schema({
    titulo:String,
    description: String,
    filename: String,
    path: String
})

const imageModel = mongoose.model("imagenes", imageSchema)

module.exports= imageModel

