/* ------------------------------------------------------------ */
/* --------------- Dynamic Point Mesh Animation --------------- */
/* ------------------------------------------------------------ */

let resizeReset = function () {
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = document.getElementById("resume").offsetHeight;
    // h = canvasBody.height = parseInt(height);
};

opts = {
    particleColor: "rgb(200,200,200)",
    lineColor: "rgb(200,200,200)",
    particleAmount: 30,
    defaultSpeed: 0.6,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
    linkRadius: 200
};

window.addEventListener("resize", function () {
    deBouncer();
});

let deBouncer = function () {
    clearTimeout(tid);
    tid = setTimeout(function () {
        resizeReset();
    }, delay);
};

let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function (point1, hubs) {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / opts.linkRadius;
        if (opacity > 0) {
            drawArea.lineWidth = 0.5;
            drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
            drawArea.beginPath();
            drawArea.moveTo(point1.x, point1.y);
            drawArea.lineTo(hubs[i].x, hubs[i].y);
            drawArea.closePath();
            drawArea.stroke();
        }
    }
};

Particle = function (xPos, yPos) {
    this.x = xPos != null ? xPos : Math.random() * w;
    this.y = yPos != null ? yPos :Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
    };
    this.update = function () {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    };
    this.border = function () {
        if (this.x >= w || this.x <= 0) {
            this.vector.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
            this.vector.y *= -1;
        }
        if (this.x > w) this.x = w;
        if (this.y > h) this.y = h;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
    };
    this.draw = function () {
        drawArea.beginPath();
        drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        drawArea.closePath();
        drawArea.fillStyle = this.color;
        drawArea.fill();
    };
};

particles = [];

function setup() {
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
        particles.push(new Particle());
    }
    window.requestAnimationFrame(loop);
}

function loop() {
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}

const canvasBody = document.getElementById("canvas"),
style = window.getComputedStyle(canvasBody),
height = style.getPropertyValue("height");

drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();

/* ------------------------------------------------------------ */

function AddParticleOnClick(mouseEvent)
{
    var xpos;
    var ypos;
    if (mouseEvent)
    {
        //FireFox
        xpos = mouseEvent.screenX;
        ypos = mouseEvent.screenY;
    }
    else
    {
        //IE
        xpos = window.event.screenX;
        ypos = window.event.screenY;
    }
    
    opts.particleAmount++;
    particles.push(new Particle(xpos,ypos));
}

// document.getElementById("canvas").addEventListener("click", AddParticleOnClick);


/* ------------------------------------------------------------ */
/* ------------------------- Projects ------------------------- */
/* ------------------------------------------------------------ */

function multiplyNode(node, count, deep)
{
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createProjectWeb(node, element, insertAfterNode = null)
{
    var newPj = node.cloneNode(true);
    var id = element.id;
    
    newPj.querySelector("#pjw-name-0").setAttribute("id", "pjw-name-" + id);
    newPj.querySelector("#pjw-web-0").setAttribute("id", "pjw-web-" + id);
    newPj.querySelector("#pjw-git-0").setAttribute("id", "pjw-git-" + id);
    newPj.querySelector("#pjw-img-0").setAttribute("id", "pjw-img-" + id);
    
    insertAfter(newPj, insertAfterNode == null ? node : insertAfterNode);
    
    document.getElementById("pjw-name-" + id).innerHTML = element.name;
    document.getElementById("pjw-web-" + id).href = element.web;
    document.getElementById("pjw-git-" + id).href = element.git;
    document.getElementById("pjw-img-" + id).src = element.img;
    
    return newPj;
}

function createProjectGame(node, element, insertAfterNode = null)
{
    var newPj = node.cloneNode(true);
    var id = element.id;
    
    newPj.querySelector("#pjg-name-0").setAttribute("id", "pjg-name-" + id);
    newPj.querySelector("#pjg-web-0").setAttribute("id", "pjg-web-" + id);
    newPj.querySelector("#pjg-img-0").setAttribute("id", "pjg-img-" + id);
    newPj.querySelector("#pjg-link-container-0").setAttribute("id", "pjg-link-container-" + id);
    
    insertAfter(newPj, insertAfterNode == null ? node : insertAfterNode);
    
    document.getElementById("pjg-name-" + id).innerHTML = element.name;
    document.getElementById("pjg-web-" + id).href = element.web;
    document.getElementById("pjg-img-" + id).src = element.img;
    
    
    
    if (element.yt != "")
    {
        document.getElementById("pjg-link-container-" + id).innerHTML =
        '<a href="' + element.yt + '" id="pjg-yt-' + id + '"><img class="project-link-img" src="img/icon/icon-youtube.png" alt=""></a>';
    }
    
    if (element.git != "")
    {
        document.getElementById("pjg-link-container-" + id).innerHTML +=
        '<a href="' + element.git + '" id="pjg-git-' + id + '"><img class="project-link-img" src="img/icon/icon-github.png" alt=""></a>';
    }
    
    return newPj;
}

/* ----------------------------------------------------------- */

const apiData = {
    url: 'http://localhost:3000/',
    table: 'getUsers/',
    id: ''
}

const {url, table, id} = apiData
const apiUrl = `${url}${table}${id}`


function GetData()
{
    fetch(apiUrl)
    .then(data => data.json())
    .then(data =>{
        var lastNode = null;
        data.ProjectsWeb.forEach(element => { lastNode = createProjectWeb(document.querySelector('.project-web'), element, lastNode);});  
        document.querySelector('.project-web').remove(); // remove the base since it became useless
        
        lastNode = null;
        data.ProjectsGame.forEach(element => { lastNode = createProjectGame(document.querySelector('.project-game'), element, lastNode);});  
        document.querySelector('.project-game').remove(); // remove the base since it became useless
    })
    
}

GetData();
