import express from "express"
import { PrismaClient } from '@prisma/client'

const router = express.Router() //variavel para roteamento e direcioanr os fluxos
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET


//listar usuarios
router.get("/listar", async (rec,res) => {
    try {
        const users = await prisma.user.findMany() //vai trazer todos usuarios do banco de dados
        res.status(200).json({
            message: "Usuarios listados com sucesso", users
        })       

    } catch (error) {
        res.status(500).json({
            message: "erro na solicitação", error
        })
    }
})



export default router