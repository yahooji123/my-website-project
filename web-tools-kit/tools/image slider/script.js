// सबसे पहले हम एक array बना रहे हैं जिसमें हमारी images के file names हैं।
const img = [
    "1.webp",   // पहली इमेज का नाम (folder में होना चाहिए)
    "2.webp",   // दूसरी इमेज का नाम
];

// HTML से वो element पकड़ना जो इमेज दिखाएगा (img tag)
const slideimg = document.getElementById("slideimg");

// "Previous" button को पकड़ना ताकि उस पर क्लिक करने पर पीछे जा सकें
const pre = document.getElementById("pre");

// "Next" button को पकड़ना ताकि उस पर क्लिक करने पर आगे जा सकें
const next = document.getElementById("next");

// यह एक variable है जो बताएगा कि अभी कौन सी image दिख रही है (index 0 से शुरू होती है)
let currentindex = 0;

// यह एक function है जो दी गई index की image को screen पर दिखाएगा
function showimage(index) {
    slideimg.src = img[index];  // img[index] का मतलब है img array से वो image लेना
}

// जब कोई "Next" बटन पर क्लिक करेगा
next.addEventListener("click", function () {
    currentindex++;  // index को 1 बढ़ा दो ताकि अगली इमेज दिखे

    // अगर index img.length से बड़ा हो गया, तो फिर से शुरू करो (0 index से)
    if (currentindex >= img.length) {
        currentindex = 0;
    }

    // अब image को दिखाओ
    showimage(currentindex);
});

// जब कोई "Previous" बटन पर क्लिक करेगा
pre.addEventListener("click", function () {
    currentindex--;  // index को 1 घटा दो ताकि पिछली इमेज दिखे

    // अगर index 0 से छोटा हो गया (मतलब -1 हो गया), तो लास्ट इमेज दिखाओ
    if (currentindex < 0) {
        currentindex = img.length - 1;  // लास्ट इमेज का index
    }

    // अब image को दिखाओ
    showimage(currentindex);
});

// जब पेज लोड हो तब पहली इमेज दिखे (index = 0)
showimage(currentindex);

setInterval(() => {
    currentindex = (currentindex + 1) % img.length;
    showimage(currentindex);
}, 3000); // हर 3 सेकंड में image change
