 async function cadastrar() {

    let nome = ipt_nome.value;
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let senha_confirmar = ipt_senha_confirmar.value;

    if (nome == "" || email == "" || senha == "" || senha_confirmar == "") {
        alert("Preencha todos os campos");
    }
    else if (senha != senha_confirmar) {
        alert("As senhas não coincidem. Tente Novamente!")
    }
    else {
        try {
            // Envia os dados para a API
            var resposta = await fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomeServer: nome,
                    emailServer: email,
                    senhaServer: senha
                })
            });

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "login.html";
            } else {
                console.error("Erro HTTP:", resposta.status);
                alert("Não foi possível realizar o cadastro. Verifique os dados e o terminal do servidor.");
            }

        } catch (erro) {
            console.error("Erro ao realizar cadastro:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    };
}

