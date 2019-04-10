export default function() {

  const { body } = document;
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  h1.innerText = "hello clock"; 
  div.appendChild(h1);
  body.appendChild(div);

var date = new Date();

var s = date.getSeconds();
var m = date.getMinutes();
var h = date.getHours();

function *uniqSec() {
  while (true) {
    (s <= 59) ? (yield s, s++) : (s = 0, yield s, s++)
  }
}

function *uniqMin() {
  while(true) {
    (m < 59) ? ( (s < 59) ? yield m : (m++, yield m) ) : (m = 0, yield m)
  }
}

function *uniqHour() {
  while(true) {
    (h < 24) ? ( (m < 59) ? yield h : (h++, yield h) ) : (h = 0, yield h)
  }
}

var sec = uniqSec();
var min = uniqMin();
var hour = uniqHour();

var showTime = function(){
    var outputFormat = "hh:mm:ss";
    setFormatFromInput();
    function setFormatFromInput() {
      h1.innerHTML = formatDate(outputFormat);
    }
};

function formatDate(format){
  let h = hour.next().value;
  let m = min.next().value;
  let s = sec.next().value;

  function ii(i, len) { let s = i + ""; len = len || 2; while (s.length < len) s = "0" + s; return s; }

  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  
  return format;
  };

onload = setInterval(function() {
  showTime();
}, 1000);

}