// color example:
// /id{?hex,rgb,hsl,cmyk,format}
// example URI
// GET https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html
// generate schemes
// /scheme{?hex,rgb,hsl,cmyk,format,mode,count}

// /scheme?hex=24B1E0&mode=triad&count=6 || /scheme?rgb=rgb(0,71,171) || ...
// example URI for getting schemes
// https://www.thecolorapi.com/scheme?&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6
// response : {mode: 'monochrome',
// count: '5',
// colors: Array(5),
// seed: {…},
// image: {…}, …}
// colors: (5) [{…}, {…}, {…}, {…}, {…}]count: "5"image: {bare: 'https://www.thecolorapi.com/scheme?format=svg&named=false&hex=000000&mode=monochrome&count=5', named: 'https://www.thecolorapi.com/scheme?format=svg&hex=000000&mode=monochrome&count=5'}mode: "monochrome"seed: {hex: {…}, rgb: {…}, hsl: {…}, hsv: {…}, name: {…}, …}_embedded: {}_links: {self: '/scheme?hex=000000&mode=monochrome&count=5', schemes: {…}}[[Prototype]]: Object

//try to create a branch with no async await function
const colorsmodeEl = document.getElementById("colors");
const getColorBtn = document.getElementById("get-color-btn");
const seedColorEL = document.getElementById("seed-color");
let colorScheme = [];

const colorColumn = document.querySelector(".color-container");

async function copy(color) {
  alert(`Copied the text: ${color}`);
}

const getHTML = function () {
  let html = "";

  html += colorScheme
    .map(
      (color) =>
        ` 
  <div class="color-col">
    <div class="rectangle"  onclick=copy('${color}') style ="background-color:${color}" ></div>
    <p class="hex" onclick=copy('${color}')>${color}</p>
  </div>`
    )
    .join("");
  return html;
};

getColorBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const seedColor = seedColorEL.value.slice(1);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorsmodeEl.value}&count=5`
  )
    .then((resp) => resp.json())
    .then((data) => {
    
      colorScheme = []
      colorScheme = data.colors.map((color) => color.hex.value);
      colorColumn.innerHTML = getHTML();
    });
 
});
