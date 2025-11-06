import mongoose from "mongoose"
import 'dotenv/config'

export async function conectarBD(){//base de datos de mongo
	try{
		
		const conexion = await mongoose.connect(process.env.SECRET_MONGO)

		console.log("conexion establecida con mongo atlas")
	}
	catch(err){
		console.log("ERROR"+err)
	}
	
}


//export default conectarBD
//conectarBD()