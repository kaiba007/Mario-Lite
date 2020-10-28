// 创建地图
// 遍历地图行列，得到元素的坐标点，进行背景赋值

// 元素的大小
const pSize=50;
// 人物的坐标
var personXY = {
    x:0,
    y:0
}
var moveStatus = "right";

var coinXY ={
    x:0,
    y:0
}

function createMap(){
    var box=document.getElementById("box");
    // 遍历行
    for (var i=0;i<maps.length;i++){
        // 遍历列
        for (var j=0;j<maps[i].length;j++){
            var el= createEl(i,j,maps[i][j]);
            if(el){
                box.appendChild(el);
            }
        }
    } 
}

// 创建元素
function createEl(x,y,val){
    if(val==0){
        return 
    }
// 创建元素，确定元素的坐标位置
    var el=document.createElement("div");
    el.style.left=y*pSize+"px";
    el.style.bottom =(10-x)*pSize+"px";
    $(el).addClass("pos");

    switch(val){
        case 1:
            el.style.backgroundImage="url('./images/gfx/bonus/cracked.bmp')"
            $(el).css({"width":"50px","height":"50px"});
            break;
        case 2:
            el.style.backgroundImage="url('./images/gfx/bonus/crackstone.bmp')"
            $(el).css({"width":"50px","height":"50px"});
            break;
        case 3:
            el.id='coin';
             // 获取金币的坐标
             coinXY.x=350;
             coinXY.y=350;
            el.style.backgroundImage="url('./images/gfx/bonus/coin1.bmp')"
            $(el).css({"width":"35px","height":"35px"});
            break;
        case 5:
        case 6:
            el.style.backgroundImage="url('./images/gfx/bonus/box.bmp')"
            $(el).css({"width":"50px","height":"50px"});
            break;
        // 草地
        case 7:
            el.style.backgroundImage="url('./images/gfx/background/hedge_1b.bmp')"
            $(el).css({"width":"100px","height":"50px"});
            break;
        case 8:
            el.style.backgroundImage="url('./images/gfx/background/cloud1.bmp')"
            $(el).css({"width":"100px","height":"50px"});
            break;
        case 9:
            el.style.backgroundImage="url('./images/gfx/background/cloud2.bmp')"
            $(el).css({"width":"100px","height":"50px"});
            break;
        case 10:
            el.id='person';
            // 获取人物的坐标
            personXY.x=(10-x)*pSize;
            personXY.y=y*pSize;
            el.style.backgroundImage="url('./images/gfx/characters/small/player1r.bmp')"
            $(el).css({"width":"50px","height":"50px"});
            break;  
        case 21:
            el.style.backgroundImage="url('./images/gfx/tiles/pipes/right/1.bmp')"
            $(el).addClass("ral");
            $(el).css({"width":"50px","height":"50px"});
            break;
        case 22:
            el.style.backgroundImage="url('./images/gfx/tiles/pipes/right/2.bmp')"
            $(el).addClass("ral");
            $(el).css({"width":"50px","height":"50px"});
            break;
        case 23:
            el.style.backgroundImage="url('./images/gfx/tiles/pipes/right/3.bmp')"
            $(el).addClass("ral");
            $(el).css({"width":"50px","height":"50px"});
            break;    
         case 24:
            el.style.backgroundImage="url('./images/gfx/tiles/pipes/right/4.bmp')"
            $(el).addClass("ral");
            $(el).css({"width":"50px","height":"50px"});
            break;     
    } 
    return el;
}

