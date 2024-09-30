import express, { json } from "express"
import publicRoutes from "./routes/public.js" 


const port = 3000 //porta que o backend vai rodar
const app = express() //aqui vai fazer com que toda lib do express esteja setada em app
app.use(express.json()) //avisando a aplicação que vai utilizar json

app.use("/", publicRoutes) //essa parte possibilitado o acesso das rotas







app.listen(port, () => {
    console.log("Servidor rodando!")
})


//usuario: pedrohelias
//senha: VmOTV6mnRgY6CbHs
//mongodb+srv://pedrohelias:<db_password>@users.8f2bi.mongodb.net/?retryWrites=true&w=majority&appName=Users
