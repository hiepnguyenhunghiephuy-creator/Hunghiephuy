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

  // Quote form: copy the quote request to clipboard and open Zalo chat (no backend needed).
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var msg = [
        'YÊU CẦU BÁO GIÁ - Website Hưng Hiệp Huy',
        'Họ tên: ' + (fd.get('Họ tên') || ''),
        'SĐT: ' + (fd.get('Số điện thoại') || ''),
        'Dịch vụ: ' + (fd.get('Dịch vụ') || ''),
        'Tuyến: ' + (fd.get('Tuyến / Điểm giao hàng') || ''),
        'Thông tin: ' + (fd.get('Thông tin lô hàng') || '')
      ].join('\n');
      function openZalo() {
        window.open('https://zalo.me/0901995665', '_blank', 'noopener');
      }
      function showNote() {
        var note = document.getElementById('quote-success');
        if (!note) {
          note = document.createElement('p');
          note.id = 'quote-success';
          note.className = 'note success';
          form.appendChild(note);
        }
        note.textContent = 'Đã copy nội dung báo giá — bạn chỉ cần dán (Ctrl+V) vào khung chat Zalo và bấm gửi.';
      }
      function done() { showNote(); openZalo(); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = msg;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
});
