window.addEventListener('load', windowLoaded, false);

function windowLoaded() {
    canvasApp();
}

function canvasApp() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    //console.log("w: "+canvas.width+" h: "+canvas.height);
    //POSIÇÃO ALEATÓRIA
    //var yr = 10;
    var wr = 50;
    var hr = wr;
    var yr = (Math.random() * (canvas.height - hr)) + 10;
    var xr = 10;
    var xr2 = (Math.random() * (canvas.width - wr)) + 10;
    var yr2 = 10;
    var yr3 = (Math.random() * (canvas.height - hr)) + 10;
    var xr3 = canvas.width;
    var xr4 = (Math.random() * (canvas.width - wr)) + 10;
    var yr4 = 10;
    var xc = canvas.width / 2;
    var yc = canvas.height / 2;
    var rc = 20;
    var key = 0;
    var speed = 60;
    var loop = setInterval(isLoad, speed);
    var dead = false;
    var tema;
    var sound_dead;
    var load = 0;
    var total = 5;
    var state_mario = 'stop';
    var cs_mario = 0;//contador de sprite
    var sx, sy, sw = 44, sh = 63;//variáveis para recortar sprite mario
    var img_mario = new Image();
    var img_turtle = new Image();
    var img_enemis = new Image();
    var cs_turtle = 0;
    var cs_enemis = 0;

    loadAssets();

    function mainLoop() {

        control();
        moveRetangulo();
        moveRetangulo2();
        moveRetangulo3();
        moveRetangulo4();

        drawBackground();

        //drawRect(xr, yr, wr, hr, "#00f");
        drawTurtle(xr, yr, wr - 10, hr - 10, img_turtle);
        
        //drawRect(xr2, yr2, wr, hr, "#f00");
        drawEnemis(xr2, yr2, wr, hr, img_enemis, 1);
        //drawRect(xr3, yr3, wr, hr, "#0f0");
        drawEnemis(xr3, yr3, wr, hr, img_enemis, 2);
        //drawRect(xr4, yr4, wr, hr, "#000");
        drawEnemis(xr4, yr4, wr, hr, img_enemis, 3);
        
        //drawSmile();
        drawMario();

        if (colide(xr + 10, yr + 10, wr / 2, hr / 2)
                || colide(xr2 + 15, yr2 + 15, wr / 2, hr / 2)
                || colide(xr3+10, yr3+10, wr/3, hr-15)
                || colide(xr4, yr4, wr, hr)) {
            
            gameover();
        }

    }

//    window.addEventListener("keydown",function (e){
//         key = e.keyCode;
//         console.log(key);        
//    });

    $(document).keydown(function (e) {
        key = e.which;
        if (load === total) {
            start();
        }
        console.log(key);
    });

    $(document).keyup(function (e) {
        key = 0;
        state_mario = 'stop';
    });