// 移动人物 传 移动的方向和速度
function movePerson(dir,size){
    // 获得人物
    var person = document.getElementById('person')
    var coin = document.getElementById('coin')

    switch(dir){
        case "left":
            if((personXY.x==100&&personXY.y>=3&&personXY.y<=606)||(personXY.x==250&&personXY.y>=628&&personXY.y<=680)){              
                personXY.y -=3;
                person.style.backgroundImage = "url('./images/gfx/characters/small/player1l.bmp')"
                person.style.left = personXY.y+"px"; 
                $(person).addClass("startPersonMinLeftA");
                moveStatus = "left";

                checkEatCoin();
                checkWin();
            }else if(personXY.x==250&&personXY.y<628){
                personXY.x -=150;
                personXY.y =603;
                person.style.backgroundImage = "url('./images/gfx/characters/small/player1l.bmp')"
                person.style.bottom = personXY.x+"px";
                person.style.left = personXY.y+"px"; 

            }
            break;
        case "right":
            if((personXY.x==100&&personXY.y>=0&&personXY.y<=603)||(personXY.x==250&&personXY.y>=602&&personXY.y<=677)){
                console.log(personXY.y+"Y");
                console.log(personXY.x+"X");
                personXY.y +=3;
                person.style.backgroundImage = "url('./images/gfx/characters/small/player1r.bmp')"
                person.style.left = personXY.y+"px";
                $(person).addClass("startPersonMinRightA");
                moveStatus = "right";

                checkEatCoin();
                checkWin();

                console.log(coinXY.x+"coinx")
                

            }
            break;
        case "up":
            if(personXY.x==100 || personXY.x==250 ){
                personXY.x +=150;
                console.log(moveStatus);
                if(moveStatus == "left"){
                    person.style.backgroundImage = "url('./images/gfx/characters/small/player1l.bmp')"
                    person.style.bottom = personXY.x+"px";
                    $(person).addClass("startPersonMinLeftUpA");
                    // 判断是否与金币砖块碰撞
                    if(personXY.x ==250&&personXY.y>=300&&personXY.y<=400){
                        startCoin();
                    }
                }else if(moveStatus == "right"){
                    person.style.backgroundImage = "url('./images/gfx/characters/small/player1r.bmp')"
                    person.style.bottom = personXY.x+"px";
                    $(person).addClass("startPersonMinRightUpA");
                     // 判断是否与金币砖块碰撞
                     if(personXY.x ==250&&personXY.y>=300&&personXY.y<=400){
                        startCoin();
                     }
                      
                }
            }        
            break;
        case "down":
            
            if((personXY.y>=0&&personXY.y<603)||(personXY.y>=628)){
                personXY.x -=150;
                if(moveStatus == "left"){
                    person.style.backgroundImage = "url('./images/gfx/characters/small/player1l.bmp')"
                }else if(moveStatus == "right"){
                    person.style.backgroundImage = "url('./images/gfx/characters/small/player1r.bmp')"
                }
                person.style.bottom = personXY.x+"px";
                // $(person).addClass("startPersonMindownA");
            }else if(personXY.y=603){
                personXY.y +=25;
                person.style.left = personXY.y+"px";
            }     
            break;
    }
}

function stopMovePerson(){
    var person = document.getElementById('person')
    $("#person").removeClass("startPersonMinLeftA").removeClass("startPersonMinRightA").removeClass("startPersonMinLeftUpA").removeClass("startPersonMinRightUpA")
}

function startCoin(){
        var coin = document.getElementById('coin');
        coin.style.display="block";
        $(coin).addClass("startCoinMinFall"); 
        coinXY.x =100;
        coinXY.y =300;    
        coin.style.bottom = coinXY.x+"px";
        coin.style.left = coinXY.y+"px";        
        console.log(coin.style.left+"coiny")
        setTimeout(function(){
            $("#coin").removeClass("startCoinMinFall");
            $(coin).addClass("startCoinMin")
        },1000);
}


function checkEatCoin(){
    var person = document.getElementById('person')
    var coin = document.getElementById('coin')
    var score = document.getElementById('score')
    if( coin.style.left  =="300px" &&  personXY.y>=297 && personXY.y<=306){
        coin.style.display="none";
        $("#score").text("1")
    }
}

function checkWin(){
    var person = document.getElementById('person')
    var score = document.getElementById('score')
    var win = document.getElementById('win')
    if(personXY.y>=676){
        if($("#score").text()==1){
            alert('游戏结束');
            endGame();
        }else if(personXY.x=250){
            alert('收集完所有金币才结束');
        }
    }
    
    // var cover = document.querySelector('.cover');
               
    //             cover.style.backgroundImage ="url('./images/gfx/恭喜1.bmp')";
    //             cover.style.backgroundImage.height=50px;
    //             cover.style.display="inline";

}


function endGame(){
    stopMovePerson();
    var cover = document.querySelector('.cover');
    var person = document.getElementById('person');
    var score = document.getElementById('score');
    personXY.x=100
    personXY.y=0
    person.style.bottom = personXY.x+"px";
    person.style.left =personXY.y+"px";
    $("#score").text("0");
    cover.style.display="inline";
}