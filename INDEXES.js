//libs 
const express = require('express')
const app = express()
const ac = require('./DB/ConnActive')
const bodyParser = require('body-parser')
// const {check, validationResult} = require('express-validator')

//FacebookAdsApi 
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const ServerEvent= bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
// const UserData = bizSdk.UserData;
// const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = 'EAA5FjZAK6sdcBAMSU65cM6voCZBsd6ZCwWnFWZCAzzTcbFWRFAuf8cdZCLWbSHwv0pUjoxmoSvJCCfijYi8i2rd161FD0ZCfMCyloE1ifPBTV4k1dkg975FfZBsMzKYQLPEs2ASAwTKpSoM1KJn69bQ9eqbvUtQFtifm8YSV3AWca5gRNOGsVVVpfpBs2EIi8UZD';
const pixel_id = '709156546588313';
const api = bizSdk.FacebookAdsApi.init(access_token);

//Sets Libs
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


/******************************* ****** */
//Rotas Páginas de captura 

//PG Cap e-mail 
app.get('/em', (req, res)=>{    
    res.render('em')
    // console.log(result)
})

//PG cap facebook   
app.get('/fb', (req, res)=>{
    // app.post('', $pageView);
    res.render('fb')
})

app.get('/routeTeste', (req, res)=>{
    res.render('rt')
})

//PG cap Instagram
app.get('/ig',(req, res)=>{
    res.render('ig')
})

//PG cap Google
app.get('/gg', (req, res)=>{
    res.render('gg')
})

//PG cap CDL 7 lagoas
app.get('/cdl-7l',(req, res)=>{
    res.render('cdl-7l')
})

//PG cap CDL Umuarama
app.get('/aciu', (req, res)=>{
    res.render('aciu-umuarama')
})

/******************************* ****** */
//Rotas Páginas de confirmação

//PG confirmado IDEBRASIL  
app.get('/confirmado-ide', (req, res)=>{    
    res.render('confirmado-ide')
    // console.log(result)
})

//PG confirmado 7 lagoas
app.get('/confirmado-7l', (req, res)=>{
    res.render('confirmado-7l')
})

//PG confirmado Umuarama
app.get('/confirmado-aciu', (req, res)=>{
    res.render('confirmado-um')
})

/********************************************* */
//Rotas Blogs de Lançamento 

//PG Blog IDEBRASIL
app.get('/blog-ide', (req, res)=>{
    res.render('blog-ide')
})

//PG Blog 7 lagoas
app.get('/blog-7l', (req, res)=>{
    res.render('blog-7l')
})

//PG Blog Umuarama
app.get('/blog-umuarama', (req, res)=>{
    res.render('blog-umuarama')
})

/******************************* */
//Rota Página de vendas CDE

app.get('/cde-7l', (req, res)=>{
    res.render('cde')
})



//Rota Cadastro
app.post('/cad',(req, res)=>{
    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag,        
        "title": req.body.title
    }
    if(contact.email == '' || contact.phone == '' || contact.first_name == ''  || contact.tags == ''){
    console.log('Campo Obrigatório') //Caso algum campo venha vazio retorna a mensagem no console
    }else{ // Agora se todos os campos vieram preenchidos 
            var contato_add = ac.api("contact/sync",contact); //Aqui é enviado para o active os dados do objeto contact
             //Agora é verificado aqui se o campo hora é igual ao valor comparado se for redireciona para a rota especificada
            if(contact.title == 'em' || contact.title == 'fb' || contact.title == 'ig' || contact.title == 'gg'){
                
                let current_timestamp = Math.floor(new Date());

                    var event_id = Math.random()
                    var carga = {
                        
                            "event_name": "CompleteRegistration",
                            "event_time": current_timestamp,
                            "action_source": "website",
                            "test_event_code": "TEST67245",
                            "event_source_url": "http://localhost/8080",
                            "event_id": event_id,
                                                          
                    }
                    const serverEvent_0 = carga                        
                    const eventsData = [serverEvent_0];
                    const eventRequest = (new EventRequest(access_token, pixel_id))
                    eventRequest.execute(eventsData);
                    console.log("Carga do evento: ", eventsData)

                res.redirect("/confirmado-ide")
                res.statusCode = 200 //Então retorna o status de sucesso
            }else if(contact.title == '7l'){
                res.redirect("/confirmado-7l")
                res.statusCode = 200 //Então retorna o status de sucesso
            }else if(contact.title == 'um'){
                res.redirect("/confirmado-aciu")
                res.statusCode = 200 //Então retorna o status de sucesso
            }
            contato_add.then(function(result) { //Aqui passamos o valor da variável contato_add para result
                res.statusCode = 200 //Então retorna o status de sucesso
                console.log(result)//Imprimi também no console os dados da variável result
            },
                function(erro) { //Caso ocorra algum erro no cadastro
                    res.statusCode = 400//Retorna o Status 400
                    console.log(erro)//Imprimi o erro no console
            })
            
    }
   
    // console.log(contact)
})

//Rota Cadastro
app.post('/cadCde',(req,res,next)=>{

	var contact = { // definindo o objeto contact e recebendo os dados via body-parser
            "email": req.body.email,
            "first_name": req.body.firstName,
            "phone": req.body.phone,
            "field[10]": "7ºL",
            "field[15]": "",
            "tags": req.body.tag         
    }
    if(contact.email == ''|| contact.first_name == '' || contact.phone == ''){
        var msgErro = "Campo Obrigatório"
        console.log(msgErro) //Caso algum campo venha vazio retorna a mensagem no console
    }else{ // Agora se todos os campos vieram preenchidos 

            var contato_add = ac.api("contact/sync",contact); //Aqui é enviado para o active os dados do objeto contact
            res.statusCode = 200 //Então retorna o status de sucesso
            res.redirect('https://bit.ly/3zynsKE')

            contato_add.then(function(result) { //Aqui passamos o valor da variável contato_add para result
                res.statusCode = 200 //Então retorna o status de sucesso
                console.log('RETORNO CONSULTA ',result)//Imprimi também no console os dados da variável result
            }, function(erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            });
            
    }
})



