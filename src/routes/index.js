var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.redirect("/login.html");
});

/*
Substituí res.render() por res.redirect() porque o render tenta gerar
uma página utilizando um mecanismo de templates, que não está configurado
no projeto. Como o login.html já é um arquivo HTML pronto, o redirect
direciona o navegador para essa página ao acessar a rota principal (/).
*/

module.exports = router;