//importação  (INCLUINDO) do express e criação da variavel express
const express = require("express");


//criação do metodo express
const app = express();
//fim da criação metos express

//importação  (INCLUINDO) do express-handlebars e criação da variavel handlebars
const handlebars = require("express-handlebars");
//importação (INCLUINDO) do body-parser e criação da variavel bodyParser 
const bodyParser = require("body-parser")

//Criacao da variavel pagamento e CARREGANDO o arquivo Pagamento.js
const pagamento = require("./models/Pagamento")

//incluindo o Arquivo main.handlebars no app, assim o metodo express vai carregar o handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//INCLUSÃO DAS CONFIGURAÇÕES DO bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// FIM DA INCLUSÃO DAS CONFIGURAÇÕES DO bodyParser

//Rotas
app.get('/pagamento', function(req, res){
    res.render('pagamento');
});

app.get('/cad-pagamento', function(req, res){
    res.render('cad-pagamento');
});

//Acesso aos atibutos do banco de dado
app.post('/add-pagamento', function(req, res){
    pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }) tratamento das respostas
        .then(function(){
        res.redirect('/pagamento')
        res.send("Pagamento cadastro com sucesso!")
    })
        .catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    }) //Fim tratamento das respostas
    //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})

app.listen(8080);
