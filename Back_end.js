const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

let drawing = false;
let lastX = 0;
let lastY = 0;

// Start drawing
function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = getXY(e);
}

// Draw on canvas
function draw(e) {
  if (!drawing) return;

  const [x, y] = getXY(e);

  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
}

// Stop drawing
function stopDrawing() {
  drawing = false;
}

// Get mouse or touch position relative to canvas
function getXY(e) {
  let rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.touches) { // Touch event
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else { // Mouse event
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }

  return [x, y];
}

// Clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save canvas as image
function saveCanvas() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'my_drawing.png';
  link.click();
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  draw(e);
});
canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  stopDrawing();
});

clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveCanvas);