app.listen(80, (erro)=>{//iniciando o server
    if(erro){
        console.log('Server not started.')
    }else{
        console.log('Server started...')
    }
})





//////////////////////////

//libs 
const express = require('express')
const app = express()
const ac = require('./DB/ConnActive')
const bodyParser = require('body-parser')
// const {check, validationResult} = require('express-validator')

//Sets Libs
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


/******************************* ****** */
//Rotas Páginas de captura 

//PG Cap e-mail 
app.get('/em', (req, res)=>{    
    res.render('em')
    // console.log(result)
})

//PG cap facebook   
app.get('/fb', (req, res)=>{
    // app.post('', $pageView);
    res.render('fb')
})

//PG cap Instagram
app.get('/ig',(req, res)=>{
    res.render('ig')
})

//PG cap Google
app.get('/gg', (req, res)=>{
    res.render('gg')
})

//PG cap CDL 7 lagoas
app.get('/cdl-7l',(req, res)=>{
    res.render('cdl-7l')
})

//PG cap CDL Umuarama
app.get('/aciu', (req, res)=>{
    res.render('aciu-umuarama')
})

/******************************* ****** */
//Rotas Páginas de confirmação

//PG confirmado IDEBRASIL  
app.get('/confirmado-ide', (req, res)=>{    
    res.render('confirmado-ide')
    // console.log(result)
})

//PG confirmado 7 lagoas
app.get('/confirmado-7l', (req, res)=>{
    res.render('confirmado-7l')
})

//PG confirmado Umuarama
app.get('/confirmado-aciu', (req, res)=>{
    res.render('confirmado-um')
})

/********************************************* */
//Rotas Blogs de Lançamento 

//PG Blog IDEBRASIL
app.get('/blog-ide', (req, res)=>{
    res.render('blog-ide')
})

//PG Blog 7 lagoas
app.get('/blog-7l', (req, res)=>{
    res.render('blog-7l')
})

//PG Blog Umuarama
app.get('/blog-umuarama', (req, res)=>{
    res.render('blog-umuarama')
})

/******************************* */
//Rota Página de vendas CDE

app.get('/cde-7l', (req, res)=>{
    res.render('cde')
})



//Rota Cadastro
app.post('/cad',(req, res)=>{
    var contact = { // definindo o objeto contact e recebendo os dados via body-parser
        "email": req.body.email,
        "first_name": req.body.firstName,
        "phone": req.body.phone,
        "tags": req.body.tag,        
        "title": req.body.title
    }
    if(contact.email == '' || contact.phone == '' || contact.first_name == ''  || contact.tags == ''){
    console.log('Campo Obrigatório') //Caso algum campo venha vazio retorna a mensagem no console
    }else{ // Agora se todos os campos vieram preenchidos 
            var contato_add = ac.api("contact/sync",contact); //Aqui é enviado para o active os dados do objeto contact
             //Agora é verificado aqui se o campo hora é igual ao valor comparado se for redireciona para a rota especificada
            if(contact.title == 'em' || contact.title == 'fb' || contact.title == 'ig' || contact.title == 'gg'){
                res.redirect("/confirmado-ide")
                res.statusCode = 200 //Então retorna o status de sucesso
            }else if(contact.title == '7l'){
                res.redirect("/confirmado-7l")
                res.statusCode = 200 //Então retorna o status de sucesso
            }else if(contact.title == 'um'){
                res.redirect("/confirmado-aciu")
                res.statusCode = 200 //Então retorna o status de sucesso
            }
            contato_add.then(function(result) { //Aqui passamos o valor da variável contato_add para result
                res.statusCode = 200 //Então retorna o status de sucesso
                console.log(result)//Imprimi também no console os dados da variável result
            },
                function(erro) { //Caso ocorra algum erro no cadastro
                    res.statusCode = 400//Retorna o Status 400
                    console.log(erro)//Imprimi o erro no console
            })
            
    }
   
    // console.log(contact)
})

//Rota Cadastro
app.post('/cadCde',(req,res,next)=>{

	var contact = { // definindo o objeto contact e recebendo os dados via body-parser
            "email": req.body.email,
            "first_name": req.body.firstName,
            "phone": req.body.phone,
            "field[10]": "7ºL",
            "field[15]": "",
            "tags": req.body.tag         
    }
    if(contact.email == ''|| contact.first_name == '' || contact.phone == ''){
        var msgErro = "Campo Obrigatório"
        console.log(msgErro) //Caso algum campo venha vazio retorna a mensagem no console
    }else{ // Agora se todos os campos vieram preenchidos 

            var contato_add = ac.api("contact/sync",contact); //Aqui é enviado para o active os dados do objeto contact
            res.statusCode = 200 //Então retorna o status de sucesso
            res.redirect('https://bit.ly/3zynsKE')

            contato_add.then(function(result) { //Aqui passamos o valor da variável contato_add para result
                res.statusCode = 200 //Então retorna o status de sucesso
                console.log('RETORNO CONSULTA ',result)//Imprimi também no console os dados da variável result
            }, function(erro) { //Caso ocorra algum erro no cadastro
                res.statusCode = 400//Retorna o Status 400
                console.log(erro)//Imprimi o erro no console
            });
            
    }
})


app.listen(80, (erro)=>{//iniciando o server
    if(erro){
        console.log('Server not started.')
    }else{
        console.log('Server started...')
    }
})