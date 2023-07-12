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

//
const colorsmodeValue = document.getElementById("colors").value;
const getColorBtn = document.getElementById("get-color-btn");
const seedColorValue = document.getElementById("seed-color").value;
const seedColor = seedColorValue.slice(1);
const colorColumn = document.querySelector(".color-col");


const getColorScheme = async function () {
    console.log(seedColor, colorsmodeValue);
  const response = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorsmodeValue}&count=5`
  );
  const colorScheme = await response.json();
  const colorArray = [colorScheme.colors.map((color) => color.hex.value)];
  //
  return colorArray;
};

const getHTML = async function () {
  const colorArray = await getColorScheme()

  console.log(colorArray);
    let html = []
   html += colorArray.forEach(
    (color) => ` 
    <div class="color-col">
      <div class="rectangle" style ="background:${color}" ></div>
      <p class="hex">${color.join('')}</p>
    </div>`
  );
  return html;
};

const render = async function () {
//   return (colorColumn.innerHTML = await getHTML())
console.log(await getHTML())
};
getColorBtn.addEventListener("click", function (e) {
  e.preventDefault();
  render()
});
