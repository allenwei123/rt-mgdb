const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();
const routers = router
    .get('/home', async (ctx) => {
        const title = 'login home';
        ctx.headers = {
            'Content-Type': 'application/json',
            'app': 'h5'
        }
        ctx.body = {code:200,data:{a:'allen'}}
    })

// 使用ctx.body解析中间件
app.use(bodyParser());
app.use(routers.routes())

app.listen(3003,function(){
    console.log('启动成功')
});


