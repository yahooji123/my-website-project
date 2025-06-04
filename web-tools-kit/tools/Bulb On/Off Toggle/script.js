// HTML में मौजूद <img> टैग को पकड़ रहे हैं जिसकी id "bulb" है
let img = document.getElementById("bulb");

// HTML में मौजूद <button> टैग को पकड़ रहे हैं जिसकी id "btn" है
let btn = document.getElementById("btn");

// जब button पर click होगा, तब ये function चलेगा
btn.addEventListener("click", function () {

    // Check कर रहे हैं कि bulb की image फिलहाल 'off' वाली है या नहीं
    // यानी image के src में 'bulboff' शब्द है या नहीं
    if (img.src.includes("bulboff")) {
        // अगर 'bulboff' है, तो इसका मतलब बल्ब बंद है – अब बल्ब को 'on' करना है
        img.src = "https://www.w3schools.com/js/pic_bulbon.gif"; // bulb on image दिखाएं
        btn.innerText = "Turn Off"; // बटन का text बदलकर "Turn Off" कर दो
    } else {
        // अगर 'bulboff' नहीं है, तो बल्ब पहले से 'on' है – अब बंद करना है
        img.src = "https://www.w3schools.com/js/pic_bulboff.gif"; // bulb off image दिखाएं
        btn.innerText = "Turn On"; // बटन का text बदलकर "Turn On" कर दो
    }
});
