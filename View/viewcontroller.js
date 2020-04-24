/*Buttons*/
const clothingbtn = document.getElementById("clothing-btn");
const tierlantinbtn = document.getElementById("tierlantin-btn");
const decorationbtn = document.getElementById("decoration-btn");

/*Regions*/
const clothingregion = document.getElementById("clothing-region");
const tierlantinregion = document.getElementById("tierlantin-region");
const decorationregion = document.getElementById("decoration-region");
const createitemregion = document.getElementById("create-item-region");
const crudregion = document.getElementById("crud-region");

/*Dropdowns*/
const clothingdd = document.getElementById('clothing-dropdown');
const tierlantindd = document.getElementById('tierlantin-dropdown');
const decorationdd = document.getElementById('decoration-dropdown');

export default class ViewController {
    constructor() {
        this.InitCanvas();
        document.getElementById("clothing-region").classList.add('hide');
        document.getElementById("decoration-region").classList.add('hide');
        document.getElementById("tierlantin-region").classList.add('hide');
        document.getElementById("crud-region").classList.add('hide');
        document.getElementById("create-item-region").classList.remove('hide');
        clothingdd.parentElement.classList.add('hide');
        tierlantindd.parentElement.classList.add('hide');
        decorationdd.parentElement.classList.add('hide');

        clothingbtn.addEventListener('click', function () {
            clothingregion.classList.remove('hide');
            clothingdd.parentElement.classList.remove('hide');
            crudregion.classList.remove('hide');
            clothingdd.classList.remove('hide');
            tierlantindd.parentElement.classList.add('hide');
            decorationdd.parentElement.classList.add('hide');
            document.getElementById("create-item-region").classList.add('hide');
            document.getElementById("decoration-region").classList.add('hide');
            document.getElementById("tierlantin-region").classList.add('hide');
            hideScreen();
        });

        tierlantinbtn.addEventListener('click', function () {
            clothingregion.classList.add('hide');
            clothingdd.parentElement.classList.add('hide');
            crudregion.classList.remove('hide');
            clothingdd.parentElement.classList.add('hide');
            tierlantindd.parentElement.classList.remove('hide');
            decorationdd.parentElement.classList.add('hide');
            document.getElementById("create-item-region").classList.add('hide');
            document.getElementById("decoration-region").classList.add('hide');
            document.getElementById("tierlantin-region").classList.remove('hide');
            hideScreen();

        });

        decorationbtn.addEventListener('click', function () {
            clothingregion.classList.add('hide');
            clothingdd.parentElement.classList.add('hide');
            crudregion.classList.remove('hide');
            clothingdd.parentElement.classList.add('hide');
            tierlantindd.parentElement.classList.add('hide');
            decorationdd.parentElement.classList.remove('hide');
            document.getElementById("create-item-region").classList.add('hide');
            document.getElementById("decoration-region").classList.remove('hide');
            document.getElementById("tierlantin-region").classList.add('hide');
            hideScreen();
        });

        let dropdownbtns = Array.from(document.getElementsByClassName("dropbtn"));
        dropdownbtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.parentElement.id == "clothing-parent") {
                    document.getElementById("clothing-dropdown").classList.toggle('show');
                } else if (btn.parentElement.id == "tierlantin-parent") {
                    document.getElementById("tierlantin-dropdown").classList.toggle('show');
                } else if (btn.parentElement.id == "decoration-parent") {
                    document.getElementById("decoration-dropdown").classList.toggle('show');
                }
                hideScreen();

            })
        });

        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }

    InitCanvas() {
        let canvas = document.createElement('canvas');
        canvas.id = 'damage-canvas';
        let savebtn = document.createElement('button');
        savebtn.id = 'save-canvasbtn';
        savebtn.innerHTML = 'Save damage';
        document.getElementsByClassName('screen')[0].appendChild(canvas).classList.add('blackborder');
        document.getElementsByClassName('screen')[0].appendChild(savebtn).classList.add('btn', 'btn-primary');
        let ctx = canvas.getContext('2d');
        let pos = {x: 0, y: 0};

        document.addEventListener('mousemove', draw);
        document.addEventListener('mousedown', setPosition);
        document.addEventListener('mouseenter', setPosition);

        function setPosition(e) {
            pos = getMousePos(canvas, e);
        }

        function getMousePos(canvas, evt) {
            let rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        function draw(e) {
            if (e.buttons !== 1) return;

            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#c0392b';

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke();
        }
    }
}

function hideScreen() {
    let screen = document.getElementsByClassName("screen");
    screen[0].style.display = "none";
    let canvas = document.getElementsByTagName('canvas')[0];

    let context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}