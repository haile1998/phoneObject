let Phone = function(battery, inbox, send, status, number) {
    this.number = number;
    this.getNumber = function(){
        return this.number;
    };
    this.setNumber = function(Number) {
        this.number = Number;
    }

    this.battery = battery;
    this.getBattery = function() {
        return this.battery;
    };
    this.setBattery = function(Battery) {
        this.battery = Battery;
    };

    this.isMessage = "";
    this.getIsMessage = function() {
        return this.isMessage;
    };
    this.setIsMessage = function(IsMessage) {
        this.isMessage = IsMessage;
    };

    this.inbox = inbox;
    this.getInbox = function() {
        return this.inbox;
    };
    this.setInbox = function(Inbox) {
        this.inbox.push(Inbox);
    };

    this.send = send;
    this.getSend = function() {
        return this.send;
    };
    this.setSend = function(Send) {
        this.send.push(Send);
    }

    this.status = status;
    this.getStatus = function() {
        return this.status;
    };
    this.setStatus = function(Status) {
        this.status = Status;
    };

    this.useBattery = function() {
        this.setBattery(Number(this.battery) - 1);
        if(this.getBattery() == 0) {
            return this.setBattery(0);
        }
    }

    this.checkOnOff = function() {
        if (this.getStatus()) {
            return "lawngreen";
        } else {
            return "red";
        }
    }

    this.turnOnOff = function() {
        if(this.getBattery() > 0) {
            if (this.getStatus()) {
                this.setStatus(false);
            } else {
                this.setStatus(true);
                this.useBattery();
            }
        } else {
            this.setStatus(false);
        }
    }

    this.charge = function() {
        return this.setBattery(Number(this.getBattery()) + 1);
    }

    this.message = function(string) {
        this.setIsMessage(string);
    };

    this.sendMess = function (phone) {
        this.setSend(this.getIsMessage());
        phone.setInbox(this.getIsMessage());
        this.setIsMessage("");
        this.useBattery();
    };

    this.openSend = function() {
        this.useBattery();
        return this.getSend();
    }

    this.openInbox = function() {
        this.useBattery();
        return this.getInbox();
    }
}

let homeBtn = document.getElementById("home");
let homeBtn2 = document.getElementById("home2");
let homeScreen = document.getElementsByClassName("homeScreen")[0];
let homeScreen2 = document.getElementsByClassName("homeScreen")[1];
let messText = document.getElementsByClassName("messText")[0];
let messText2 = document.getElementsByClassName("messText")[1];
let messageSend = document.getElementsByClassName("messageSend")[0];
let messageSend2 = document.getElementsByClassName("messageSend")[1];
let messageInbox = document.getElementsByClassName("messageInbox")[0];
let messageInbox2 = document.getElementsByClassName("messageInbox")[1];

homeScreen.style.display = "block";
homeScreen2.style.display = "block";

homeBtn.onclick = function() {
    homeScreen.style.display = "block";
    messText.style.display = "none";
    messageSend.style.display = "none";
    messageInbox.style.display = "none";
};
homeBtn2.onclick = function() {
    homeScreen2.style.display = "block";
    messText2.style.display = "none";
    messageSend2.style.display = "none";
    messageInbox2.style.display = "none";
};

let nokia = new Phone(100, new Array(), new Array(), true, 456789);
let iphone = new Phone(100, new Array(), new Array(), true, 123456);

let turnBtn =  document.getElementById("power");
turnBtn.style.backgroundColor = "lawngreen";
let turnBtn2 =  document.getElementById("power2");
turnBtn2.style.backgroundColor = "lawngreen";

let screen = document.getElementById("screen");
let screen2 = document.getElementById("screen2");

let battery = document.getElementsByClassName("battery")[0];
let battery2 = document.getElementsByClassName("battery")[1];
let batName = "b-left";
let batName2 = "b-left2";

function checkBattery(battery, batteryname, phone) {
    battery.innerHTML = `<div class="battery-wrap"><div id=${batteryname}></div></div>`
    document.getElementById(`${batteryname}`).style.width = phone.getBattery() + "px";
}

