const express = require("express");
const MongoClient = require("mongodb").MongoClient;
//데이터베이스의 데이터 입력,출력을 위한 함수명령어 불러들이는 작업
const app = express();
const port = 3000;

//ejs 태그를 사용하기 위한 세팅
app.set("view engine","ejs");
//사용자가 입력한 데이터값을 주소로 통해서 전달되는 것을 변환(parsing)
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
//css/img/js(정적인 파일)사용하려면 이코드를 작성!
app.use(express.static('public'));

//데이터 베이스 연결작업
let db; //데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)

MongoClient.connect("mongodb+srv://sjrnf5749:0864gmldus@cluster0.nz0mjly.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("big6");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});

app.get("/",function(req,res){
    res.render("index.ejs",{booksList:booksList})
});

app.get("/problem",function(req,res){
    res.render("problem.ejs")
});

app.get("/school",function(req,res){
    res.render("school.ejs")
});


app.get("/company",function(req,res){
    res.render("company.ejs")
});


app.get("/directions",function(req,res){
    res.render("directions.ejs")
});

app.get("/cooperation",function(req,res){
    res.render("cooperation.ejs",{cooperationList:cooperationList})
});

app.get("/books",function(req,res){
    res.render("books.ejs",{booksList:booksList})
});




const cooperationList= [
    {
        area:"서울",
        title:"북마트",
        phone:"02)833-0864"
    },
    {
        area:"서울",
        title:"에쿠페",
        phone:"02)260-3695"
    },
    {
        area:"수원",
        title:"에듀미디어",
        phone:"031)296-5101"
    },  
    {
        area:"인천",
        title:"책사랑",
        phone:"032)469-8058"
    },
    {
        area:"청주",
        title:"대한교육평가원",
        phone:"043)263-5500"
    },
    {
        area:"천안",
        title:"에듀플러스",
        phone:"041)557-8915"
    },
    {
        area:"전주",
        title:"다온서적",
        phone:"063)275-1200"
    },
    {
        area:"대구",
        title:"에듀플러스",
        phone:"053)424-9479"
    },
    {
        area:"부산",
        title:"대한서적",
        phone:"051)316-3939"
    },
    {
        area:"울산",
        title:"영진에듀",
        phone:"052)257-8094"
    },
    {
        area:"마산",
        title:"모던북스",
        phone:"055)295-2285"
    },
    {
        area:"대전",
        title:"파인북스",
        phone:"042)252-9323"
    },
    {
        area:"광주",
        title:"조은서적",
        phone:"062)262-5961"
    }
]


const booksList=[
    {
        img:"img/book1.png",
        name:"한글2020",
        author:"빅식스 기획실",
        publisher:"빅식스  |  2023.01.10"
    },
    {
        img:"img/book2.png",
        name:"윈도우 10",
        author:"왕정현",
        days:"빅식스  |  2022.11.17"
    },
    {
        img:"img/book3.png",
        name:"파워포인트 2016",
        author:"김두한",
        days:"빅식스  |  2022.11.17"
    },
    {
        img:"img/book4.png",
        name:"엑셀 2016",
        author:"김은영",
        days:"빅식스  |  2022.12.15"
    },
    {
        img:"img/book5.png",
        name:"한셀 2016",
        author:"김두한",
        days:"빅식스  |  2022.11.17"
    },
    {
        img:"img/book3.png",
        name:"파워포인트 2016",
        author:"이경주/김은영",
        days:"빅식스  |  2023.03.25"
    },
    {
        img:"img/book6.png",
        name:"한쇼 2016",
        author:"빅식스 기획실",
        days:"빅식스  |  2022.12.15"
    }]


