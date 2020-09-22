
const app = new PIXI.Application({
    width: 800,
    height: 400,
    backgroundColor: 0x000000,
    interactive: true
});
document.body.appendChild( app.view );


let figuresAmount = 0;
let figure = [];
let circle, ellipse, sides3, sides4, sides5, sides6;
let figures = [];
let number_of_shapes = document.getElementById('shapesN');
let shapes_per_sec = document.getElementById('shapesPerSec'),
    incr_number = document.getElementById('incr_number'),
    decr_number = document.getElementById('decr_number');
let gravity_value = document.getElementById('gravityV'),
    incr_gravity = document.getElementById('incr_gravity'),
    decr_gravity = document.getElementById('decr_gravity');
let shapes_area = document.getElementById('shapesS');
let space = [];
// shapes
shapes_per_sec.innerHTML = 1;
incr_number.addEventListener('click', () => {shapes_per_sec.innerHTML++});
decr_number.addEventListener('click', () => (shapes_per_sec.innerHTML == 1 ? null: shapes_per_sec.innerHTML--));

// gravity
gravity_value.innerHTML = 4;
incr_gravity.addEventListener('click', () => {gravity_value.innerHTML++});
decr_gravity.addEventListener('click', () => (gravity_value.innerHTML == 1 ? null: gravity_value.innerHTML--));



function drawPolygon(target,
                     x,
                     y,
                     sides,
                     radius,
                     angle = 0) {
    let step = (Math.PI * 2) / sides;
    let start = (angle / 180) * Math.PI;
    let n, dx, dy;
    let figure_perimeter = 0;
    let triangle = 0;
    let side_length = 0;
    let prev_h = 0;
    let h = 0;
    target.moveTo(
        x + (Math.cos(start) * radius),
        y - (Math.sin(start) * radius)
    );
    for (n = 1; n <= sides; ++n) {
        dx = x + Math.cos(start + (step * n)) * radius;
        dy = y - Math.sin(start + (step * n)) * radius;


        if(h <= (Math.sqrt(
            ((dx - (x + (Math.cos(start) * radius))) * (dx - (x + (Math.cos(start) * radius))))
            + ((dy - (y - (Math.sin(start) * radius))) * (dy - (y - (Math.sin(start) * radius))))
        )).toFixed()){
            prev_h = +h;
            h = +(Math.sqrt(
                ((dx - (x + (Math.cos(start) * radius))) * (dx - (x + (Math.cos(start) * radius))))
                + ((dy - (y - (Math.sin(start) * radius))) * (dy - (y - (Math.sin(start) * radius))))
            )).toFixed()
        }
        if(n === 1){
            side_length = (Math.sqrt(
                ((dx - (x + (Math.cos(start) * radius))) * (dx - (x + (Math.cos(start) * radius))))
                + ((dy - (y - (Math.sin(start) * radius))) * (dy - (y - (Math.sin(start) * radius))))
            )).toFixed();

            figure_perimeter = +side_length * +sides;
        }
        target.lineTo(dx, dy);
    }
    let figure_area = 0.5 * figure_perimeter * ((h + prev_h) /2);
    if(sides > 3){
        target.space = figure_area;
    }
    if(sides === 3){
        let kvadrat_polovinu = (+side_length * +side_length) / 2;
        let kvadrat_gipotenuzu = (+side_length * +side_length);
        triangle = (+side_length * Math.sqrt(kvadrat_gipotenuzu - kvadrat_polovinu) / 2 ).toFixed();
        target.space = +triangle;
    }

}
function drawRandomFigure() {

    let radius = 50;
    let inAreaX = app.renderer.screen.width - 50;
    let randomY = -50;
    let rand = Math.floor(Math.random() * inAreaX);
    let randomX = rand < 50 ? rand = 50 : rand ;

    //  CIRCLE
    circle = new PIXI.Graphics();
    circle.lineStyle(0);
    circle.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    circle.drawCircle(randomX, randomY, radius);
    circle.endFill();
    circle.interactive = true;
    circle.buttonMode = true;
    circle.space = Math.floor(Math.PI * (radius * radius));
    figures.unshift(circle);

    //  ELLIPSIS

    ellipse = new PIXI.Graphics();
    ellipse.lineStyle(0);
    ellipse.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    ellipse.drawEllipse(randomX, randomY, radius, 25);
    ellipse.endFill();
    ellipse.interactive = true;
    ellipse.buttonMode = true;
    ellipse.space = Math.floor(Math.PI * (radius * 25));
    figures.unshift(ellipse);

    // 3 SIDES

    sides3 = new PIXI.Graphics();
    sides3.lineStyle(0);
    sides3.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    drawPolygon(sides3, randomX, randomY, 3, 45);
    sides3.endFill();
    sides3.interactive = true;
    sides3.buttonMode = true;
    figures.unshift(sides3);


    // 4 SIDES

    sides4 = new PIXI.Graphics();
    sides4.lineStyle(0);
    sides4.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    drawPolygon(sides4, randomX, randomY, 4, radius);
    sides4.endFill();
    sides4.interactive = true;
    sides4.buttonMode = true;
    figures.unshift(sides4);

    // 5 SIDES

    sides5 = new PIXI.Graphics();
    sides5.lineStyle(0);
    sides5.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    drawPolygon(sides5, randomX, randomY, 5, radius);
    sides5.endFill();
    sides5.interactive = true;
    sides5.buttonMode = true;
    figures.unshift(sides5);

    // 6 SIDES

    sides6 = new PIXI.Graphics();
    sides6.lineStyle(0);
    sides6.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
    drawPolygon(sides6, randomX, randomY, 6, radius);
    sides6.endFill();
    sides6.interactive = true;
    sides6.buttonMode = true;
    figures.unshift(sides6);

    let randomFigure = figures[Math.floor(Math.random() * figures.length)];
    figure.unshift(randomFigure);
    figuresAmount++;
    app.stage.addChild(randomFigure);
    randomFigure.on('pointerdown', () => clearFigure(randomFigure));

    setTimeout(drawRandomFigure, (1000 / +shapes_per_sec.innerHTML));

    space.unshift(randomFigure.space);
}