function powerPress(screen, phone, btn, battery, batteryName) {
    if(phone.getBattery() !== 0) {
        if(phone.getStatus()) {
            phone.turnOnOff();
            btn.style.backgroundColor = phone.checkOnOff();
            checkBattery(battery, batteryName, phone);
            screen.style.visibility = "hidden";
        } else {
            phone.turnOnOff();
            btn.style.backgroundColor = phone.checkOnOff();
            screen.style.visibility = "visible";
        }
    } else {
        phone.turnOnOff();
        btn.style.backgroundColor = phone.checkOnOff();
        checkBattery(battery, batteryName, phone);
        screen.style.visibility = "hidden";
    }
}

turnBtn.addEventListener('click', () => {
    powerPress(screen, nokia, turnBtn, battery, batName);
});
turnBtn2.addEventListener('click', () => {
   powerPress(screen2,iphone, turnBtn2, battery2, batName2);
});


let charge = document.getElementById("charge");
let charge2 = document.getElementById("charge2");

function charged(phone, battery, batteryname) {
    let id = setInterval(charging, 100);
    function charging() {
        if(phone.getBattery() < 100) {
            phone.charge();
            checkBattery(battery, batteryname, phone);
        } else {
            clearInterval(id);
        }
    }
}

charge.onclick = function( ) {
    charged(nokia, battery, batName);
};
charge2.onclick = function( ) {
    charged(iphone, battery2, batName2);
};

let phoneNumber = document.getElementById("phoneNum");
let phoneNumber2 = document.getElementById("phoneNum2");
let textMess= document.getElementById("textMess");
let textMess2= document.getElementById("textMess2");
let sendBtn = document.getElementById("sendMessage");
let sendBtn2 = document.getElementById("sendMessage2");

function showMess() {
    homeScreen.style.display = "none";
    messText.style.display = "block";
}
function showMess2() {
    homeScreen2.style.display = "none";
    messText2.style.display = "block";
}

function sending(fromPhone, toPhone, phoneNumber, text) {
    fromPhone.message(text);
    if(toPhone.getNumber() == phoneNumber) {
        fromPhone.sendMess(toPhone);
    } else {
        return false;
    }
    return true;
}

sendBtn.addEventListener('click', function() {
    if(sending(nokia, iphone, phoneNumber.value, textMess.value)) {
        phoneNumber.value = "";
        textMess.value = "";
    } else {
        textMess.value = "Sai số";
        textMess.select();
    }
    checkBattery(battery,batName,nokia);
});
sendBtn2.addEventListener('click', function() {
    if(sending(iphone, nokia, phoneNumber2.value, textMess2.value)) {
        phoneNumber2.value = "";
        textMess2.value = "";
    } else {
        textMess2.value = "Sai số";
        textMess2.select();
    }
    checkBattery(battery2, batName2, iphone);
});

let messageSendBtn = document.getElementById("send");
let messageSendBtn2 = document.getElementById("send2");
let messageInboxBtn = document.getElementById("inbox");
let messageInboxBtn2 = document.getElementById("inbox2");

messageSendBtn.onclick = function() {
    homeScreen.style.display = "none";
    messText.style.display = "none";
    messageSend.style.display = "block";
    messageInbox.style.display = "none";
    showSend(nokia, messageSend);
    checkBattery(battery, batName, nokia);
};
messageSendBtn2.onclick = function() {
    homeScreen2.style.display = "none";
    messText2.style.display = "none";
    messageSend2.style.display = "block";
    messageInbox2.style.display = "none";
    showSend(iphone, messageSend2);
    checkBattery(battery2, batName2, iphone);
};
messageInboxBtn.onclick = function() {
    homeScreen.style.display = "none";
    messText.style.display = "none";
    messageSend.style.display = "none";
    messageInbox.style.display = "block";
    showInbox(nokia, messageInbox);
    checkBattery(battery, batName, nokia);
};
messageInboxBtn2.onclick = function() {
    homeScreen2.style.display = "none";
    messText2.style.display = "none";
    messageSend2.style.display = "none";
    messageInbox2.style.display = "block";
    showInbox(iphone, messageInbox2);
    checkBattery(battery2, batName2, iphone);
};

function showSend(phone, send) {
    let result = "<h1>Hộp thư gửi</h1>";
    for(let item in phone.openSend()) {
        result += `<p>${phone.openSend()[item]}</p><hr>`;
    }
    send.innerHTML = result;
}

function showInbox(phone, send) {
    let result = "<h1>Hộp thư đến</h1>";
    for(let item in phone.openInbox()) {
        result += `<p>${phone.openInbox()[item]}</p><hr>`;
    }
    send.innerHTML = result;
}