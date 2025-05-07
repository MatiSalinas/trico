import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTES = `${__dirname}`;

const router = Router();
const cleanFileName = (fileName: string) => {
    const file = fileName.split(".ts").shift();
    const cleanName = file?.split(".").shift();
    return [file, cleanName];
}
readdirSync(PATH_ROUTES).filter((fileName) => {
    const [file,cleanName] = cleanFileName(fileName);
    if (file !== "index") {
        import(`./${file}`).then((moduleRouter) => {
            console.log(`Se esta cargando la ruta ..... /${cleanName}`);
            router.use(`/${cleanName}`, moduleRouter.router);
        });   
     }
})
export {router};