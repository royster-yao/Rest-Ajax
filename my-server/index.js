const express = require("express")
// 引入jwt
const jwt = require("jsonwebtoken")

const app = express()

 let STU_ARR = [
    {id:"1",name:"孙悟空",age:18,gender:"男",address:"花果山"},
    {id:"2",name:"猪八戒",age:28,gender:"男",address:"高老庄"},
    {id:"3",name:"沙和尚",age:38,gender:"男",address:"流沙河"}
]

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res,next) => {
       // 设置响应头
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH")
    res.setHeader("Access-Control-Allow-Headers","Content-type,Authorization")
    // Access-Control-Allow-Origin 设置指定值时只能设置一个
    // res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    // Access-Control-Allow-Methods 允许的请求方式
    // Access-Control-Allow-Headers 允许传递的请求头
    next()
})

// 定义一个登录的路由
app.post("/login",(req, res) => {
    // 获取用户输入的用户名和密码
    const {username,password} = req.body
    // 验证用户名和密码
    if(username === "admin" && password === "123123"){
        // 登陆成功，生成token
        const token = jwt.sign({
            id:"1234",username:
            "admin",
            nickname:"超级管理员"},
            "chaojianquanmima",
            {
                expiresIn:"7d"
            }
            )
        res.send({
            status:"OK",
            data:{
                token,
                nickname:"超级管理员"
            }
        })
    }else {
        res.status(403).send({
            status:"error",
            data:"用户名或密码错误"
        })
    }
})

// 统一的api
// 定义学生相关的路由
app.get("/students",(req,res) => {
 

    // 对token进行解码
    try {
        // 这个路由必须是登录才能访问
        // 需要检查用户是否登录
        // 读取请求头
        const token = req.get("Authorization").split(" ")[1]
        const decodeToken = jwt.verify(token,"chaojianquanmima")

        console.log(decodeToken);
        // 解码成功token有效
        // 返回学生信息
        res.send({
            status:"OK",
            data:STU_ARR
        })
    } catch (error) {
        // 解码错误，用户的tiken无效
        res.status(403).send({
            status:"error",
            data:"token无效"
        })
    }
    
   
})

// 定义一个添加学生的路由 
app.post("/students",(req, res) => {
    // 获取学生信息
    const {name,age,gender,address} = req.body    // 将学生信息添加到数组
    // 创建学生信息
    const stu = {
        id:+STU_ARR.at(-1).id + 1 + "",
        name,
        age: +age,
        gender,
        address,
    }
    STU_ARR.push(stu) 
    res.send({
        status:"OK",
        data:stu
    })
})


// 查询某个学生的id
app.get("/students/:id",(req, res) =>{
    const id = req.params.id
    const stu = STU_ARR.find(item => item.id === id)
    res.send({
        status:"OK",
        data:stu
    })
})

// 定义一个删除学生的路由 
app.delete("/students/:id",(req, res) =>{
    const id = req.params.id
    STU_ARR = STU_ARR.filter(item => item.id !== id)
    res.send({
        status:"OK",
        data:STU_ARR
    })
} )

// 定义一个修改学生的路由 
app.put("/students",(req, res) => {
    const {id,name,age,gender,address} = req.body
    const updateStu = STU_ARR.find(item => item.id = id)
    if (updateStu) {
        updateStu.name = name
        updateStu.age = age
        updateStu.gender = gender
        updateStu.address = address
        res.send({
            status:"OK",
            data:updateStu
        })
    }else {
        res.status(403).send({
            status:"errso",
            data:"学生id不存在"
        })
    }
})
app.listen(3000,()=>{
    console.log("服务器启动成功,请访问http://localhost:3000");
    
})