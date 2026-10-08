import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");

    // validação do e-mail
    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!email.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    // validação da senha
    if (!senha) {
      setErro("Digite sua senha.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch("INSIRA_A_URL_DA_API_AQUI", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      /*
        RESPOSTA DA API

        Ajuste conforme o formato definido
        pelo backend.
      */

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || "E-mail ou senha incorretos.");
      }

      // Login realizado com sucesso
      console.log("Login realizado com sucesso!");

      /*
        Aqui poderá ser feito o redirecionamento
        para a próxima tela após a integração
        com o sistema de rotas.
      */
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-light-purple)] flex items-center justify-center p-5">
      {/* Card principal */}
      <div className="w-full max-w-[900px] min-h-[550px] bg-[var(--color-off-white)] rounded-[30px] overflow-hidden flex shadow-[0_20px_45px_rgba(71,25,109,0.25)]">
        {/* Lado do login */}
        <section className="w-1/2 flex items-center justify-center p-10 bg-[var(--color-off-white)]">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-[350px] flex flex-col items-center"
          >
            {/* titulo*/}
            <h1 className="text-[34px] font-bold text-[var(--color-dark-purple)] mb-5">
              Entrar
            </h1>

            {/* descricao */}
            <p className="text-[13px] text-[var(--color-dark-purple)] mb-6">
              Entre com seu e-mail e senha
            </p>

            {/* email */}
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              autoComplete="email"
              className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            {/* Senha */}
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro("");
              }}
              disabled={carregando}
              autoComplete="current-password"
              className="w-full h-[46px] bg-[#e4e2e5] rounded-[7px] px-[15px] mb-3 text-[14px] text-[var(--color-dark-purple)] outline-none focus:ring-2 focus:ring-[var(--color-light-purple)] disabled:opacity-60"
            />

            {/* Mensagem de erro */}
            {erro && (
              <p
                role="alert"
                className="w-full text-center text-[13px] text-red-700 mb-2"
              >
                {erro}
              </p>
            )}

            {/* Botão entrar */}
            <button
              type="submit"
              disabled={carregando}
              className={`w-[125px] h-[42px] mt-4 rounded-[7px]
                bg-[var(--color-digital-orange)]
                text-[var(--color-off-white)]
                text-[13px] font-bold uppercase
                transition duration-200

                     ${
                       carregando
                         ? "cursor-progress opacity-60"
                         : "cursor-pointer hover:scale-105"
                     }`}
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>

        {/* Lado do cadastro */}
        <section className="w-1/2 bg-[var(--color-dark-purple)] text-[var(--color-off-white)] rounded-l-[160px] flex items-center justify-center p-10">
          <div className="max-w-[360px] text-center">
            {/* titulo */}
            <h1 className="text-[34px] font-bold text-[var(--color-off-white)] mb-5">
              Crie sua conta!
            </h1>

            {/* descricao*/}
            <p className="text-[14px] leading-relaxed text-[var(--color-light-purple)] mb-7">
              Cadastre-se para acessar o QuizMaster, responder aos quizzes e
              acompanhar seu desempenho.
            </p>

            {/* cadastro */}
            <button
              type="button"
              className="w-[130px] h-[42px] border-2 border-[var(--color-off-white)] rounded-[7px] bg-transparent text-[var(--color-off-white)] text-[12px] font-bold uppercase cursor-pointer transition duration-200 hover:bg-[var(--color-off-white)] hover:text-[var(--color-dark-purple)]"
            >
              Cadastrar-se
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
