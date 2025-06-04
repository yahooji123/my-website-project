// हम एक maximum character limit define कर रहे हैं – user इससे ज़्यादा character नहीं लिख सकता
const maxlimit = 100;

// HTML से textarea element को पकड़ रहे हैं – जहाँ user text टाइप करेगा
const textarea = document.getElementById("text");

// HTML से उस span या element को पकड़ रहे हैं – जहाँ हम character count दिखाएँगे
const charcount = document.getElementById("charcount");

// अब हम textarea पर 'input' event लगा रहे हैं,
// इसका मतलब: जब भी user कुछ भी टाइप करेगा, remove करेगा या paste करेगा,
// यह function अपने आप trigger होगा
textarea.addEventListener("input", function () {

    // user ने अभी तक कितना text लिखा है, उसकी length निकाल रहे हैं
    // .value से पूरा टाइप किया गया text मिलेगा
    // .length से उसकी कुल लंबाई मिलेगी
    let currentlength = textarea.value.length;

    // जो भी current length है, उसे हम HTML में live दिखा रहे हैं
    // जैसे ही user कुछ टाइप करेगा, count auto-update होगा
    charcount.innerText = currentlength;

    // अब हम check कर रहे हैं कि user ने जितना लिखा है, क्या वो limit के बराबर या उससे ज़्यादा है?
    if (currentlength >= maxlimit) {

        // अगर हाँ, तो हम ek CSS class जोड़ते हैं – जिससे शायद red color दिखे या कोई और warning look
        charcount.classList.add("limit-reached");

    } else {

        // अगर user limit से कम पर है, तो हम वो CSS class हटा देते हैं
        // यानी look वापिस normal हो जाता है
        charcount.classList.remove("limit-reached");
    }
});
