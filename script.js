/* クソ汚いコードだから見ないでくれるとうれしいなあ */
function setTimerPre(target, timerProperty) {
    target.querySelector(".stop_button").addEventListener("click", {
      reset: false,
      prop: timerProperty,
      target: target,
      handleEvent: timerToggle
    });
    target.querySelector(".reset_button").addEventListener("click", {
      reset: true,
      prop: timerProperty,
      target: target,
      handleEvent: timerToggle
    });
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
    var vs = Math.floor(ms / 100);
    if (vs < 10) vs = "0" + vs;
    var vm = ms % 100;
    if (vm < 10) vm = "0" + vm;
    return vs + ":" + vm;
  }
  const countUp = () => {
    if (!timer1Property.stopped) timer1Property.count++;
    timer1.querySelector(".timer_liter").innerText = stylize(timer1Property.count);
    pos = 99.5 - (79.5 / speedProperty) * (timerNum(modeSec, timer1Property.count));
    if (pos > 0) timer1.querySelector(".hide").style.left = pos + "%";
    if (timer1Property.count > (modeSec * 100 + 100)) timer1.querySelector(".reset_button").click();
    if (!timer2Property.stopped) timer2Property.count++;
    timer2.querySelector(".timer_liter").innerText = stylize(timer2Property.count);
    pos = 99.5 - (79.5 / speedProperty) * (timerNum(targetSec, timer2Property.count));
    if (pos > 0) timer2.querySelector(".hide").style.left = pos + "%";
    if (timer2Property.count > (targetSec * 100 + 100)) timer2.querySelector(".reset_button").click();
  };
  
  function timerNum(targettime, count) {
    if (targettime * 100 - count < speedProperty) return count - targettime * 100 + speedProperty;
    return 0;
  }
  
  function submitspeed() {
    var count = document.getElementById("speedProperty").value;
    if (!Number.isNaN(count) && count != 'Infinity') speedProperty = 100 * count;
  }
  
  function loadFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      try {
        var content = event.target.result;
        contentRefresh(content);
        changeSelect();
        localStorage.setItem("data", content);
      } catch (error) {
        window.alert('jsonデータの読み込みに失敗しました。', error);;
      }
    };
    reader.readAsText(file);
  }
  
  function changeSelect() {
    var selector = document.getElementById("selector");
    var nowdata = dataNames[document.getElementById("selector").value];
    document.querySelector("#timer2 .timer_date").innerHTML = nowdata.date;
    document.querySelector(".display textarea").value = nowdata.name;
    document.querySelector(".memo textarea").value = nowdata.memo;
    targetSec = nowdata.sec;
    localStorage.setItem("selectNum", selector.selectedIndex);
  }
  
  function contentRefresh(content) {
    jsonData = JSON.parse(content);
    dataNames = jsonData.data;
    names = Object.keys(dataNames);
    const optionHTML = names.map(option => `<option>${option}</option>`).join('');
    var selector = document.getElementById("selector");
    selector.innerHTML = optionHTML;
    selector.selectedIndex = 0;
  }
  
  function addModeToggle() {
    var tag1 = document.querySelector(".over");
    var tag2 = document.querySelector(".base");
    if (tag1.style.display == "block") {
      tag1.style.display = "none";
      tag2.style.display = "none";
    } else {
      tag1.style.display = "block";
      tag2.style.display = "flex";
    }
  }
  
  function addFloatNumericInput (numericTarget) {
    numericTarget.addEventListener("input", function (event) {
        if (!/^\d*\.?\d*$/.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^\d.]/g, "");
        }
    });
  }

  function addNumericInput(numericTarget) {
    numericTarget.addEventListener("input", function (event) {
      if (!/^\d*$/.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^\d]/g, "");
      }
    });
  }
  
  function configureAdd() {
    var configure = window.confirm("データを追加します");
    var base = document.querySelector(".base");
    if (configure) {
      var displayName = base.querySelector(".addDisplayName input").value;
      var addData = {
        "name": base.querySelector(".addName textarea").value,
        "date": base.querySelector(".addDate .year").value + "<br>" + base.querySelector(".addDate .month").value + "/" + base.querySelector(".addDate .date").value + "<br>" + base.querySelector(".addDate .hour").value + ":" + base.querySelector(".addDate .minute").value + "<br>" + base.querySelector(".addSec input").value + "s",
        "sec": Number(base.querySelector(".addSec input").value),
        "memo": base.querySelector(".addMemo textarea").value
      };
      base.querySelector(".addDisplayName input").value = "";
      base.querySelector(".addName textarea").value = "";
      base.querySelectorAll(".addDate input").forEach((element) => element.value = "");
      base.querySelector(".addSec input").value = "";
      base.querySelector(".addMemo textarea").value = "";
      jsonData.data[displayName] = addData;
      var content = JSON.stringify(jsonData);
      contentRefresh(content);
      localStorage.setItem("data", content);
      addModeToggle();
    }
  }
  
  function deleteData() {
    var configure = window.confirm("選択中のデータを削除します");
    if (configure) {
      var targetName = document.getElementById("selector").value;
      delete jsonData.data[targetName];
      var content = JSON.stringify(jsonData);
      contentRefresh(content);
      localStorage.setItem("data", content);
      var selector = document.getElementById("selector");
      selector.selectedIndex = 0;
      changeSelect();
    }
  }
  
  function downloadJsonData() {
    var jsonString = JSON.stringify(jsonData, null, "\t");
    var fileName = prompt("ファイル名を入力してください:", "data.json");
    if (fileName) {
      var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonString);
      var a = document.createElement('a');
      a.href = dataUri;
      a.download = fileName.endsWith('.json') ? fileName : fileName + '.json';
      document.body.appendChild(a);
      a.click();
    }
  }

  function modeToggle() {
    var mode = document.querySelector("#timer1 .timers button")
    if (mode.innerHTML == "今:<br>レアボ") {
      mode.innerHTML = "今:<br>道具";
      mode.style.backgroundColor = "#32cacd";
      modeSec = 4;
      document.querySelector("#timer1 .timers .timer_date").innerHTML = "2024<br>01/01<br>00:05<br>4s";
    } else {
      mode.innerHTML = "今:<br>レアボ";
      mode.style.backgroundColor = "#cd9732";
      modeSec = 5.9;
      document.querySelector("#timer1 .timers .timer_date").innerHTML = "2024<br>01/01<br>00:05<br>5.9s";
    }
  }

  window.onload = function () {
    var timer1 = document.getElementById("timer1");
    var timer2 = document.getElementById("timer2");
    timer1Property = {
      stopped: true,
      count: 0
    };
    timer2Property = {
      stopped: true,
      count: 0
    };
    setTimerPre(timer1, timer1Property);
    setTimerPre(timer2, timer2Property);
    speedProperty = 300;
    document.getElementById("speedProperty").value = 3;
    document.querySelector(".submit_sec").addEventListener("click", submitspeed);
    timer1.querySelector(".timers button").addEventListener("click", modeToggle);
    modeSec = 5.9;
    targetSec = 10;
    addFloatNumericInput(document.querySelector("#speedProperty"));
    document.getElementById("file_select").addEventListener('change', loadFile);
    document.getElementById("selector").addEventListener("change", changeSelect);
    timerBUILD = setInterval(countUp.bind(), 10);
    resizeContainer();
    try {
      var data = localStorage.getItem("data");
      var num = localStorage.getItem("selectNum");
      contentRefresh(data);
      document.getElementById("selector").selectedIndex = num;
      changeSelect();
    } catch {
      jsonData = {
        "data": {}
      }
    }
    document.querySelector(".addMode").addEventListener("click", addModeToggle);
    document.querySelector(".deleteMode").addEventListener("click", deleteData);
    document.querySelector(".exportMode").addEventListener("click", downloadJsonData);
    document.querySelector(".over").addEventListener("click", addModeToggle);
    document.querySelector(".closeButton button").addEventListener("click", addModeToggle);
    document.querySelector(".base .submitButton button").addEventListener("click", configureAdd);
    addFloatNumericInput(document.querySelector(".base .addSec input"));
    var inputs = document.querySelectorAll(".base .addDate input");
    inputs.forEach((element) => addNumericInput(element)); /*document.querySelector(".submit_tmp").addEventListener("click",function () {var countmp = document.getElementById("tmpTimeSet").value;if (!Number.isNaN(countmp) && countmp != 'Infinity') {targetSec = countmp;}});*/
  };
  
  function resizeContainer() {
    if (window.innerWidth / window.innerHeight < 1) {
      document.querySelector(".container").style.flexDirection = "column";
      val = "100vw";
      document.querySelector(".over").style.height = "200vh";
      document.querySelector(".base").style.width = "100vw";
      document.querySelector(".base").style.left = "0";
      document.querySelector(".base").style.top = "0";
    } else {
      document.querySelector(".container").style.flexDirection = "row";
      val = "50vw";
      document.querySelector(".over").style.height = "100vh";
      document.querySelector(".base").style.width = "50vw";
      document.querySelector(".base").style.left = "25vw";
      document.querySelector(".base").style.top = "5vh";
    }
    var sections = document.querySelectorAll("section");
    sections.forEach(function (section) {
      section.style.width = val;
    });
  }
  window.onresize = resizeContainer;
