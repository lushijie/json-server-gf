# json-server for my girlfriend

![快跑小白](./public/static/200w.gif)

### 安装依赖
    1. npm install
    2. npm install json-server -g
    3. npm run server 依赖 python, 如果使用默认webserver请安装python

### demo运行
    1. 安装依赖之后,进入该项目根目录
    2. 启动JSON-server, npm run json， 默认端口 3000
    3. 启动WEB-server, npm run server，默认端口 8080
    4. 浏览器访问 http://127.0.0.1:8080/demo/index.html


### 实际项目中使用
    1. 在 jquery 之后引入 jquery.request.js
    2. 根据实际情况修改 TEST_SERVER_ADDRESS 与 API_SERVER_ADDRESS
    3. 调用接口时使用封装的 $.getJson 与 $.postData
    4. 启动JSON-server, 在该项目目录下运行 npm run json
    5. 启动WEB-server, 其他WEB-server或者npm run server
    6. 浏览器访问页面
