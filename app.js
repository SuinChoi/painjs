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
function startPainting(){
   
    if(filling){
        console.log(colors);
        ctx.fillRect(0,0,700,700);
    }else{
        painting = true;
    }
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
   // console.log(event);
   const x = event.offsetX;             // get X value on the canvas
    const y = event.offsetY;            // get Y value on the canvas
    // console.log(x,y);

    if(!painting){                      // not click the mouse
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{                              // when click the mouse       
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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // when mouse move
    canvas.addEventListener("mousedown", startPainting); // when mouse click마우스 클릭했을때
    canvas.addEventListener("mouseup", stopPainting);      // when mouse is up
    canvas.addEventListener("mouseleave", stopPainting); // when you leave the canvas
    canvas.addEventListener("contextmenu", contextMenu);
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

function changeMode(event){
    console.log(mode);
    if(filling === true){
        filling = false;
        mode.innerHTML ="Fill";
    }else{
        filling = true;
        mode.innerHTML = "Paint";
    }
}