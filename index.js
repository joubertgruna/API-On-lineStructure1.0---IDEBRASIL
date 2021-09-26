//libs 
process.env.TZ = "America/Sao_Paulo"; // Definindo fuso horário da aplicação
const express = require('express')
const app = express()
const ac = require('./DB/ConnActive')
const bodyParser = require('body-parser')
const xdate = require('x-date')
// const {check, validationResult} = require('express-validator')

//FacebookAdsApi 
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = 'EAA5FjZAK6sdcBAMSU65cM6voCZBsd6ZCwWnFWZCAzzTcbFWRFAuf8cdZCLWbSHwv0pUjoxmoSvJCCfijYi8i2rd161FD0ZCfMCyloE1ifPBTV4k1dkg975FfZBsMzKYQLPEs2ASAwTKpSoM1KJn69bQ9eqbvUtQFtifm8YSV3AWca5gRNOGsVVVpfpBs2EIi8UZD';
const pixel_id = '709156546588313';
const api = bizSdk.FacebookAdsApi.init(access_token);


//Sets Libs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/******************************* ****** */
//Rotas Páginas de captura 

//PG Cap e-mail 
app.get('/em', (req, res) => {

    let current_timestamp = Math.floor(new Date());
    var event_id = Math.random()
    var test_event_code = "TEST67245"
    var data = {
          
        "event_name": "PageView",
        "event_time": current_timestamp,
        "action_source": "website",
        "test_event_code": test_event_code,
        "event_source_url": "http://marketing.idebrasilbh.com.br",
        "event_id": event_id,

    }
    const serverEvent_0 = data
    const eventsData = [serverEvent_0];
    const eventRequest = (new EventRequest(access_token, pixel_id))
    eventRequest.execute(eventsData);
    console.log("data do evento: ", eventsData)

    res.render('em', data)
    // console.log(result)
})

//PG cap facebook   
app.get('/fb', (req, res) => {
    // app.post('', $pageView);
    let current_timestamp = Math.floor(new Date());
    var event_id = Math.random()
    var test_event_code = "TEST67245"
    var data = {

        "event_name": "PageView",
        "event_time": current_timestamp,
        "action_source": "website",
        "test_event_code": test_event_code,
        "event_source_url": "http://marketing.idebrasilbh.com.br",
        "event_id": event_id,

    }
    const serverEvent_0 = data
    const eventsData = [serverEvent_0];
    const eventRequest = (new EventRequest(access_token, pixel_id))
    eventRequest.execute(eventsData);
    console.log("data do evento: ", eventsData)

    res.render('fb', data)
})

app.get('/routeTeste', (req, res) => {
    res.render('rt')
})

