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

module.exports = {
    registrar
};