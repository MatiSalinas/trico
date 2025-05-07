import { Request, Response } from "express"
import {registrarUsuario, loginUsuario} from "../services/authService"
const registerController = async (req: Request, res: Response) => {
    const responseUser = await registrarUsuario();

}

const loginController = async (req: Request, res: Response) => {

}

export { registerController, loginController }