const jwt = require("jsonwebtoken")

// 创建一个对象
const obj = {
    name:"孙悟空",
    age:18,
    gender:"男"
}

// 使用jwt来对json数据进行加密
const token = jwt.sign(obj,"hellohellohowareyou",{
    expiresIn:"1h"
})

try {
    // 服务器收到客户端的token后
    const result = jwt.verify(token,"hellohellohowareyou")
    console.log(result);
} catch (error) {
    // 说明token解码失败，说明token失效
    console.log("无效的token");
}


