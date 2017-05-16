var klawisze = document.getElementsByClassName("klawisz");
var samples = {};
var wyswietlacz = document.querySelector(".wyswietlacz");
var numPad = {
    96: 0, 103: 1, 104: 2, 105: 3, 100: 4, 101: 5, 102: 6, 97: 7, 98: 8, 99: 9,
    110: 10, 107: 11,
    48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9
};

wyswietlacz.focus();
wyswietlacz.readOnly = true;

var postep = 1;
for (var i = 0; i < 13; i++) {
    samples["p" + i] = new Howl({ src: ['domofon/sound/' + i + '.ogg'], preload: true });
    samples["p" + i].once('load', function () {
        wyswietlacz.value = "" + Math.floor(postep / 12 * 100) + "%";
        postep += 1;
        if (postep == 13) {
            wyswietlacz.value = "";
            eventy();
        }
    });
}

function zKlawiatury(e) {
    console.log(e.which);
    var wcisnieto = e.which;

    if (wcisnieto == 8) {
        wyswietlacz.value = wyswietlacz.value.substring(0, wyswietlacz.value.length - 1); 
    }else {       
        odswiez(numPad[wcisnieto]);
    }
}

function eventy() {
    for (var i = 0; i < klawisze.length; i++) {
        klawisze[i].addEventListener("click", zMyszki);
    }
    document.addEventListener("keydown", zKlawiatury, false);
}

function zMyszki() {
    console.log(this.innerHTML.charCodeAt());
    if (this.innerHTML.charCodeAt() == 9919) {
        odswiez(11);
    } else {
        odswiez((this.innerHTML != "C") ? this.innerHTML : 10);
    }
}

function odswiez(wartosc) {
    samples["p" + wartosc].play();
    wyswietlacz.value += (wartosc != 10) ? (wartosc != 11) ? wartosc : "K" : "C";
    wyswietlacz.scrollLeft = wyswietlacz.scrollWidth;
}