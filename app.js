const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("control__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = '2c2c2c';
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,700,700);
ctx.strokeStyle=INITIAL_COLOR;          // default color is balck
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;                // default size

let painting = false;
let filling = false;

if(save){
    save.addEventListener("click", saveImage);
}

function saveImage(){
    console.log(save);
    const img = canvas.toDataURL('image/png');
    const link = document.createElement("a");   // make anchor , a태그 만들기
    link.href=img;                              
    link.download = "PaintJS[EXPORT]";          // set the image name, 파일이름 설정
    link.click();                               //fake click to download canvas, 가짜 클릭하기 다운로드
    
}



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // when mouse move
    canvas.addEventListener("mousedown", startPainting); // when mouse click마우스 클릭했을때
    canvas.addEventListener("mouseup", stopPainting);      // when mouse is up
    canvas.addEventListener("mouseleave", stopPainting); // when you leave the canvas
    canvas.addEventListener("contextmenu", contextMenu);
}
function startPainting(){
   
    if(filling){                                              // Fill mode, 채우기 모드일때
        //console.log(colors);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else{
        painting = true;                                        // painting mode, 그리기 모드일때
    }
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
   // console.log(event);
    // console.log(x,y);

   const x = event.offsetX;             // get X value on the canvas, 캔버스 위 x값 가져오기
    const y = event.offsetY;            // get Y value on the canvas, 캔버스 위 y값 가져오기
   
    if(!painting){                      // not click the mouse, 마우스 클릭안할때는 시작점만 설정
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{                              // when click the mouse, 클릭하면 그리기 시작       
        ctx.lineTo(x,y);
        ctx.stroke();       
    }
}

if(range){
    range.addEventListener("input", setSize);
}

function setSize(event){
   // console.log(range.value);
    ctx.lineWidth = event.target.value;
}

function contextMenu(event){
    event.preventDefault();                            //prevent mouse right click
}


Array.from(colors).forEach(color => color.addEventListener("click", changeColor))

function changeColor(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor

     ctx.strokeStyle = color;
    ctx.fillStyle=color;
    
}

if(mode){
    mode.addEventListener("click", changeMode);
}

function changeMode(event){             // set the mode either paint of fill, 그리기 채우기 모드 설정
    console.log(mode);
    if(filling === true){
        filling = false;
        mode.innerHTML ="Fill";
    }else{
        filling = true;
        mode.innerHTML = "Paint";
    }
}