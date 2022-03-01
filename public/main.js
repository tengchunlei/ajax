//加载CSS文件
getCSS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET','/style.css');
    request.onreadystatechange = ()=> {
        console.log(request.readyState);
        //下载完成，但不能判断是成功2xx 还是失败4xx
        if(request.readyState===4){
            if(request.status >=200 && request.status <300){
                //创建 style 标签
                const style = document.createElement("style");
                //填写 style 的内容
                style.innerHTML = request.response;
                //插入到 head
                document.head.appendChild(style);
            }else{
                alert("加载 CSS 失败");
            }
        }
    };
    request.send();
};

//加载JS文件
getJS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET','/load.js');
    request.onreadystatechange = ()=> {
        console.log(request.readyState);
        if(request.readyState===4){
            if(request.status >=200 && request.status <300){
                //创建 script 标签
                const script = document.createElement("script")
                //填写 script 的内容
                script.innerHTML = request.response;
                //插入到 body
                document.body.appendChild(script);
            }else{
                alert("加载 JS 失败");
            }
        }
    }
    request.send();
};

//加载HTML
getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET','/load.html');
    request.onreadystatechange = ()=> {
        console.log(request.readyState);
        if(request.readyState===4){
            if(request.status >=200 && request.status <300){
                //创建 div 标签
                const div = document.createElement("div")
                //填写 div 的内容
                div.innerHTML = request.response;
                //插入到 body
                document.body.appendChild(div);
            }else{
                alert("加载 HTML 失败");
            }
        }
    }
    request.send();
};

//加载XML文件
getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET','/load.xml');
    request.onreadystatechange = ()=> {
        if(request.readyState===4&&(request.status>=200&&request.status<300)){
                const dom = request.responseXML;
                const text = dom.getElementsByTagName("warning")[0].textContent;
            console.log(text.trim());
            }
    }
        request.send();
};

//加载JSON文件
getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET','/load.json');
    request.onreadystatechange = ()=> {
        if(request.readyState===4&&(request.status>=200&&request.status<300)){
            console.log(request.response);
            const object = JSON.parse(request.response)
            myName.textContent = object.name
        }
    }
    request.send();
};

//加载分页
let n = 1;
getPage.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open("GET",`/page${n+1}`);
    request.onreadystatechange = ()=> {
        if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
            const array = JSON.parse(request.response);
            array.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.id;
                xxx.appendChild(li);
            });
            n += 1
        }
    };
        request.send();
};











