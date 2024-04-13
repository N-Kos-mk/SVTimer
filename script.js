
function setTimerPre(target, timerProperty) {
    target.querySelector(".stop_button").addEventListener("click", {reset:false, prop: timerProperty, target:target, handleEvent: timerToggle});
    target.querySelector(".reset_button").addEventListener("click", {reset:true, prop: timerProperty, target:target, handleEvent: timerToggle});
}

function timerToggle(event) {
    if (this.reset) {
        this.target.querySelector(".stop_button").innerText = "start";
        this.prop.stopped = true;
        this.prop.count = 0;
    } else if (this.prop.stopped) {
        this.target.querySelector(".stop_button").innerText = "stop";
        this.prop.stopped = false;
    } else {
        this.target.querySelector(".stop_button").innerText = "start";
        this.prop.stopped = true;
    }
}

function stylize(ms) {
    var vs = Math.floor(ms/100);
    if (vs < 10) vs = "0" + vs;
    var vm = ms%100
    if (vm < 10) vm = "0" + vm;
    return vs+":"+vm;
}

const countUp = () => {
    if (!timer1Property.stopped) timer1Property.count++;
    timer1.querySelector(".timer_liter").innerText = stylize(timer1Property.count)
    pos = 99.5 - (79.5/speedProperty) * (timerNum(5, timer1Property.count));
    if (pos > 0) timer1.querySelector(".hide").style.left = pos + "%";
    if (timer1Property.count > (500 + 100)) timer1.querySelector(".reset_button").click();

    if (!timer2Property.stopped) timer2Property.count++;
    timer2.querySelector(".timer_liter").innerText = stylize(timer2Property.count)
    pos = 99.5 - (79.5/speedProperty) * (timerNum(targetSec, timer2Property.count));
    if (pos > 0) timer2.querySelector(".hide").style.left = pos + "%";
    if (timer2Property.count > (targetSec*100 + 100)) timer2.querySelector(".reset_button").click();
}

function timerNum (targettime, count) {
    if (targettime*100 - count < speedProperty) return count - targettime*100 + speedProperty;
    return 0;
}

function submitspeed() {
    var count = document.getElementById("speedProperty").value
    if (!Number.isNaN(count) && count != 'Infinity') speedProperty = 100 * count;
}


function loadfile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var content = event.target.result;
        try {
            var jsonData = JSON.parse(base642json(content));
            document.getElementById("debug").value = JSON.stringify(jsonData, null, 2); //TODO
        } catch (error) {
            window.alert('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
}


function base642json(base64Data) {
    try {
        return decodeURIComponent(atob(base64Data));
    } catch (error) {
        window.alert('Error decoding base64:', error);
    }
}


window.onload = function() {
    var timer1 = document.getElementById("timer1")
    var timer2 = document.getElementById("timer2")
    timer1Property = { stopped: true, count: 0 };
    timer2Property = { stopped: true, count: 0 };
    setTimerPre(timer1, timer1Property);
    setTimerPre(timer2, timer2Property);
    
    // speed check
    speedProperty = 300;
    document.getElementById("speedProperty").value = 3;
    document.querySelector(".submit_sec").addEventListener("click", submitspeed);
    targetSec = 10; //TODO

    // file
    document.getElementById("file_select").addEventListener('change', loadfile)

    timerBUILD = setInterval(countUp.bind(), 10)
    resizeContainer();
    console.log(timer1.querySelector(".timer_date").innerHTML);


    //tmp ZONE
    document.querySelector(".submit_tmp").addEventListener("click", 
    function () {
        var countmp = document.getElementById("tmpTimeSet").value
        if (!Number.isNaN(countmp) && countmp != 'Infinity') {
            targetSec = countmp;
        }
    });


}

function resizeContainer() {
    if (window.innerWidth / window.innerHeight < 1) {
        document.querySelector(".container").style.flexDirection = "column";
        val = "100vw"
    } else {
        document.querySelector(".container").style.flexDirection = "row";
        val = "50vw"
    }
    var sections = document.querySelectorAll("section");
    sections.forEach( function(section) {
        section.style.width = val;
    });
}

window.onresize = resizeContainer
