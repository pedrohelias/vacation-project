//aqui se cria as rotas publicas
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'


const router = express.Router() //variavel para roteamento e direcioanr os fluxos
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET


//cadastro


//a criação de rotas vai respeitar a variavel + ponto + verbo da requisição
router.post("/cadastro", async(req,res) => {

    try{

        const user = req.body //na requisição, o req é o envio de dados que você realiza. Ele carrega um atributo chamado body. E nesse body, é possível obter dados de envio, por exemplo
        
        const salt = await bcrypt.genSalt(10) //criando peso da encriptação
        const hashPassword = await bcrypt.hash(user.password, salt) //criando a senha hash


        const userDB = await prisma.user.create({
            data:{
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        })
        
        res.status(201).json(userDB) //status de criado com sucesso + devolvendo usuario para feedback da leitura
    }

    catch (err){

        res.status(500).json({
            message: "Erro no servidor"
        })
    }
    

})

//Login
router.post("/login", async (req,res) => {
    try{
        const userInfo = req.body
        const user = await prisma.user.findUnique({where: {email: userInfo.email}}) //busca usuario no banco

        if(!user){ //verifica se o usuario existe no banco
            return res.status(404).json({
                message: "usuário naõ encontrado"
            })
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password) //compara a senha do banco com a senha de insert do usuario

        if(!isMatch){
            return res.status(400).json({
                message: "senha inválida"
            })
        }

        //gerar o token jwt

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn:"7d"})


        res.status(200).json(token)

    }catch(err){
        res.status(500).json({
            message: "Erro no servidor"
        })
    }
})


export default router //exportando o router para termos acesso a ele em outras partes do projeto