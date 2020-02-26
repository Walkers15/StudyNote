var topic = require('./lib/topic');
var author = require('./lib/author');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const db = require('./lib/db');

const app = express();
const port = 3000;

//사용 미들웨어
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static('public'));
app.disable('x-powered-by');
//직접 미들웨어 정의하여 사용하기
//app.use(function(request, response, next){
//use 대신 get 을 사용하면 get으로 요청되는 사항들(post 제외)에만 사용하게 됨
//와 개소름, 우리가 만들었던 람다들이 다 미들웨어였다!
app.use(function(request, response, next){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        request.list = topics;
        next();
    });
})
//route, routing
app.get('/', function(request, response){
    topic.home(request,response);
});
app.get('/page/:pageId', (request,response) =>{
    topic.page(request, response);
});
app.get('/create',(request,response) =>{
    topic.create(response)
});
app.post('/create_process', (request,response)=>{
    topic.create_process(request,response);
});
app.get('/update/:pageId', (request,response)=>{
    topic.update(response,request.params.pageId);
});
app.post('/update_process',(request,response)=>{
    topic.update_process(request,response);
});
app.get('/delete/:pageId', (request,response)=>{
    topic.delete(response,request.params.pageId);
});
app.post('/delete_process',(request,response)=>{
    topic.delete_process(request,response);
});
app.get('/author',(req,res)=>{
    author.page(req,res);
});
app.get('/author_create',(request,response)=>{
    author.create(response);
});
app.post('/author_create_process',(request,response)=>{
    author.create_process(request,response);
});
app.get('/author_update/:authorId',(request,response)=>{
    author.update(response,request.params.authorId);
});
app.post('/author_update_process',(request,response)=>{
    author.update_process(request,response);
});
app.get('/author_delete/:authorId',(request,response)=>{
    author.delete(response,request.params.authorId);
});
app.post('/author_delete_process',(request,response)=>{
    author.delete_process(request,response);
});
app.use(function(req,res,next){
    topic.notFound(res);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
