import { useState } from "react";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  // Estados de Login
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  // Estados de Cadastro
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [userName, setUserName] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const trocarModo = (estadoDesejado) => {
    setIsLogin(estadoDesejado);
    setErro("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!emailLogin.trim() || !emailLogin.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }
    if (senhaLogin.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);
      const resposta = await fetch("INSIRA_A_URL_DA_API_LOGIN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
      });
      const resultado = await resposta.json();
      if (!resposta.ok)
        throw new Error(resultado.mensagem || "Erro ao fazer login.");
      console.log("Login realizado com sucesso!");
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o login.");
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    if (!nomeCadastro.trim()) {
      setErro("Digite seu nome.");
      return;
    }
    if (!emailCadastro.trim() || !emailCadastro.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }
    if (senhaCadastro.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);
      const resposta = await fetch("INSIRA_A_URL_DA_API_CADASTRO", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeCadastro,
          email: emailCadastro,
          senha: senhaCadastro,
        }),
      });
      const resultado = await resposta.json();
      if (!resposta.ok)
        throw new Error(resultado.mensagem || "Erro ao cadastrar.");
      console.log("Cadastro realizado com sucesso!");
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o cadastro.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-light-purple)] flex items-center justify-center p-5">
      {/* Card principal com posição relativa para conter o painel deslizante */}
      <div className="w-full max-w-[900px] min-h-[550px] bg-[var(--color-off-white)] rounded-[30px] overflow-hidden relative flex shadow-[0_20px_45px_rgba(71,25,109,0.25)]">
        {/* --- CAMADA DE FUNDO: Formulário de Login (Esquerda) e Cadastro (Direita) fixos nas pontas --- */}

        {/* Lado Esquerdo (Fundo Branco - Formulário de Login) */}
        <section className="w-1/2 flex items-center justify-center p-10 bg-[var(--color-off-white)] z-0">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-[350px] flex flex-col items-center"
          >
            <h1 className="text-[34px] font-bold text-[var(--color-dark-purple)] mb-5">
              Entrar
            </h1>
            <p className="text-[13px] text-[var(--color-dark-purple)] mb-6">
              Entre com seu e-mail e senha
            </p>

            <input
              type="email"
              placeholder="E-mail"
              value={emailLogin}
              onChange={(e) => {
                setEmailLogin(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              autoComplete="email"
              className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senhaLogin}
              onChange={(e) => {
                setSenhaLogin(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              autoComplete="current-password"
              className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            {erro && isLogin && (
              <p
                role="alert"
                className="w-full text-center text-[13px] text-red-700 mb-2"
              >
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-[125px] h-[42px] mt-4 rounded-[7px] bg-[var(--color-digital-orange)] text-[var(--color-off-white)] text-[13px] font-bold uppercase cursor-pointer transition duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>

        {/* Lado Direito (Fundo Branco - Formulário de Cadastro) */}
        <section className="w-1/2 flex items-center justify-center p-10 bg-[var(--color-off-white)] z-0">
          <form
            onSubmit={handleCadastro}
            className="w-full max-w-[350px] flex flex-col items-center"
          >
            <h1 className="text-[34px] font-bold text-[var(--color-dark-purple)] mb-3">
              Criar Conta
            </h1>
            <p className="text-[13px] text-[var(--color-dark-purple)] mb-4">
              Preencha os dados abaixo
            </p>

            <input
              type="text"
              placeholder="Nome completo"
              value={nomeCadastro}
              onChange={(e) => {
                setNomeCadastro(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              className="w-full h-[42px] bg-[#e4e2e5] text-[var(--color-dark-purple)] rounded-[7px] px-[15px] mb-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            <input
              type="text"
              placeholder="Nome de usuario"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              autoComplete="username"
              minLength={3}
              maxLength={20}
              pattern="[A-Za-z0-9_]+"
              title="Use de 3 a 20 caracteres: letras, números ou _"
              className="w-full h-[42px] bg-[#e4e2e5] text-[var(--color-dark-purple)] rounded-[7px] px-[15px] mb-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            <input
              type="email"
              placeholder="E-mail"
              value={emailCadastro}
              onChange={(e) => {
                setEmailCadastro(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              className="w-full h-[42px] bg-[#e4e2e5] text-[var(--color-dark-purple)] rounded-[7px] px-[15px] mb-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senhaCadastro}
              onChange={(e) => {
                setSenhaCadastro(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              className="w-full h-[42px] bg-[#e4e2e5] text-[var(--color-dark-purple)] rounded-[7px] px-[15px] mb-3 text-[14px] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            {erro && !isLogin && (
              <p
                role="alert"
                className="w-full text-center text-[13px] text-red-700 mb-2"
              >
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-[130px] h-[42px] mt-2 rounded-[7px] bg-[var(--color-digital-orange)] text-[var(--color-off-white)] text-[13px] font-bold uppercase cursor-pointer transition duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </section>

        {/* --- PAINEL ROXO DESLIZANTE (Objeto móvel independente) --- */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-[var(--color-dark-purple)] text-[var(--color-off-white)] flex items-center justify-center p-10 z-10 transition-all duration-700 ease-in-out ${
            isLogin
              ? "translate-x-full rounded-l-[160px] rounded-r-none" // Posicionado na direita quando no login
              : "translate-x-0 rounded-l-none rounded-r-[160px]" // Desliza para a esquerda quando vai para cadastro
          }`}
        >
          {/* Conteúdo interno do painel roxo (alterna dependendo de onde ele está) */}
          <div className="max-w-[360px] text-center relative w-full h-full flex flex-col items-center justify-center">
            {/* Texto quando o painel está na Direita (Tela de Login visível) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isLogin ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              <h1 className="text-[34px] font-bold text-[var(--color-off-white)] mb-5">
                Crie sua conta!
              </h1>
              <p className="text-[14px] leading-relaxed text-[var(--color-light-purple)] mb-7">
                Cadastre-se para acessar o QuizMaster, responder aos quizzes e
                acompanhar seu desempenho.
              </p>
              <button
                type="button"
                onClick={() => trocarModo(false)}
                className="w-[130px] h-[42px] border-2 border-[var(--color-off-white)] rounded-[7px] bg-transparent text-[var(--color-off-white)] text-[12px] font-bold uppercase cursor-pointer transition duration-200 hover:bg-[var(--color-off-white)] hover:text-[var(--color-dark-purple)]"
              >
                Cadastrar-se
              </button>
            </div>

            {/* Texto quando o painel desliza para a Esquerda (Tela de Cadastro visível) */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${!isLogin ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              <h1 className="text-[34px] font-bold text-[var(--color-off-white)] mb-5">
                Já tem uma conta?
              </h1>
              <p className="text-[14px] leading-relaxed text-[var(--color-light-purple)] mb-7">
                Faça login para acessar o QuizMaster e continuar acompanhando
                seu desempenho.
              </p>
              <button
                type="button"
                onClick={() => trocarModo(true)}
                className="w-[130px] h-[42px] border-2 border-[var(--color-off-white)] rounded-[7px] bg-transparent text-[var(--color-off-white)] text-[12px] font-bold uppercase cursor-pointer transition duration-200 hover:bg-[var(--color-off-white)] hover:text-[var(--color-dark-purple)]"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
