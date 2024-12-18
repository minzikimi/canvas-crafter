const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width")
const colorOptions = Array.from(document.querySelectorAll(".color-option"));
const color = document.querySelector("#color")
const modeBtn = document.querySelector("#mode-btn");
const resetBtn = document.querySelector("#reset-btn");
const eraseBtn = document.querySelector("#erase-btn");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveBtn=document.querySelector("#save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap="round"
ctx.lineWidth=lineWidth.value;

const colors = [
  "#F0A6CA",
  "#34D399",
  "#FFC0CB",
  "#3B82F6",
  "#FF6347",
  "#9B51E0",
  "#FFD700",
  "#6EE7B7",
  "#8B4513",
  "#D3D3D3"
]

let isPainting = false;
let isfilling = false;

saveBtn.addEventListener("click", onSaveClick);
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown",onMouseDown );
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change",onColorChange);
colorOptions.forEach(color=>{
  color.addEventListener("click", onColorClick);
})
eraseBtn.addEventListener("click", onEraseClick)
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
canvas.addEventListener("click", onCanvasClick);
fileInput.addEventListener("change", onFileChange);


function onSaveClick(){
  const url=canvas.toDataURL();
  const a = document.createElement("a");
  a.href=url;
  a.download="myDrawing.png"
  a.click();
}

function onDoubleClick(event){
  if(text){
    ctx.save();
    const text=textInput.value;
    ctx.lineWidth=1;
    ctx.font = "48px serif";
    ctx.strokeText(text,event.offsetX, event.offsetY);
    ctx.restore();
  }
  return;
}

function onFileChange(event){
  console.dir(event.target); 

  const file = event.target.files[0];
  const url=URL.createObjectURL(file);
  console.log(url);
  const image = new Image;
  image.src=url;
  image.onload=function (){
    ctx.drawImage(image,0, 0,CANVAS_WIDTH,CANVAS_HEIGHT);
    fileInput.value=0;
  }
}

function onEraseClick(){
  ctx.strokeStyle="white"
  isfilling=false;
  modeBtn.textContent="Fill"
}

function onResetClick(){
  ctx.fillStyle="white";
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onCanvasClick(){
  if(isfilling){
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  }
}

function onModeClick(){
  if(isfilling){
    isfilling=false;
    modeBtn.textContent="Fill";
  }else{
    isfilling=true;
    modeBtn.textContent="Draw";
  }
}

function onMove(event){

  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();//when u make line u need to stroke
    return;
  }

  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(){
  isPainting=true;
}

function cancelPainting(){
  isPainting=false;
}

function onLineWidthChange(event) {
  console.log(event.target.value);

  ctx.lineWidth = event.target.value;
}


function onColorChange(event){
  console.log(event.target.value);

  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}


function onColorClick(event){
  console.dir(event.target.dataset.color);

  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;

  color.value=colorValue;
}

// function onClick(event){
//   console.log(event);

//   ctx.beginPath();

//   ctx.moveTo(0,0);
//   const color= colors[Math.floor(Math.random()*colors.length)]

//   ctx.strokeStyle= color;

//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();//when u make line u need to stroke
// }

// canvas.addEventListener("click", onClick);




