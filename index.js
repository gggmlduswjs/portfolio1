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

/*passport  passport-local  express-session 설치후 불러오기
    로그인 검정 및 세션 생성에 필요한 기능 사용
*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


app.use(session({secret :'secret', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 



//로그인 했을 때 검증 처리
passport.use(new LocalStrategy({
    usernameField:"memberid",
    passwordField:"memberpass",
    session:true,
    },      //해당 name값은 아래 매개변수에 저장
    function(memberid, memberpass, done) {
                    //회원정보 콜렉션에 저장된 아이디랑 입력한 아이디랑 같은지 체크                                 
      db.collection("members").findOne({ memberid:memberid }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        //비밀번호 체크 여기서 user는 db에 저장된 아이디의 비번값
        if (memberpass == user.memberpass) {
            return done(null, user)
          } else {
            return done(null, false)
          }
      });
    }
));


//처음 로그인 했을 시 세션 생성 memberid는 데이터에 베이스에 로그인된 아이디
passport.serializeUser(function (user, done) {
done(null, user.memberid)
});

//다른 페이지(서브페이지,게시판 페이지 등 로그인 상태를 계속 표기하기 위한 작업)
//로그인이 되있는 상태인지 체크
passport.deserializeUser(function (memberid, done) {
db.collection('members').findOne({memberid:memberid }, function (err,result) {
    done(null, result);
    })
}); 


app.get("/",function(req,res){
    res.render("index.ejs",{booksList:booksList,login:req.user})
});

app.get("/problem",function(req,res){
    res.render("problem.ejs",{login:req.user})
});

app.get("/school",function(req,res){
    res.render("school.ejs",{login:req.user})
});


app.get("/company",function(req,res){
    res.render("company.ejs",{login:req.user})
});


app.get("/directions",function(req,res){
    res.render("directions.ejs",{login:req.user})
});

app.get("/cooperation",function(req,res){
    res.render("cooperation.ejs",{cooperationList:cooperationList,login:req.user})
});

app.get("/books",function(req,res){
    res.render("books.ejs",{booksList:booksList,login:req.user})
});

//다른 서브페이지들도 로그인 되어있는 회원정보 데이터 보내야 함
app.get("/board",(req,res)=>{
    res.render("boardlist.ejs",{login:req.user})
})



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


//회원가입 페이지 화면으로 가기위한 경로요청
app.get("/join",(req,res)=>{
    res.render("join.ejs",{login:req.user});
})

//회원가입 데이터 db에 요청
app.post("/joindb",(req,res)=>{
    // 아이디->memberid:아이디입력한거
    // 비밀번호->memberpass:비밀번호입력한거
    db.collection("members").findOne({memberid:req.body.memberid},(err,member)=>{
        //찾을 데이터 값이 존재할 때 -> 중복된 아이디가 있음
        if(member){
            //자바스크립트 구문을 삽입할 때도 사용가능 =>send는 내가 적은 문자열을 그냥 보내주는 역할
            res.send("<script> alert('이미 가입된 아이디입니다'); location.href='/join';</script>")
        }
        else{
            db.collection("count").findOne({name:"회원"},(err,result)=>{
                db.collection("members").insertOne({
                    memberno:result.memberCount,
                    memberid:req.body.memberid,
                    memberpass:req.body.memberpass,
                    membername:req.body.membername,
                    memberemail:req.body.memberemail,
                    membernick:req.body.membernick
                },(err)=>{

                    db.collection("count").updateOne({name:"회원"},{$inc:{memberCount:1}},(err)=>{
                        res.send("<script> alert('회원가입 완료'); location.href='/login';</script>")
                    })


                })
            })
        }
    })
})


//로그인 화면페이지 경로요청
app.get("/login",(req,res)=>{
    res.render("login.ejs",{login:req.user})
})


//로그인 처리 요청경로
app.post("/logincheck",passport.authenticate('local', {failureRedirect : '/login'}),(req,res)=>{
    res.redirect("/"); //로그인 성공시 메인페이지로 이동
})



//로그아웃 처리 요청경로
app.get("/logout",(req,res)=>{
    //로그아웃 함수 적용 후 메인페이지로 이동
    //logout 함수는 서버에 있는 세션을 제거해주는 역할
    req.logOut(()=>{
        res.redirect("/")
    })
})



//마이페이지 보여주는 경로
app.get("/mypage",(req,res)=>{
    res.render("mypage",{login:req.user})
   // login:req.user
})


//회원정보 수정 후 db에 수정요청
app.post("/myupdate",(req,res)=>{
    //수정페이지에서 입력한 기존 비밀번호와 로그인하고 있는 중의 비밀번호랑 일치하는지 비교
    if(req.body.originPass === req.user.memberpass){
                                                //로그인하고 있는 유저의 아이디
        db.collection("members").updateOne({memberid:req.user.memberid},
            {$set:{memberpass:req.body.changePass}},(err)=>{ res.redirect("/");})
    }

    else {
        res.send("<script> alert('기존 비밀번호와 일치하지 않습니다'); location.href='/mypage' </script>")
    }
})