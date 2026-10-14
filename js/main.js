// Hưng Hiệp Huy Logistics — main.js (mobile menu + footer year + quote form)
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('main-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Quote form: build a mailto with the entered details (no backend needed).
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var lines = ['YÊU CẦU BÁO GIÁ — Website Hưng Hiệp Huy Logistics', ''];
      fd.forEach(function (v, k) { lines.push(k + ': ' + v); });
      var subject = 'Yêu cầu báo giá — ' + (fd.get('Họ tên') || '');
      window.location.href = 'mailto:hiepnguyen.hunghiephuy@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }
});