//PG cap Instagram
app.get('/ig', (req, res) => {

    let current_timestamp = Math.floor(new Date());
    var event_id = Math.random()
    var test_event_code = "TEST67245"
    var data = {

        "event_name": "PageView",
        "event_time": current_timestamp,
        "action_source": "website",
        "test_event_code": test_event_code,
        "event_source_url": "http://marketing.idebrasilbh.com.br",
        "event_id": event_id,

    }
    const ServerEvent = data
    const eventsData = [ServerEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
    eventRequest.execute(eventsData);
    console.log("data do evento: ", eventsData)

    res.render('ig', data)
})

//PG cap Google
app.get('/gg', (req, res) => {

    let current_timestamp = Math.floor(new Date());
    var event_id = Math.random()
    var test_event_code = "TEST67245"
    var data = {

        "event_name": "PageView",
        "event_time": current_timestamp,
        "action_source": "website",
        "test_event_code": test_event_code,
        "event_source_url": "http://marketing.idebrasilbh.com.br",
        "event_id": event_id,

    }
    const serverEvent_0 = data
    const eventsData = [serverEvent_0];
    const eventRequest = (new EventRequest(access_token, pixel_id))
    eventRequest.execute(eventsData);
    console.log("data do evento: ", eventsData)

    res.render('gg', data)
})

//PG cap CDL 7 lagoas
app.get('/cdl-7l', (req, res) => {
    res.render('cdl-7l')
})

//PG cap CDL Umuarama
app.get('/aciu', (req, res) => {
    res.render('aciu-umuarama')
})

/******************************* ****** */
//Rotas Páginas de confirmação

//PG confirmado IDEBRASIL  
app.get('/confirmado-ide', (req, res) => {
    res.render('confirmado-ide')
})

//PG confirmado 7 lagoas
app.get('/confirmado-7l', (req, res) => {
    res.render('confirmado-7l')
})

//PG confirmado Umuarama
app.get('/confirmado-aciu', (req, res) => {
    res.render('confirmado-um')
})

/********************************************* */
//Rotas Blogs de Lançamento 

//PG Blog IDEBRASIL
app.get('/blog-ide', (req, res) => {
    res.render('blog-ide')
})

//PG Blog 7 lagoas
app.get('/blog-7l', (req, res) => {
    res.render('blog-7l')
})

//PG Blog Umuarama
app.get('/blog-umuarama', (req, res) => {
    res.render('blog-umuarama')
})

/******************************* */
//Rota Página de vendas CDE

app.get('/cde-7l', (req, res) => {
    res.render('cde')
})



//Rota Cadastro
app.post('/cad', (req, res) => {
    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "empresa": req.body.empresa,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag,
        "title": req.body.title
    }
    if (contact.email == '' || contact.empresa == '' || contact.phone == '' || contact.first_name == '' || contact.tags == '') {
        console.log('Campo Obrigatório') //Caso algum campo venha vazio retorna a mensagem no console
    } else { // Agora se todos os campos vieram preenchidos 
        var contato_add = ac.api("contact/sync", contact); //Aqui é enviado para o active os dados do objeto contact
        //Agora é verificado aqui se o campo hora é igual ao valor comparado se for redireciona para a rota especificada
        if (contact.title == 'em' || contact.title == 'fb' || contact.title == 'ig' || contact.title == 'gg') {
            
            let current_timestamp = Math.floor(new Date() / 1000);
            
            const serverEvent_0 = (new ServerEvent())
                .setEventName("CompleteRegistration")
                .setEventTime(current_timestamp)
                .setActionSource("website")
                .setEventSourceUrl("http:\/\/marketing.idebrasilbh.com.br")
            
            const eventsData = [serverEvent_0];
            const eventRequest = (new EventRequest(access_token, pixel_id))
                .setEvents(eventsData);
            eventRequest.execute();

            console.log('EventRequest: ', eventRequest)

            res.redirect("/confirmado-ide")
            res.statusCode = 200 //Então retorna o status de sucesso
        } else if (contact.title == '7l') {
            res.redirect("/confirmado-7l")
            res.statusCode = 200 //Então retorna o status de sucesso
        } else if (contact.title == 'um') {
            res.redirect("/confirmado-aciu")
            res.statusCode = 200 //Então retorna o status de sucesso
        }
        contato_add.then(function (result) { //Aqui passamos o valor da variável contato_add para result
            res.statusCode = 200 //Então retorna o status de sucesso
            console.log(result)//Imprimi também no console os dados da variável result
        },
            function (erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            })

    }

    // console.log(contact)
})

//Rota Cadastro
app.post('/material', (req, res) => {
    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "empresa": req.body.empresa,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag,
        "title": req.body.title
    }
    if (contact.email == '' ||  contact.phone == '' || contact.first_name == '' || contact.tags == '') {
        console.log('Campo Obrigatório') //Caso algum campo venha vazio retorna a mensagem no console
    } else { // Agora se todos os campos vieram preenchidos 
        var contato_add = ac.api("contact/sync", contact); //Aqui é enviado para o active os dados do objeto contact
        //Agora é verificado aqui se o campo hora é igual ao valor comparado se for redireciona para a rota especificada
            
            let current_timestamp = Math.floor(new Date() / 1000);
            
            const serverEvent_0 = (new ServerEvent())
                .setEventName("CompleteRegistration")
                .setEventTime(current_timestamp)
                .setActionSource("website")
                .setEventSourceUrl("http:\/\/marketing.idebrasilbh.com.br")
            
            const eventsData = [serverEvent_0];
            const eventRequest = (new EventRequest(access_token, pixel_id))
                .setEvents(eventsData);
            eventRequest.execute();

            console.log('EventRequest: ', eventRequest)

            res.redirect("https://materialdeapoio.s3.sa-east-1.amazonaws.com/Material+8L/3%C2%AA+-+Planilha+de+PV+V01+28_04_2021.xls")
            res.statusCode = 200 //Então retorna o status de sucesso

            contato_add.then(function (result) { //Aqui passamos o valor da variável contato_add para result
            res.statusCode = 200 //Então retorna o status de sucesso
            console.log(result)//Imprimi também no console os dados da variável result
        },
            function (erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            })

    }

    // console.log(contact)
})

