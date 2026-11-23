var database = require("../database/config");

function registrar(idUsuario, questao1, questao2, questao3, questao4, questao5, pontuacao, personagem_favorita, elemento_marcante) {
    var instrucaoSql = `
        INSERT INTO quiz_resposta (
            fk_usuario, 
            questao1, questao2, questao3, questao4, questao5, 
            pontuacao, 
            personagem_favorita, 
            elemento_marcante
        ) VALUES (
            ${idUsuario}, 
            ${questao1}, ${questao2}, ${questao3}, ${questao4}, ${questao5}, 
            ${pontuacao}, 
            '${personagem_favorita}', 
            '${elemento_marcante}'
        );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpis() {
    var instrucaoSql = `
        SELECT 
            COUNT(*) AS total_participacoes,
            IFNULL(ROUND(AVG(pontuacao), 1), 0) AS media_acertos
        FROM quiz_resposta;
    `;
    return database.executar(instrucaoSql);
}

function buscarAcertosPorQuestao() {
    var instrucaoSql = `
        SELECT 
            IFNULL(SUM(questao1), 0) AS acertos_q1,
            IFNULL(SUM(questao2), 0) AS acertos_q2,
            IFNULL(SUM(questao3), 0) AS acertos_q3,
            IFNULL(SUM(questao4), 0) AS acertos_q4,
            IFNULL(SUM(questao5), 0) AS acertos_q5
        FROM quiz_resposta;
    `;
    return database.executar(instrucaoSql);
}

function buscarRankingPersonagens() {
    var instrucaoSql = `
        SELECT 
            personagem_favorita, 
            COUNT(*) AS total_votos,
            ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_resposta)), 0) AS porcentagem
        FROM quiz_resposta
        GROUP BY personagem_favorita
        ORDER BY total_votos DESC;
    `;
    return database.executar(instrucaoSql);
}

function buscarRankingElementos() {
    var instrucaoSql = `
        SELECT 
            elemento_marcante, 
            COUNT(*) AS total_votos,
            ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_resposta)), 0) AS porcentagem
        FROM quiz_resposta
        GROUP BY elemento_marcante
        ORDER BY total_votos DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar, buscarKpis, buscarAcertosPorQuestao, buscarRankingPersonagens, buscarRankingElementos
};