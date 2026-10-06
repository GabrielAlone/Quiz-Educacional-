import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export async function cadastrar(req, res) {
    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({ mensagem: "Usuário e senha são obrigatório"});
        }

        if (senha.length < 4) {
            return res.status(400).json({ mensagem: "A senha deve ter pelo menos quatro caracteres"});
        }

        const [existentes] = await pool.query(
            "SELECT id FROM usuarios WHERE usuario = ? LIMIT 1",
            [usuario]
        );

        if (existentes.length > 0) {
            return res.status(409).json({ mensagem: "Usuário já cadastrado"});
        };

        const senhaHash = await bcrypt.hash(senha, 10);
        
        const [resultado] = await pool.query(
            "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)",
            [usuario, senhaHash]
        );

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: { id: resultado.insertId, usuario}
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: "Erro ao cadastrar usuário."});
    }
}

export async function login(req, res) {
    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({ mensagem: "Usuário e senha são obrigatórios" });
        }

        const [usuarios] = await pool.query(
            "SELECT id, usuario, senha FROM usuarios WHERE usuario = ? LIMIT 1",
            [usuario]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos."});
        }

        const encontrado = usuarios[0];
        const senhaValida = await bcrypt.compare(senha, encontrado.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Usuário ou senha inválidos"});
        }

        const token = jwt.sign(
            { id: encontrado.id, usuario: encontrado.usuario},
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({
            mensagem: "Login realizado com sucesso",
            usuario: { id: encontrado.id, usuario: encontrado.usuario },
            token
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: "Erro no login" });
    }
}

export async function me(req, res) {
    return res.json({ usuario: req.usuario });
}

export async function listarUsuarios(req, res) {
    try {
        const [usuarios] = await pool.query (
            "SELECT id, usuario, criado_em FROM usuarios ORDER BY id"
        );
        return res.json(usuarios);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
}