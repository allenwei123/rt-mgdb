//引入mongodb模块，获取客户端对象
let MongoClient = require('mongodb').MongoClient;
const test = require('assert');

//链接字符串
let DB_CONN_STR = 'mongodb://localhost:27017';

const dbName = 'node-login';

//定义函数表达式，用于操作数据库并反馈结果
let inserData = function(client,callback){
    //获得指定得集合
    const col = client.db(dbName).collection('goods');

    //插入数据
    let data = [{name:'商品4',price:11,num: 50}];

    col.insert(data,function(err,result){
        if(err) {
            return console.log('error:'+ err)
        }
        callback(result);
    })
};

const findOneData = function(client,callback) {
    const col = client.db(dbName).collection('goods');
    let query = {price:'100'};

    col.find(query).toArray(function(err,result){
        if(err){
            return console.log('error:' + err)
        }
        callback(result)
    })
}

//删除数据
const delOneData = function(client,callback) {
    const col = client.db(dbName).collection('goods');
    let query = {name:'rose'};

    col.deleteOne(query,function(err,result){
        test.equal(null, err);
        callback(result)
    })
}
//更新数据
const updateData = function(client,callback) {
    const col = client.db(dbName).collection('goods');

    let query = {name:'商品1'};
    let updateData = {name:'商品'};

    col.update(query,{$set: updateData},function(err,result){
        test.equal(null, err);
        callback(result)
    })
}

//使用客户端链接数据，并指定完成时的回调方法
MongoClient.connect(DB_CONN_STR,function(err,client){
    console.log('链接成功');
    //执行插入数据操作，调用自定义方法
    // const db = client.db(dbName).admin(); 
    // inserData( client , function(result){
    //     //显示结果
    //     console.log(result.ops);
    //     client.close();
    // })

    // findOneData(client ,function(result){
    //     console.log('查找成功:')
    //     console.log(result);
    //     client.close();
    // })

    // delOneData(client ,function(result){
    //     console.log('删除成功:')
    //     console.log(result);
    //     client.close();
    // })

    updateData(client ,function(result){
        console.log('更新数据成功:')
        console.log(result.result);
        client.close();
    })
})