//Rota Cadastro
app.post('/cadCde', (req, res, next) => {

    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "field[10]": "7ºL",
        "field[15]": "",
        "tags": req.body.tag
    }
    if (contact.email == '' || contact.first_name == '' || contact.phone == '') {
        var msgErro = "Campo Obrigatório"
        console.log(msgErro) //Caso algum campo venha vazio retorna a mensagem no console
    } else { // Agora se todos os campos vieram preenchidos 

        var contato_add = ac.api("contact/sync", contact); //Aqui é enviado para o active os dados do objeto contact
        res.statusCode = 200 //Então retorna o status de sucesso
        res.redirect('https://bit.ly/3zynsKE')

        contato_add.then(function (result) { //Aqui passamos o valor da variável contato_add para result
            res.statusCode = 200 //Então retorna o status de sucesso
            console.log('RETORNO CONSULTA ', result)//Imprimi também no console os dados da variável result
        }, function (erro) { //Caso ocorra algum erro no cadastro
            res.statusCode = 400//Retorna o Status 400
            console.log(erro)//Imprimi o erro no console
        });

    }
})

app.get('/material', (req, res)=>{
    res.render('material')
})


/******************************* * /
/*INFRA ESTRUTURA DE PÁGINAS DO YOUTUBE PÁGINAS DE ENTREGA DE ATIVOS */

app.get('/ide-fopag',(req, res)=>{
    res.render('fopag')
})

app.get('/ide-fpv',(req, res)=>{
    res.render('fpv')
})

app.get('/ide-pontoeq',(req, res)=>{
    res.render('pontoeq')
})

app.get('/ide-veiculo',(req, res)=>{
    res.render('veiculo')
})

//Router download files 
app.get('/entrega-fopag', (req, res)=>{
    res.render('entrega-planilha')
})

app.get('/entrega-fpv', (req, res)=>{
    res.render('entrega-planilha')
})

app.get('/entrega-pontoeq', (req, res)=>{
    res.render('entrega-planilha')
})

app.get('/entrega-veiculo', (req, res)=>{
    res.render('entrega-planilha')
})


//Rota Cadastro Youtube
app.post('/cadYotube', (req, res, next) => {

    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag
    }

    if (contact.email == '' || contact.first_name == '' || contact.phone == '') {
        var msgErro = "Campo Obrigatório"
        console.log(msgErro) //Caso algum campo venha vazio retorna a mensagem no console
    } else{ // Agora se todos os campos vieram preenchidos 

            var contato_add = ac.api("contact/sync", contact); //Aqui é enviado para o active os dados do objeto contact
            res.statusCode = 200 //Então retorna o status de sucesso
            
            if(contact.tags == 'VEICULO'){
                res.redirect('https://materialdeapoio.s3.sa-east-1.amazonaws.com/Planilhas+-+Youtube/Planilha+de+Vei%CC%81culos+V01_30_10_2018.xls')
            }
            if(contact.tags == 'FOPAG'){
                res.redirect('https://materialdeapoio.s3.sa-east-1.amazonaws.com/Planilhas+-+Youtube/Planilha+de+C%C3%A1lculo+do+Custo+da+Folha+de+Pagamento+(4).xls')
            }
            if(contact.tags == 'PONTOEQ'){

                res.redirect('https://materialdeapoio.s3.sa-east-1.amazonaws.com/Planilhas+-+Youtube/planilha_ponto_de_equili%CC%81brio_V01_13_01_21.xls')
            }
            if(contact.tags == 'FPV'){
                res.redirect('https://materialdeapoio.s3.sa-east-1.amazonaws.com/Planilhas+-+Youtube/Planilha+de+Formac%CC%A7a%CC%83o+do+Prec%CC%A7o+de+Venda_V02_26_05_20+(24)+(7).xls')
            }

            contato_add.then(function (result) { //Aqui passamos o valor da variável contato_add para result
                res.statusCode = 200 //Então retorna o status de sucesso
                console.log('RETORNO CONSULTA ', result)//Imprimi também no console os dados da variável result
            }, function (erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            })
        }

})

