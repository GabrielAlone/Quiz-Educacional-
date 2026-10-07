import { Router } from "express";
import{
    cadastrar,
    login,
    me,
    listarUsuarios
} from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/usuarios", cadastrar)
router.post("/login", login)
router.get("/auth/me", autenticar, me)
router.get("/usuarios", autenticar, listarUsuarios)
// router.post("/logout", logout)
// router.get("/materiais", materiais)
// router.post("/quiz/iniciar", quiz, iniciar)
// router.post("/quiz/{id}/responder", quiz, id, responder)
// router.get("/quiz/{id}/resultado", quiz, id, resultado)
// router.post("/quiz/refazer", quiz, refazer)
// router.get("/ranking", ranking)
// router.get("/professor/desempenho", professor, desempenho)
// router.get("/professor/desempenho/{alunoId}", professor, desempenho, alunoId)

export default router