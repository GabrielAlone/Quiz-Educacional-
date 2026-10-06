import { useState } from "react"

// Guarda o valor digitado no campo de email e senha
function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // Guarda a mensagem de erro do formulário
  const [erro, setErro] = useState("")

  // Executa quando o usuário clica no botão "Entrar"
  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.")
      return
    }

    if (!email.includes("@")) {
      setErro("Digite um e-mail válido!")
      return
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    setErro("")

    console.log("E-mail:", email)
    console.log("Senha:", senha)
  }

  return (
    <div className="min-h-screen bg-[var(--color-off-white)] text-[var(--color-dark-purple)] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="flex flex-col items-center mb-12">

        <div className="w-[72px] h-[72px] rounded-[18px] bg-[var(--color-dark-purple)] flex items-center justify-center">
          <span className="text-[var(--color-off-white)] text-2xl font-bold">
            Q
          </span>
        </div>

        <h1 className="mt-5 text-[32px] font-bold tracking-tight">
          QuizMaster
        </h1>

        <p className="mt-1 text-[var(--color-dark-purple)] text-base">
          plataforma educacional integradora
        </p>

      </div>

      {/* Card de Login */}
      <div className="w-full max-w-[504px] rounded-[18px] border-2 border-[var(--color-light-purple)] bg-white px-9 py-10">

        <h2 className="text-[22px] font-bold mb-8 text-[var(--color-dark-purple)]">
          Entrar na conta
        </h2>

        <form onSubmit={handleLogin}>

          {/* E-mail */}
          <div className="mb-5">

            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-dark-purple)] mb-2"
            >
              EMAIL
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErro("")
              }}
              placeholder="seu@email.com"
              className="w-full h-[52px] rounded-lg border-2 border-[var(--color-light-purple)] bg-[var(--color-off-white)] px-4 text-[var(--color-dark-purple)] placeholder:text-gray-400 outline-none transition focus:border-[var(--color-dark-purple)] focus:ring-1 focus:ring-[var(--color-dark-purple)]"
            />

          </div>

          {/* Senha */}
          <div className="mb-5">

            <label
              htmlFor="senha"
              className="block text-sm font-medium text-[var(--color-dark-purple)] mb-2"
            >
              SENHA
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value)
                setErro("")
              }}
              placeholder="••••••••"
              className="w-full h-[52px] rounded-lg border-2 border-[var(--color-light-purple)] bg-[var(--color-off-white)] px-4 text-[var(--color-dark-purple)] placeholder:text-gray-400 outline-none transition focus:border-[var(--color-dark-purple)] focus:ring-1 focus:ring-[var(--color-dark-purple)]"
            />

          </div>

          {/* Mensagem de erro */}
          {erro && (
            <p className="text-red-600 text-sm mb-4">
              {erro}
            </p>
          )}

          {/* Botão */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-lg bg-[var(--color-digital-orange)] text-[var(--color-off-white)] font-bold transition hover:brightness-110 active:scale-[0.99]"
          >
            Entrar
          </button>

        </form>

        {/* Cadastro */}
        <p className="text-center text-[var(--color-dark-purple)] text-sm mt-8">
          Não tem conta?{" "}
          <button
            type="button"
            className="text-[var(--color-digital-orange)] font-semibold hover:underline transition"
          >
            Cadastrar-se
          </button>
        </p>

      </div>

    </div>
  )
}

export default Login