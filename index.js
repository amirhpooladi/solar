

function clock() {
    setTimeout(() => {
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDay();
        hours = date.getHours();
        min = date.getMinutes();
        sec = date.getSeconds();
        document.querySelector("#date").innerHTML = `${year}/${month + 1}/${day + 1} ----  ${hours}:${min}:${sec} `;
        console.log();
        clock();
    }, 1000);
}
clock();


async function getData(lat, lon) {


    var result = await fetch(`https://developer.nrel.gov/api/pvwatts/v6.json?api_key=TCWMiZU5xjSoULqFkixsLi6yEG2GEaIWbipf0sq3&lat=${lat}&lon=${lon}&system_capacity=4&azimuth=180&tilt=0&array_type=0&module_type=0&losses=0&dataset=intl`)
    var jsonData = await result.json();
    var peakSunHours = jsonData.outputs.solrad_annual;
    console.log(peakSunHours);
    var peakSunHours = Math.round(peakSunHours);





    if (peakSunHours != 0 && peakSunHours != 1 && peakSunHours != 2 && peakSunHours != 3 && peakSunHours != 4 && peakSunHours != 5 && peakSunHours != 6 && peakSunHours != 7 && peakSunHours != 8 && peakSunHours != 9 && peakSunHours != 10 && peakSunHours != 11 && peakSunHours != 12) {
        if (document.querySelector(".card")) {
            document.querySelector(".card").parentNode.removeChild(document.querySelector(".card"));
        }
        document.getElementById("error").textContent = ":( خطا : مختصات این ناحیه قابل پوشش نیست";
    }
    else {

        electric = 250 * peakSunHours * 75 / 100 / 1000;
        panel = electric * 1000 / 270;
        console.log(panel);
        panel = Math.round(panel) + 1;
        // console.log(peakSunHours)
        console.log(electric + " KW/H");

        if (document.querySelector(".card")) {
            document.querySelector(".card").parentNode.removeChild(document.querySelector(".card"));
        }

        var addCard = `<div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
        <li id="LL" class="list-group-item"></li>
            <li id="peak_li" class="list-group-item"></li>
            <li id="elec_li" class="list-group-item"></li>
            <li id="panel_li" class="list-group-item"></li>
        </ul>
    </div>`;
        document.getElementById("btn1").insertAdjacentHTML("afterend",
            addCard)




        document.getElementById("peak_li").textContent = ` تابش خورشید در روز = ${peakSunHours} `
        document.getElementById("elec_li").textContent = `KW/H  برق تولید شده= ${electric}`
        document.getElementById("panel_li").textContent = `تعداد پنل مورد نیاز= ${panel}`
        document.getElementById("LL").textContent = `lat=${lat}___lon=${lon}`



    }

}
//getData(35.7219, 51.3347);




function click() {



    document.querySelector("#btn1").addEventListener("click", () => {
        /*
        var spinner=`<br><br> <img id="loading" src="spinner.gif" alt="loading" ></img>`;
        document.getElementById("btn1").insertAdjacentHTML("afterend",
            spinner)
            */

        var lat = document.getElementById("lat").value;
        var lon = document.getElementById("lon").value;
        getData(lat, lon);
/*
        if (document.querySelector(".card")) {
            document.querySelector("#loading").parentNode.removeChild(document.querySelector("#loading"));
        }
*/

        document.getElementById("lat").value = "";
        document.getElementById("lon").value = "";
        document.getElementById("error").textContent = "";

    })

}
click();










