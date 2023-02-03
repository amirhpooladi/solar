//showing clock

function clock() {
    setTimeout(() => {
        /*
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        day = date.getDay();
        hours = date.getHours();
        min = date.getMinutes();
        sec = date.getSeconds();
        document.querySelector("#date").innerHTML = `${year}/${month + 1}/${day + 1} ----  ${hours}:${min}:${sec} `;
        console.log();
        */
        clock();
    }, 1000);
    
    document.getElementById("ray").innerHTML=` <footer id="ray" style="color: rgb(252, 1, 1); text-align: center; margin-top:${screen.height}${"px"}" >idea byd Ray</footer>`
}
clock();


//getting lat & lon to show data

async function getData(lat, lon) {
    try {

        //api for timezone and region
        var timeZone = await fetch(`https://vip.timezonedb.com/v2/get-time-zone?key=OX7AD7FQO41D&by=position&format=json&lat=${lat}&lng=${lon}`);
        var jsonData = await timeZone.json();
        var countryName = 0;
        countryName = jsonData.countryName;
        var cityName = jsonData.cityName;
        var time = jsonData.formatted;



        //api for electric data

        var elctricData = await fetch(`https://api.globalsolaratlas.info/data/lta?loc=${lat},${lon}`);



        var jsonDataElectric = await elctricData.json();
        var PVOUT = 0;
        PVOUT = jsonDataElectric.annual.data.PVOUT_csi;
        var DNI = jsonDataElectric.annual.data.DNI;
        var GHI = jsonDataElectric.annual.data.GHI;
        var DIF = jsonDataElectric.annual.data.DIF;
        var GTI = jsonDataElectric.annual.data.GTI_opta;
        var OPTA = jsonDataElectric.annual.data.OPTA;
        var TEMP = jsonDataElectric.annual.data.TEMP;
        var ELE = jsonDataElectric.annual.data.ELE;
        console.log(PVOUT, countryName);

        if (document.querySelector(".cards")) {
            document.querySelector(".cards").parentNode.removeChild(document.querySelector(".cards"));
            document.querySelector("#cardDisplay").parentNode.removeChild(document.querySelector("#cardDisplay"));

        }


        //add the cards solar data

        var addCard = `
    
<div  class="cards">

    <div id="card1" class="card" style="width: 15rem;">
    <ul id="z" class="list-group list-group-flush">
        <li id="country" class="list-group-item"></li>
        <li id="location" class="list-group-item"></li>
        <li id="exactDate" class="list-group-item"></li>
        </ul>
        </div>


        <form action="/action_page.php" id="perID">
    <select name="per" id="perId">
        <option value="perYear">per year</option>
        <option value="perDay">per day</option>
    </select>
    </form>

        <div>
        <div id="card2" class="card" style="width:18rem">
        <ul class="list-group list-group-flush">
        <li id="PVOUT" class="list-group-item"></li>
        <li id="DNI" class="list-group-item"></li>
        <li id="GHI" class="list-group-item"></li>
        <li id="DIF" class="list-group-item"></li>
        <li id="GTI" class="list-group-item"></li>
        <li id="OPTA" class="list-group-item"></li>
        <li id="TEMP" class="list-group-item"></li>
        <li id="ELE" class="list-group-item"></li>
    </ul>
    </div>
    </div>


`;
        document.getElementById("btn1").insertAdjacentHTML("afterend",
            addCard);

        document.getElementById("country").innerHTML = ` کشور<pre> ${countryName}</pre>`
        document.getElementById("location").innerHTML = `مکان دقیق<pre> ${cityName}</pre>`
        document.getElementById("exactDate").innerHTML = `تاریخ<pre> ${time}</pre>`

        document.getElementById("PVOUT").innerHTML = `خروجی برق فوتو ولتاییک<pre>${PVOUT.toFixed(1)} kWh/kWp</pre>`;
        document.getElementById("DNI").innerHTML = `تابش مستقیم<pre>${DNI.toFixed(1)} kWh/m2</pre>`;
        document.getElementById("GHI").innerHTML = ` تابش افقی<pre>${GHI.toFixed(1)} kWh/m2</pre>`;
        document.getElementById("DIF").innerHTML = ` تابش افقی پراکنده<pre>${DIF.toFixed(1)} kWh/m2</pre>`
        document.getElementById("GTI").innerHTML = ` تابش کج در زاویه بهینه<pre>${GTI.toFixed(1)} kWh/m2</pre>`
        document.getElementById("OPTA").innerHTML = `شیب بهینه ماژول ها <pre>${OPTA.toFixed(1)} °</pre>`;
        document.getElementById("TEMP").innerHTML = ` دما<pre>${TEMP.toFixed(1)} °C</pre>`
        document.getElementById("ELE").innerHTML = ` ارتفاع ناحیه<pre>${PVOUT.toFixed(1)} m</pre>`

        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").innerHTML = `محاسبه `;





        document.getElementById("perId").addEventListener("change", () => {

            if (document.getElementById("perId").value == "perYear") {

                document.getElementById("country").innerHTML = ` کشور<pre> ${countryName}</pre>`
                document.getElementById("location").innerHTML = `مکان دقیق<pre> ${cityName}</pre>`
                document.getElementById("exactDate").innerHTML = `تاریخ<pre> ${time}</pre>`

                document.getElementById("PVOUT").innerHTML = `خروجی برق فوتو ولتاییک<pre>${PVOUT.toFixed(1)} kWh/kWp</pre>`;
                document.getElementById("DNI").innerHTML = `تابش مستقیم<pre>${DNI.toFixed(1)} kWh/m2</pre>`;
                document.getElementById("GHI").innerHTML = ` تابش افقی<pre>${GHI.toFixed(1)} kWh/m2</pre>`;
                document.getElementById("DIF").innerHTML = ` تابش افقی پراکنده<pre>${DIF.toFixed(1)} kWh/m2</pre>`
                document.getElementById("GTI").innerHTML = ` تابش کج در زاویه بهینه<pre>${GTI.toFixed(1)} kWh/m2</pre>`
                document.getElementById("OPTA").innerHTML = `شیب بهینه ماژول ها<pre>${OPTA.toFixed(1)} °</pre>`;
                document.getElementById("TEMP").innerHTML = ` دما<pre>${TEMP.toFixed(1)} °C</pre>`
                document.getElementById("ELE").innerHTML = ` ارتفاع ناحیه<pre>${PVOUT.toFixed(1)} m</pre>`

            } else {

                document.getElementById("country").innerHTML = ` کشور<pre> ${countryName}</pre>`
                document.getElementById("location").innerHTML = `مکان دقیق<pre> ${cityName}</pre>`
                document.getElementById("exactDate").innerHTML = `تاریخ<pre> ${time}</pre>`

                document.getElementById("PVOUT").innerHTML = `خروجی برق فوتو ولتاییک<pre>${(PVOUT / 360).toFixed(1)} kWh/kWp</pre>`;
                document.getElementById("DNI").innerHTML = `تابش مستقیم<pre>${(DNI / 360).toFixed(1)} kWh/m2</pre>`;
                document.getElementById("GHI").innerHTML = ` تابش افقی<pre>${(GHI / 360).toFixed(1)} kWh/m2</pre>`;
                document.getElementById("DIF").innerHTML = ` تابش افقی پراکنده<pre>${(DIF / 360).toFixed(1)} kWh/m2</pre>`
                document.getElementById("GTI").innerHTML = ` تابش کج در زاویه بهینه<pre>${(GTI / 360).toFixed(1)} kWh/m2</pre>`
                document.getElementById("OPTA").innerHTML = `شیب بهینه ماژول ها <pre>${OPTA.toFixed(1)} °</pre>`;
                document.getElementById("TEMP").innerHTML = ` دما<pre>${TEMP.toFixed(1)} °C</pre>`
                document.getElementById("ELE").innerHTML = ` ارتفاع ناحیه<pre>${PVOUT.toFixed(1)} m</pre>`

            }


        })


        //add panel cards
        var panel1 = 1;
        var panel2 = 100;
        var panel3 = 1000;
        var panel4 = 1000;

        var pvCards = `
    <div id="cardDisplay">

            <div id="cardBG1" class="card" style="width: 18rem;">
                <img src="./assets/pv1_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">مسکونی کوچک</h5>
                    
                    <pre>نوع پنل: Small residential</pre>
                    <pre>ظرفیت:(${panel1}kwp)</pre>
                    <pre>آزیموث : Default(0º)</pre>
                    <pre>درجه بهینه پنل های: Default(${OPTA}°)</pre>
                    
                
                </div>
            </div>



            <div id="cardBG2" class="card" style="width: 18rem;">
                <img src="./assets/pv2_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">تجاری سایز متوسط</h5>
                    
                    <pre>نوع پنل: Medium size comercial</pre>
                    <pre>ظرفیت:(${panel2}kwp)</pre>
                    <pre>آزیموث : Default(0º)</pre>
                    <pre>درجه بهینه پنل های: Default(${OPTA}°)</pre>
                    
                



                </div>
            </div>


            <div id="cardBG3" class="card" style="width: 18rem;">
                <img src="./assets/pv3_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">روی زمین در مقیاس بزرگ</h5>

                    
                    <pre>نوع پنل: Ground-mounted large scale</pre>
                    <pre>ظرفیت:(${panel3}kwp)</pre>
                    <pre>آزیموث : Default(0º)</pre>
                    <pre>درجه بهینه پنل های: Default(${OPTA}°)</pre>
                    

                   
                </div>
            </div>



            <div id="cardBG4" class="card" style="width: 18rem;">
                <img src="./assets/pv4_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">شناور در مقیاس بزرگ</h5>
                    
                    
                    <pre>نوع پنل: Floating large scale</pre>
                    <pre>ظرفیت:(${panel4}kwp)</pre>
                    <pre>آزیموث : Default(10º)</pre>
                    <pre>درجه بهینه پنل های: Default(${OPTA}°)</pre>
                    

                    
                    

                  
                </div>
            </div>

        </div>`;

        document.querySelector(".cards").insertAdjacentHTML("afterend",
            pvCards);






        //showing pv cards information 

/*
        if (document.querySelector("#cardDisplay")) {

            document.querySelector("#btnCard4Container").addEventListener("click", () => {
            document.querySelector("#cardDisplay").parentNode.removeChild(document.querySelector("#cardDisplay"));

                document.querySelector("#cardDisplay").innerHTML = `
                <h5>
                تعداد پنل مورد نیاز:${(PVOUT / 360).toFixed(1) - 0.5}
                Pv system: Small residential
                Installed capacity: 1 kWp
                <span>Azimuth of PV panels: Default (180º)</span>
                Tilt of PV panels: Default (32º)
                </h5>
                <button id="btnCard4" class="btn btn-primary">بازگشت</button>
                `
            })
        }
*/
    }




    //if something went wrong
    catch {

        if (document.querySelector(".cards")) {
            document.querySelector(".cards").parentNode.removeChild(document.querySelector(".cards"));
            document.querySelector("#cardDisplay").parentNode.removeChild(document.querySelector("#cardDisplay"));
        }
        document.getElementById("error").textContent = "خطایی رخ داده دوباره امتحان کنید";
        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").innerHTML = `محاسبه `;

    }


}



//start program by click on button

function click() {
   


    document.querySelector("#btn1").addEventListener("click", () => {

        document.getElementById("btn1").innerHTML = ` <div class="spinner-border text-light"></div>`;
        document.getElementById("btn1").disabled = true;


        var lat = document.getElementById("lat").value;
        var lon = document.getElementById("lon").value;
        getData(lat, lon);


        document.getElementById("lat").value = "";
        document.getElementById("lon").value = "";
        document.getElementById("error").textContent = "";

    })

}

click();




/*



async function a() {
    var ali=await fetch("https://api.globalsolaratlas.info/data/pvcalc?loc=-24.559662,131.193299");
                         https://api.globalsolaratlas.info/data/lta?loc=-24.559662,131.193299
    var amir=await ali.json();
    console.log(amir);
}
a();

*/