function createItem(e) {
    if (e.target === null) {
        let random = new PIXI.Graphics();
        let x = e.data.global.x, y = e.data.global.y;
        random.lineStyle(0);
        random.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`, 1);
        random.moveTo(x, y);
        random.bezierCurveTo(x,y-3,x-5,y-15,x-25,y-15);
        random.bezierCurveTo(x-55,y-15,x-55,y+22.5,x-55,y+22.5);
        random.bezierCurveTo(x-55,y+40,x-35,y+62,x,y+80);
        random.bezierCurveTo(x+35,y+62,x+55,y+40,x+55,y+22.5);
        random.bezierCurveTo(x+55,y+22.5,x+55,y-15,x+25,y-15);
        random.bezierCurveTo(x+10,y-15,x,y-3,x,y);
        random.endFill();
        random.interactive = true;
        random.buttonMode = true;
        random.space = 1;

        figuresAmount++;
        figure.unshift(random);
        app.stage.addChild(random);
        random.on('pointerdown', () => clearFigure(random));
        space.unshift(random.space);
    }
}

function clearFigure(item) {
    app.stage.removeChild(item)
}

app.renderer.plugins.interaction.on('pointerdown', (e) => createItem(e));

app.ticker.add(() => { //постоянное обновление холста

    for (let i = 0; i < figuresAmount; i++) {
        figure[i].position.y += +gravity_value.innerHTML; //заставляем гравитацию работать
        if (figure[i].position.y > (app.renderer.screen.height + 100) ){
            clear(i)
        }
    }
    number_of_shapes.innerHTML = figuresAmount;
    let sum = 0;
    space.forEach((el, idx) => sum = sum + space[idx]);
    shapes_area.innerHTML = sum;
    console.log(space)
});

function clear(i) {
    app.stage.removeChild(figure[i]);
    figure.splice(i, 1);
    figuresAmount-= 1;
    space.splice(i, 1);
}

setTimeout(drawRandomFigure, (1000 / +shapes_per_sec.innerHTML));







