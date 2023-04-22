
const spans = document.querySelectorAll('span');

for (let i = 0; i < spans.length; i++) {
  if (spans[i].innerText == '0') {
    spans[i].innerHTML = "&nbsp;";
  }
}