//MOVENDO O MARIO
    function control() {
        if (key === 38) {
            state_mario = 'up';
            if (yc - rc <= 0) {
                yc = rc;
            } else {
                yc -= 7;
            }
        } else if (key === 40) {
            state_mario = 'down';
            yc += 7;
        } else if (key === 37) {
            state_mario = 'left';
            xc -= 7;
        } else if (key === 39) {
            state_mario = 'right';
            xc += 7;
        }
    }

    function moveRetangulo() {
        xr += 10;
        //Testa quando sai do canvas e reinicia
        if (xr > canvas.width) {
            xr = 10;
            yr = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function moveRetangulo2() {
        yr2 += 10;
        //Testa quando sai do canvas e reinicia
        if (yr2 > canvas.height) {
            yr2 = 10;
            xr2 = (Math.random() * (canvas.width - wr)) + 10;
        }
    }

    function moveRetangulo3() {
        xr3 -= 10;
        //Testa quando sai do canvas e reinicia
        if (xr3 < 0) {
            xr3 = canvas.width;
            yr3 = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function moveRetangulo4() {
        xr4 += 10;
        yr4 += 10;
        //Testa quando sai do canvas e reinicia
        if (xr4 > canvas.width) {
            xr4 = 10;
            yr4 = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function colide(x, y, w, h) {
        var debug = 0;
        if (debug) {
            context.strokeStyle = "#000";
            context.strokeRect(x, y, w, h);

            context.strokeStyle = 'red';
            context.beginPath();//Inicia o  desenho
            context.lineWidth = 3;//Define largura do traço
            context.arc(//Método para desenhar circulos
                    xc, // Posição X
                    yc, // Posição Y
                    rc, // Raio
                    (Math.PI / 180) * 0,
                    (Math.PI / 180) * 360,
                    false);
            context.stroke();
            context.closePath();
        }

        if ((xc > (x - rc) && xc < (x - rc) + (w + rc * 2))
                && (yc > (y - rc) && yc < (y - rc) + (h + rc * 2)))
        {
            console.log("xc: " + xc);
            console.log("yc: " + yc);
            console.log("rc: " + rc);
            console.log("xr: " + x);
            console.log("yr: " + y);
            console.log("wr: " + w);
            console.log("hr: " + h);


            return true;
        } else {
            return false;
        }
    }

    function drawBackground() {
        //background
        context.fillStyle = 'rgba(255,255,255)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#000';
        context.strokeRect(2, 2, canvas.width-2, canvas.height-2);
    }


    function drawRect(x, y, w, h, color) {
        context.fillStyle = color;
        context.fillRect(x, y, w, h);
    }


    function drawTurtle(x, y, w, h, img) {
        cs_turtle++;
        if (cs_turtle === 2)
            cs_turtle = 0;
        context.drawImage(img, cs_turtle * 18, 0, 18, 25, x, y, w, h);
    }


    function drawEnemis(x, y, w, h, img, i) {
        cs_enemis++;
        if (cs_enemis === 2)
            cs_enemis = 0;
        context.drawImage(img, cs_enemis * 35, i * 35, 35, 35, x, y, w, h);
    }


    function drawSmile() {
        context.beginPath();//Inicia o  desenho
        context.lineWidth = 3;//Define largura do traço
        context.arc(//Método para desenhar circulos
                xc, // Posição X
                yc, // Posição Y
                rc, // Raio
                (Math.PI / 180) * 0,
                (Math.PI / 180) * 360,
                false);
        context.fillStyle = "#ff0";
        context.fill();
        context.stroke();
        context.closePath();

        context.beginPath();//Inicia o  desenho
        context.lineWidth = 3;//Define largura do traço
        context.arc(//Método para desenhar circulos
                xc - 7, // Posição X
                yc - 7, // PosiÃção Y
                2, // Raio
                (Math.PI / 180) * 0,
                (Math.PI / 180) * 360,
                false);
        context.fillStyle = "#000";
        context.fill();
        context.stroke();
        context.closePath();

        context.beginPath();//Inicia o  desenho
        context.lineWidth = 3;//Define largura do traço
        context.arc(//Método para desenhar circulos
                xc + 7, // Posição X
                yc - 7, // Posição Y
                2, // Raio
                (Math.PI / 180) * 0,
                (Math.PI / 180) * 360,
                false);
        context.fillStyle = "#000";
        context.fill();
        context.stroke();
        context.closePath();

        context.beginPath();//Inicia o  desenho
        context.lineWidth = 3;//Define largura do traço
        if (!dead) {
            context.arc(//Método para desenhar circulos
                    xc, // Posição X
                    yc, // Posição Y
                    15, // Raio
                    (Math.PI / 180) * 0,
                    (Math.PI / 180) * 180,
                    false);

        } else {
            context.arc(//Método para desenhar circulos
                    xc, // Posição X
                    yc + 10, // Posição Y
                    10, // Raio
                    (Math.PI / 180) * 180,
                    (Math.PI / 180) * 0,
                    false);
        }

        //context.fillStyle = "#000";
        //context.fill();
        context.stroke();
        context.closePath();
    }

    function isLoad() {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = "#000";
        context.font = "28px sans-serif";
        context.textBaseline = 'top';
        
        if (load === total) {
            context.fillText("PRONTO!! ", 10, 10);
            context.fillText("Aperte uma tecla para iniciar o Jogo", 10, 40);

        } else {
            context.fillText("Carregando ... " + (load * 100 / total) + "% !", 10, 10);
        }
        
        context.fillStyle = "#f00";
        context.fillRect(canvas.width / 2,
                canvas.height / 2, (canvas.width / 2) * load / total,
                canvas.height * 0.1);
                
        context.strokeStyle = "#000";
        context.strokeRect(canvas.width / 2,
                canvas.height / 2, canvas.width / 2,
                canvas.height * 0.1);
    }

    function start() {
        clearInterval(loop);
        loop = setInterval(mainLoop, speed);
        load = 0;
        tema.play();
    }

    function gameover() {
        tema.pause();
        tema.currentTime = 0;
        sound_dead.play();
        clearInterval(loop);
        dead = true;
    }
    //DESENHA O MARIO
    function drawMario() {
        if (state_mario === 'stop') {
            cs_mario = 1;
        } else {
            cs_mario++;
        }
        if (cs_mario === 4) {
            cs_mario = 0;
        }
        sx = 47;
        if (state_mario === 'down') {
            sy = 132;
        } else if (state_mario === 'up') {
            sy = 4;
        } else if (state_mario === 'left') {
            sy = 195;
        } else if (state_mario === 'right') {
            sy = 64;
        }
        context.drawImage(img_mario, cs_mario * sx, sy, sw, sh, (xc - rc), (yc - rc), 2 * rc, 2.5 * rc);

    }

    function  loadAssets() {

        //Imagens e Sprites      
        //Carregando o Mario
        img_mario.src = 'img/mario.png';
        img_mario.onload = function () {
            load++;
           
        };

        //Carregando a turtle
        img_turtle.src = "img/turtle.png";
        img_turtle.onload = function () {
            load++;
             console.log(img_turtle.src + " " + load);
        };

        //Carregando a matriz de inimigos 
        img_enemis.src = "img/enemis.png";
        img_enemis.onload = function () {
            load++;
            console.log(img_enemis.src + " " + load);
        };

        //Audio
        tema = new Audio("http://www.bensound.com/royalty-free-music?download=epic");
        tema.load();
        tema.volume = 0.5;
        tema.addEventListener('canplaythrough', function () {
            load++;
            console.log(tema.src + " " + load);
        }, false);

        sound_dead = new Audio("http://soundbible.com/grab.php?id=1454&type=mp3");
        sound_dead.load();
        sound_dead.volume = 1;
        sound_dead.addEventListener('canplaythrough', function () {
            load++;
            console.log(sound_dead.src + " " + load);
        }, false);

    }

}
        