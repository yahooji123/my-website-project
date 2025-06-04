// "increase" button को पकड़ रहे हैं
let increase = document.getElementById("in");

// "decrease" button को पकड़ रहे हैं
let decrease = document.getElementById("de");

// "reset" button को पकड़ रहे हैं
let reset = document.getElementById("re");

// जहाँ counter की value दिखाई जा रही है उस div को पकड़ रहे हैं
let show = document.getElementById("count");

// एक variable count बनाया गया है जिसकी शुरुआत 0 से हो रही है
let count = 0;

// जब "increase" बटन पर क्लिक करेंगे:
increase.addEventListener("click", function () {
    count++; // count की value 1 से बढ़ा दो
    show.innerText = count; // updated value को HTML में दिखाओ
});

// जब "decrease" बटन पर क्लिक करेंगे:
decrease.addEventListener("click", function () {
    count--; // count की value 1 से घटा दो
    show.innerText = count; // updated value को HTML में दिखाओ
});

// जब "reset" बटन पर क्लिक करेंगे:
reset.addEventListener("click", function () {
    count = 0; // count को 0 कर दो
    show.innerText = count; // HTML में 0 दिखाओ
});
