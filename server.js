var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号\nnode server.js 8888 例如这样？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    console.log('有请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/index.html'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        const page1 = fs.readFileSync('database/page1.json').toString()
        const array = JSON.parse(page1)
        const result = array.map(item=>`<li>${item.id}</li>`).join('')
        string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)
        response.write(string)
        response.end()
    } else if(path === '/main.js'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if(path === '/style.css'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if(path === '/load.js'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/load.js'))
        response.end()
    } else if(path === '/load.html'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/load.html'))
        response.end()
    } else if(path === '/load.xml'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/load.xml'))
        response.end()
    } else if(path === '/load.json'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('public/load.json'))
        response.end()
    } else if(path === '/page2'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('database/page2.json'))
        response.end()
    } else if(path === '/page3'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('database/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)