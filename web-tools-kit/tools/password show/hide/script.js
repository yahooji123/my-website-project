// HTML से password input field को पकड़ रहे हैं जिसकी id "pass" है
let pass = document.getElementById("pass");

// HTML से button को पकड़ रहे हैं जिसकी id "btn" है
let btn = document.getElementById("btn");

// जब बटन पर क्लिक किया जाएगा, तो नीचे वाला function execute होगा
btn.addEventListener("click", function () {

    // चेक कर रहे हैं कि फिलहाल input field का type क्या है
    // अगर "password" है, यानी text छिपा हुआ है:
    if (pass.type === "password") {
        
        // तो उसे "text" में बदल दो यानी password को दिखा दो
        pass.type = "text";

        // साथ ही बटन का टेक्स्ट बदलकर "Hide" कर दो
        // ताकि यूज़र को समझ आए कि अगली बार क्लिक करने पर पासवर्ड छिप जाएगा
        btn.innerText = "Hide";
    } 
    
    // अगर type पहले से "text" है यानी password दिख रहा है:
    else {

        // तो type को वापस "password" बना दो यानी छिपा दो
        pass.type = "password";

        // बटन का टेक्स्ट वापस "Show" कर दो
        btn.innerText = "Show";
    }
});
