async function entrar() {

    let email = ipt_email.value;
    let senha = ipt_senha.value;

    if (email == "" || senha == "") {
        alert("Preencha todos os campos")
    }
    else {
        try {
            // Envia as informações para a API
            var resposta = await fetch("/usuarios/autenticar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailServer: email,
                    senhaServer: senha
                })
            });

            if (resposta.ok) {

                // Recebe as informações do usuário
                var usuario = await resposta.json();

                alert("Login realizado com sucesso! Bem-vinda, " + usuario.nome);
                window.location.href = "index.html";

            } else if (resposta.status == 403) {

                alert("E-mail ou senha inválidos!");

            } else {

                console.error("Erro HTTP:", resposta.status);
                alert("Não foi possível realizar o login.");

            }

        } catch (erro) {

            console.error("Erro ao realizar login:", erro);
            alert("Não foi possível conectar ao servidor.");

        }
    }
}