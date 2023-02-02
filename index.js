//showing clock

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
        }


//add the cards solar data

        var addCard = `
    
<div class="cards">
    <div id="card1" class="card" style="width: 15rem;">
    <ul id="z" class="list-group list-group-flush">
        <li id="country" class="list-group-item"></li>
        <li id="location" class="list-group-item"></li>
        <li id="exactDate" class="list-group-item"></li>
        </ul>
        </div>
<br>
        <form action="/action_page.php" id="perID">
    <select name="per" id="perId">
        <option value="perYear">per year</option>
        <option value="perDay">per day</option>
    </select>
    </form>

        
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

</div>`;
        document.getElementById("btn1").insertAdjacentHTML("afterend",
            addCard);

        document.getElementById("country").textContent = ` کشور:  ${countryName}`
        document.getElementById("location").textContent = `مکان دقیق: ${cityName}`
        document.getElementById("exactDate").textContent = `تاریخ: ${time}`
        document.getElementById("PVOUT").textContent = `خروجی برق فوتو ولتاییک:kWh/kWp ${PVOUT.toFixed(1)} `;
        document.getElementById("DNI").textContent = `تابش مستقیم: kWh/m2a   ${DNI.toFixed(1)} `;
        document.getElementById("GHI").textContent = ` تابش افقی: kWh/m2 ${GHI.toFixed(1)}  `
        document.getElementById("DIF").textContent = ` تابش افقی پراکنده: kWh/m2ar ${DIF.toFixed(1)}  `
        document.getElementById("GTI").textContent = ` تابش کج در زاویه بهینه: kWh/m2 ${GTI.toFixed(1)}  `
        document.getElementById("OPTA").textContent = `شیب بهینه ماژول ها :°  ${OPTA.toFixed(1)}`;
        document.getElementById("TEMP").textContent = ` دما:°C ${TEMP.toFixed(1)}  `
        document.getElementById("ELE").textContent = ` ارتفاع ناحیه: m ${ELE.toFixed(1)} `

        document.getElementById("btn1").disabled = false;
        document.getElementById("btn1").innerHTML = `محاسبه `;





        document.getElementById("perId").addEventListener("change", () => {

            if (document.getElementById("perId").value == "perYear") {

                document.getElementById("country").textContent = ` کشور:  ${countryName}`
                document.getElementById("location").textContent = `مکان دقیق: ${cityName}`
                document.getElementById("exactDate").textContent = `تاریخ: ${time}`
                document.getElementById("PVOUT").textContent = `خروجی برق فوتو ولتاییک:kWh/kWp ${PVOUT.toFixed(1)} `;
                document.getElementById("DNI").textContent = `تابش مستقیم: kWh/m2a   ${DNI.toFixed(1)} `;
                document.getElementById("GHI").textContent = ` تابش افقی: kWh/m2 ${GHI.toFixed(1)}  `
                document.getElementById("DIF").textContent = ` تابش افقی پراکنده: kWh/m2ar ${DIF.toFixed(1)}  `
                document.getElementById("GTI").textContent = ` تابش کج در زاویه بهینه: kWh/m2 ${GTI.toFixed(1)}  `
                document.getElementById("OPTA").textContent = `شیب بهینه ماژول ها :°  ${OPTA.toFixed(1)}`;
                document.getElementById("TEMP").textContent = ` دما:°C ${TEMP.toFixed(1)}  `
                document.getElementById("ELE").textContent = ` ارتفاع ناحیه: m ${ELE.toFixed(1)} `

            } else {

                document.getElementById("country").textContent = ` کشور:  ${countryName}`
                document.getElementById("location").textContent = `مکان دقیق: ${cityName}`
                document.getElementById("exactDate").textContent = `تاریخ: ${time}`
                document.getElementById("PVOUT").textContent = `خروجی برق فوتو ولتاییک:kWh/kWp ${(PVOUT / 360).toFixed(1)} `;
                document.getElementById("DNI").textContent = `تابش مستقیم: kWh/m2a   ${(DNI / 360).toFixed(1)} `;
                document.getElementById("GHI").textContent = ` تابش افقی: kWh/m2 ${(GHI / 360).toFixed(1)}  `
                document.getElementById("DIF").textContent = ` تابش افقی پراکنده: kWh/m2ar ${(DIF / 360).toFixed(1)}  `
                document.getElementById("GTI").textContent = ` تابش کج در زاویه بهینه: kWh/m2 ${(GTI / 360).toFixed(1)}  `
                document.getElementById("OPTA").textContent = `شیب بهینه ماژول ها :°  ${OPTA.toFixed(1)}`;
                document.getElementById("TEMP").textContent = ` دما:°C ${TEMP.toFixed(1)}  `
                document.getElementById("ELE").textContent = ` ارتفاع ناحیه: m ${ELE.toFixed(1)} `

            }


        })


//add panel cards

        var pvCards = `
    <div id="cardDisplay">

            <div id="cardBG" class="card" style="width: 18rem;">
                <img src="./pv1_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">مسکونی کوچک</h5>

                    <button id="btnCard1" class="btn btn-primary">انتخاب</button>
                    
                </div>
            </div>



            <div id="cardBG" class="card" style="width: 18rem;">
                <img src="./pv2_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">تجاری سایز متوسط</h5>


                    <button id="btnCard2" class="btn btn-primary">انتخاب</button>
                    



                </div>
            </div>


            <div id="cardBG" class="card" style="width: 18rem;">
                <img src="./pv3_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">روی زمین در مقیاس بزرگ</h5>

                    <button id="btnCard3" class="btn btn-primary">انتخاب</button>
                    
                </div>
            </div>



            <div id="cardBG" class="card" style="width: 18rem;">
                <img src="./pv4_1.png" class="card-img-top" alt="pv1">
                <div class="card-body">
                    <h5 class="card-title" style="padding-bottom: 30px;">شناور در مقیاس بزرگ</h5>
                    <div id="btnCard4Container">
                    <button id="btnCard4" class="btn btn-primary">انتخاب</button>
                </div>
                </div>
            </div>

        </div>`;

        document.querySelector(".cards").insertAdjacentHTML("afterend",
            pvCards);






        //showing pv cards information 


        if (document.querySelector("#cardDisplay")) {

            document.querySelector("#btnCard4Container").addEventListener("click", () => {
                document.querySelector("#btnCard4Container").innerHTML = `
                <h5>
                تعداد پنل مورد نیاز:${(PVOUT/360).toFixed(1)-0.5}
                Pv system: Small residential
                Installed capacity: 1 kWp
                <span>Azimuth of PV panels: Default (180º)</span>
                Tilt of PV panels: Default (32º)
                </h5>
                <button id="btnCard4" class="btn btn-primary">بازگشت</button>
                `
            })
        }
    }




    //if something went wrong
    catch {

        if (document.querySelector(".cards")) {
            document.querySelector(".cards").parentNode.removeChild(document.querySelector(".cards"));
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
    var ali=await fetch("https://www.google.com/maps/preview/reveal?authuser=0&hl=en&gl=us&pb=!2m9!1m3!1d4527.616017996064!2d48.70027795515763!3d31.31591447638451!2m0!3m2!1i812!2i722!4f13.1!3m2!2d48.7009146401179!3d31.316069884601735!4m2!1sgO_aY_mDI6GS9u8PpOGJiAc!7e81!5m5!2m4!1i96!2i64!3i1!4i8");
    var amir=await ali.json();
    console.log(ali);
}
a();

*/




