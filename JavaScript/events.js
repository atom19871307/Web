// JavaScript source code
function setImage()
{
	let filename = document.getElementById("image-file");
	//let reader = new FileReader();
	//reader.onload = function (e)
	//{
	//	document.getElementById("image").src = e.target.result;
	//}
	//reader.readAsDataURL(filename.files[0]);

	let file = filename.files[0];
	//document.getElementById("debug").innerHTML = filename.files[0].name;
	document.getElementById("debug").innerHTML = URL.createObjectURL(file);
	document.getElementById("image").src = URL.createObjectURL(file);
}
//DOM - Document Object Model (Объектная модель документа).
//Document document = new Document();
function setBackgroundColor()
{
	document.body.style.backgroundColor = document.getElementById("background-color").value;
}
function setForegroundColor(e)
{
	//document.getElementsByClassName("load-image")[0].style.backgroundColor =
	document.body.style.color = e.target.value;
}
function setColor(e)
{
	console.log(e.target);
	console.log(document.body.style['backgroundColor']);
	console.log(document.body.style['background-color']);

	document.body.style[e.target.id === 'background-color' ? 'backgroundColor' : 'color'] = e.target.value;

	//(e.target.id === "background-color" ? document.body.style.backgroundColor : document.body.style.color) = e.target.value;
	/*if (e.target.id === "background-color")
		document.body.style.backgroundColor = e.target.value;
	else
		document.body.style.color = e.target.value;*/
}
console.log(true === 1);

document.addEventListener("mousemove", trackMouse);
function trackMouse(e)
{
	document.getElementById("mouse-coords").innerHTML = `Mouse: X = ${e.clientX}, Y = ${e.clientY}`;
}

document.getElementById("switch-background").addEventListener("click", switchBackground);
function switchBackground(e)
{
	//console.log(e.target.id);
	//console.log(e.target.src);
	//e.target.src = (e.target.src.includes('moon.png') ? 'sun.png' : 'moon.png');
	document.body.className = document.body.className === 'dark' ? 'light' : 'dark';
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function addLeadingZero(number)
{
	return number < 10 ? `0${number}` : `${number}`;
}

tick_timer();
function tick_timer()
{
	let time = new Date();
	document.getElementById("full-time").innerHTML = time.toString();

	document.getElementById("hours").innerHTML =	addLeadingZero (time.getHours()		);
	document.getElementById("minutes").innerHTML =	addLeadingZero (time.getMinutes()	);
	document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

	document.getElementById("years").innerHTML =	addLeadingZero (time.getFullYear()	);
	document.getElementById("months").innerHTML =	addLeadingZero (time.getMonth() + 1	);
	document.getElementById("days").innerHTML =		addLeadingZero (time.getDate()		);

	document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

	document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? "visible" : "hidden"
	document.getElementById("day-of-week").style.visibility = document.getElementById("show-weekday").checked ? "visible" : "hidden"

	setTimeout(tick_timer, 100);
}