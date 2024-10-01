//vai fazer o meio de campo entre a pagina de login e a pagina de listar usuarios

import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req,res,next) => { //o middleware tem requisição, resposta e next (para gerenciar e liberar o avanço entre rotas)

    //o token do usuario vem pelos headers, facilmente achado na requisição
    //o espaço de bearer no cmapo auth, possui um registro de token 


    //enquanto naõ tiver next, o codigo vai vir pra ca e vai ficar rodando esperando o next
    const token = req.headers.authorization //isso vai gerar uma saida "bearer  <token>". Repare que existe um espaço entre bearer e token. Esse espaço precisa ser eliminado, caso vá trabalhar com a token


    if (!token){
        res.send(401).json({
            message: "token não encontrada"
        })
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET)
         


    } catch (error) {
        return res.status(401).json({
            message: "token inválida", error
        })
    }


    next()

}

export default auth