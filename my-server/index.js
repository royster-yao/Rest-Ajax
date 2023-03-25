const express = require("express")
const app = express()

 let STU_ARR = [
    {id:"1",name:"孙悟空",age:18,gender:"男",address:"花果山"},
    {id:"2",name:"猪八戒",age:28,gender:"男",address:"高老庄"},
    {id:"3",name:"沙和尚",age:38,gender:"男",address:"流沙河"}
]

app.use(express.urlencoded({extended: true}))
app.use(express.json())


// 定义学生相关的路由
app.get("/students",(req,res) => {
    console.log("收到了students的get请求");
    // 返回学生信息
    res.send({
        status:"OK",
        result:STU_ARR
    })
})

// 定义一个添加学生的路由 
app.post("/students",(req, res) => {
    console.log("收到了students的post请求",req.body);
    // 获取学生信息
    const {name,age,gender,address} = req.body    // 将学生信息添加到数组
    STU_ARR.push({
        id:STU_ARR.at(-1).id + 1 + "",
        name,
        age: +age,
        gender,
        address,
    }) 
    res.send({
        status:"OK",
        result:STU_ARR
    })
})



// 定义一个删除学生的路由 
app.delete("/students",(req, res) =>{
    const id = req.body.id
    STU_ARR = STU_ARR.filter(item => item.id !== id)
    res.send({
        status:"OK",
        result:STU_ARR
    })
} )


// 定义一个修改学生的路由 

app.listen(3000,()=>{
    console.log("服务器启动成功,请访问http://localhost:3000");
    
})