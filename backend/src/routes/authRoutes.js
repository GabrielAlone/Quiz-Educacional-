
import { Router } from "express";
import {
    cadastrar,
    login,
    me,
    listarUsuarios
} from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = Router();

// Autenticação
router.post("/usuarios", cadastrar);
router.post("/login", login);
router.get("/auth/me", autenticar, me);
router.get("/usuarios", autenticar, listarUsuarios);

// Matérias disponíveis
router.get("/materias", autenticar, listarMaterias);

// Execução do quiz
router.post("/quiz/iniciar", autenticar, iniciarQuiz);
router.post("/quiz/:id/responder", autenticar, responder);
router.post("/quiz/:id/resultado", autenticar, resultado);
router.post("/quiz/refazer", autenticar, refazer);

export default router;
