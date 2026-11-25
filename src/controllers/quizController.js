var quizModel = require("../models/quizModel");

function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var questao1 = req.body.questao1Server;
    var questao2 = req.body.questao2Server;
    var questao3 = req.body.questao3Server;
    var questao4 = req.body.questao4Server;
    var questao5 = req.body.questao5Server;
    var pontuacao = req.body.pontuacaoServer;
    var personagem_favorita = req.body.personagem_favoritaServer;
    var elemento_favorito = req.body.elemento_favoritoServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (personagem_favorita == undefined || elemento_favorito == undefined) {
        res.status(400).send("As respostas pessoais estão undefined!");
    } else {
        quizModel.registrar(idUsuario, questao1, questao2, questao3, questao4, questao5, pontuacao, personagem_favorita, elemento_favorito)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao registrar o quiz: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterDadosDashboard(req, res) {
    Promise.all([
        quizModel.buscarKpis(),
        quizModel.buscarAcertosPorQuestao(),
        quizModel.buscarRankingPersonagens(),
        quizModel.buscarRankingElementos()
    ])
    .then(function ([kpis, acertosQuestoes, personagens, elementos]) {
        res.status(200).json({
            kpis: kpis[0],
            acertosQuestoes: acertosQuestoes[0],
            personagens: personagens,
            elementos: elementos
        });
    })
    .catch(function (erro) {
        console.log("Erro ao buscar dados da dashboard:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterHistoricoUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        quizModel.buscarHistoricoUsuario(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(200).json({
                        total_tentativas: 0,
                        melhor_pontuacao: 0,
                        ultima_personagem: null,
                        ultimo_elemento: null
                    });
                }
            })
            .catch(function (erro) {
                console.log("Erro ao buscar histórico do usuário:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    registrar, obterDadosDashboard, obterHistoricoUsuario
};