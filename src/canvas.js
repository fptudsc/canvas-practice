window.addEventListener('DOMContentLoaded', function() {
    const canvases = document.querySelectorAll('.canvas');
    const tools = document.querySelectorAll('.drawing-tools i');
    const colorRange = document.querySelector('.color-range');
    const clear = document.querySelector('.clear');
    const pen = document.querySelector('.pen');

    canvases.forEach(canvas => {
        let range = {
            '#EEE': 100,
            'rgb(0, 255, 21, .1)': 50
            // 'red': 10,
            // 'blue': 10,
            // 'green': 10,
            // 'black': 10,
            // 'yellow': 10
        };
    
        canvas.width = screen.width;
        canvas.height = screen.height;
        const ctx = canvas.getContext('2d');
    
        ctx.strokeStyle = "#000";
    
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 20;
    
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
    
        function draw(e) {
            //drawing ?
            if (!isDrawing) return;
    
            ctx.beginPath();
    
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
    
            ctx.stroke();
    
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    
        function changeColor(e) {
            const color = this.dataset.color;
            if (!color) return;
            document.querySelector('.tool-active').classList.remove('tool-active');
            this.classList.add('tool-active');
            ctx.strokeStyle = color;
            colorRange.value =  ctx.lineWidth = range[color] || 20;
        }
    
        function updateRange(e) {
            const toolActive = document.querySelector('.tool-active');
            const color = toolActive.dataset.color;
            const padding = ctx.lineWidth = range[color] = parseInt(this.value);
            pen.style.borderWidth =  `${padding / 2}px`;
            pen.style.padding = `${padding/2}px`;
        }

        function clearCanvas(e) {
            const onCanvas = document.querySelector('.drawing-active .canvas') || canvas;
            context = onCanvas.getContext('2d');
            context.clearRect(0, 0, onCanvas.width, onCanvas.height);
        }

        function movePen(e) {
            const toolActive = document.querySelector('.tool-active');
            const padding = (range[toolActive.dataset.color] || 20) / 2;

            pen.style.top = `${e.clientY - padding}px`;
            pen.style.left = `${e.clientX - padding}px`;
            pen.style.borderColor =  `${toolActive.dataset.color}`;
            pen.style.borderWidth =  `${padding / 3}px`;
            pen.style.padding = `${padding * 2/3}px`;
        }
    
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
    
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    
        tools.forEach(t => t.addEventListener('click', changeColor));
    
        colorRange.addEventListener('mousemove', updateRange);
        colorRange.addEventListener('change', updateRange);

        clear.addEventListener('click', clearCanvas);

        window.addEventListener('mousemove', movePen);
    });
});