/******************************* * /
/*INFRA ESTRUTURA DESAFIO 4D +50L  */

//CAPTAÇÃO E CONFIRMAÇÃO 

app.get('/desafio4d-cadastro-8l-a', (req, res)=>{
    res.render('4d-cadastro-a')
})

app.get('/desafio4d-confirma-8l-a', (req, res)=>{
    res.render('4d-confirma-a')
})

app.get('/desafio4d-cadastro-8l-b', (req, res)=>{
    res.render('4d-cadastro-b')
})

app.get('/desafio4d-confirma-8l-b', (req, res)=>{
    res.render('4d-confirma-b')
})

//Rotas Blogs 
app.get('/desafio4d-cpls-8l', (req, res)=>{
    res.render('cpls')
})
app.get('/desafio4d-cpl1-8l', (req, res)=>{
    res.render('cpl1-4d-8l')
})
app.get('/desafio4d-cpl2-8l', (req, res)=>{
    res.render('cpl2-4d-8l')
})
app.get('/desafio4d-cpl3-8l', (req, res)=>{
    res.render('cpl3-4d-8l')
})
app.get('/desafio4d-cpl4-8l', (req, res)=>{
    res.render('cpl4-4d-8l')
})

//ROTA PÁGINA DE VENDAS
app.get('/cde-8l',(req, res)=>{
    res.render('cde')
})


//Rota Cadastro 4D +50L 
app.post('/cadDesafio4d', (req, res) => {

    const data = new Date().format('dd-mm-yyyy HH:MM:ss')
    function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    };

    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag,
        "field[10]": "8ºL",
        "field[18]": adicionaZero(data),
    }
    if (contact.email == '' || contact.phone == '' || contact.first_name == '' || contact.tags == '') {
        console.log('Campo Obrigatório') //Caso algum campo venha vazio retorna a mensagem no console
    } else { // Agora se todos os campos vieram preenchidos 
        var contato_add = ac.api("contact/sync", contact); //Aqui é enviado para o active os dados do objeto contact
            
            let current_timestamp = Math.floor(new Date() / 1000);
            
            const serverEvent_0 = (new ServerEvent())
                .setEventName("CompleteRegistration")
                .setEventTime(current_timestamp)
                .setActionSource("website")
                .setEventSourceUrl("http:\/\/marketing.idebrasilbh.com.br")
            
            const eventsData = [serverEvent_0];
            const eventRequest = (new EventRequest(access_token, pixel_id))
                .setEvents(eventsData);
            eventRequest.execute();

            console.log('EventRequest: ', eventRequest)

            if(contact.tags == 'cad-4d+50l-lp-a'){
                res.redirect("/desafio4d-confirma-8l-a")
            }else{
                res.redirect("/desafio4d-confirma-8l-b")
            }
            res.statusCode = 200 //Então retorna o status de sucesso

            contato_add.then(function (result) { //Aqui passamos o valor da variável contato_add para result
            res.statusCode = 200 //Então retorna o status de sucesso
            console.log(result)//Imprimi também no console os dados da variável result
            },
            function (erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            })

    }

    }

    // console.log(contact)
)

const http = require('http');
const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Welcome to Node.js!\n');
// });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// app.listen(80, (erro) => {//iniciando o server
//     if (erro) {
//         console.log('Server not started.')
//     } else {
//         console.log('Server started...')
//     }
// })