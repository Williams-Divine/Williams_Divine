/* =============================================
   SHARED JS — Williams Divine Portfolio
   All pages link here
   ============================================= */

/* --- Cursor --- */
var cur = document.getElementById('cur'), ring = document.getElementById('curRing');
var mx = 0, my = 0, rx = 0, ry = 0;
if (cur && ring) {
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
  (function loop() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', function(e) { if (e.target.closest && e.target.closest('a, button')) { document.body.classList.add('hov'); } });
  document.addEventListener('mouseout', function(e) { if (e.target.closest && e.target.closest('a, button')) { document.body.classList.remove('hov'); } });
}

/* --- Theme --- */
var dark = false;
var themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', function () {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeBtn.innerHTML = dark ? '&#9728;&#65039;' : '&#127769;';
  });
}

/* --- Mobile menu --- */
function toggleMob() {
  var m = document.getElementById('mob'), h = document.getElementById('ham');
  var o = m.classList.toggle('open');
  h.classList.toggle('open', o);
  document.body.style.overflow = o ? 'hidden' : '';
}
function closeMob() {
  var m = document.getElementById('mob'), h = document.getElementById('ham');
  if (m) m.classList.remove('open');
  if (h) h.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- Active nav link (highlight current page) --- */
(function() {
  var path = window.location.pathname;
  var page = path.split('/').pop().replace('.html','') || 'index';
  var map = {
    'index': 'nl-home',
    'work': 'nl-work',
    'about': 'nl-about',
    // all project pages highlight Work
    'planetcred': 'nl-work',
    'fastrack': 'nl-work',
    'handyman': 'nl-work',
    'handymen': 'nl-work',
    'maamaka': 'nl-work',
    'akum': 'nl-work'
  };
  var id = map[page] || 'nl-home';
  var el = document.getElementById(id);
  if (el) el.classList.add('active');
})();

/* --- CV download --- */
function openCV() {
  var a = document.createElement('a');
  a.href = 'assets/files/Williams Divine - Product Designer.pdf';
  a.download = 'Williams Divine - Product Designer.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* --- Avatar switcher (home only) --- */
var curAv = 0, avTimer = null;
function switchAvatar(n) {
  var imgs = document.querySelectorAll('.av-img');
  var dots = document.querySelectorAll('.av-dot');
  if (!imgs.length) return;
  imgs.forEach(function (el) { el.classList.remove('show'); el.classList.add('hide'); });
  dots.forEach(function (el) { el.classList.remove('on'); });
  imgs[n].classList.remove('hide'); imgs[n].classList.add('show');
  dots[n].classList.add('on');
  curAv = n;
  resetAvTimer();
}
function resetAvTimer() {
  if (avTimer) clearInterval(avTimer);
  var imgs = document.querySelectorAll('.av-img');
  if (!imgs.length) return;
  avTimer = setInterval(function () { switchAvatar((curAv + 1) % imgs.length); }, 3200);
}
if (document.querySelector('.av-img')) resetAvTimer();

/* --- Slide system (home only) --- */
var slides = document.querySelectorAll('.slide');
var sdots = document.querySelectorAll('.sdot');
var curSlide = 0;
function gotoSlide(n) {
  if (!slides.length || n < 0 || n >= slides.length) return;
  curSlide = n;
  slides[n].scrollIntoView({ behavior: 'smooth' });
  sdots.forEach(function (d, i) { d.classList.toggle('on', i === n); });
}
if (slides.length) {
  window.addEventListener('scroll', function () {
    var sy = window.scrollY;
    var h = window.innerHeight;
    var n = Math.round(sy / h);
    if (n !== curSlide && n >= 0 && n < slides.length) {
      curSlide = n;
      sdots.forEach(function (d, i) { d.classList.toggle('on', i === n); });
    }
  }, { passive: true });
}

/* --- Work page filter --- */
function filt(cat, btn) {
  document.querySelectorAll('.fb').forEach(function (b) { b.classList.remove('on'); });
  if (btn) btn.classList.add('on');
  document.querySelectorAll('.proj-row').forEach(function (r) {
    var cats = r.dataset.cats || '';
    r.style.display = (cat === 'all' || cats.split(',').indexOf(cat) > -1) ? '' : 'none';
  });
}

/* --- Contact form --- */
function submitForm(e) {
  if (e) e.preventDefault();
  var name = document.getElementById('ctName') ? document.getElementById('ctName').value : '';
  var email = document.getElementById('ctEmail') ? document.getElementById('ctEmail').value : '';
  var subject = document.getElementById('ctSubject') ? document.getElementById('ctSubject').value : '';
  var msg = document.getElementById('ctMsg') ? document.getElementById('ctMsg').value : '';
  var body = encodeURIComponent('Hi Williams,\n\nMy name is ' + name + ' (' + email + ').\n\n' + msg + '\n\nLooking forward to hearing from you!');
  window.location.href = 'mailto:williamsdivine04@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
  var suc = document.getElementById('ctSuccess');
  if (suc) suc.style.display = 'block';
}
function copyEmail() {
  navigator.clipboard.writeText('williamsdivine04@gmail.com').then(function () {
    var t = document.getElementById('copyTxt');
    if (t) { t.textContent = 'Copied!'; setTimeout(function () { t.textContent = 'Copy'; }, 2200); }
  }).catch(function () { prompt('Copy this email:', 'williamsdivine04@gmail.com'); });
}

/* --- Lightbox (case studies) --- */
function openZ(src) {
  if (window.innerWidth > 768) return;
  var m = document.getElementById('zModal');
  var mi = document.getElementById('zImg');
  if (!m || !mi) return;
  mi.src = src;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeZ() {
  var m = document.getElementById('zModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.cs-img-row img').forEach(function(img) {
    img.addEventListener('click', function () { openZ(this.src); });
  });
});

/* --- Certificates modal (about page) --- */
var certInterval = null;
function openCert(title, srcId) {
  var titleEl = document.getElementById('certModalTitle');
  var body = document.getElementById('certModalBody');
  var modal = document.getElementById('certModal');
  if (!titleEl || !body || !modal) return;
  titleEl.textContent = title;
  body.innerHTML = '';
  modal.classList.remove('has-nav');
  if (certInterval) clearInterval(certInterval);

  var container = document.createElement('div');
  container.className = "cert-scroll-container";
  container.style.cssText = "display:flex;flex-direction:row;overflow-x:auto;overflow-y:hidden;height:100%;width:100%;scroll-snap-type:x mandatory;scroll-behavior:smooth;align-items:center;padding:20px 0;-ms-overflow-style:none;scrollbar-width:none;";
  body.appendChild(container);

  function addImg(path) {
    var img = document.createElement('img');
    img.src = path;
    img.style.minWidth = "100%";
    img.style.height = "auto";
    img.style.maxHeight = "80vh";
    img.style.objectFit = "contain";
    img.style.scrollSnapAlign = "center";
    img.style.padding = "0 10vw";
    container.appendChild(img);
  }

  if (srcId === 'GOOGLE_UX') {
    modal.classList.add('has-nav');
    var certs = [
      "GoogleUXDesignProfessionalCertificatev.3_Badge20260211-34-rzndnq_page-0001.jpg",
      "Google UX Design_page-0001.jpg",
      "Cert- Foundations of User Experience (UX) Design_page-0001.jpg",
      "Cert - Start the UX Design Process_page-0001.jpg",
      "Cert-Build Wireframes and Low-Fidelity Prototypes_page-0001.jpg",
      "Cert - Conduct UX Research and Test Early Concepts_page-0001.jpg",
      "Create High-Fidelity Designs and Prototypes in Figma_page-0001.jpg",
      "Build Dynamic User Interfaces (UI) for Websites_page-0001.jpg",
      "Design a User Experience for Social Good & Prepare for Jobs_page-0001.jpg",
      "Accelerate Your Job Search with AI_page-0001.jpg"

    ];
    certs.forEach(function (c) { addImg('images/Career Certs/Google Certs/' + c); });
    certInterval = setInterval(function () {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
      }
    }, 4000);
    var prev = document.createElement('button');
    prev.className = "cert-nav-btn cert-nav-prev";
    prev.innerHTML = "&larr;";
    prev.onclick = function () { container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' }); clearInterval(certInterval); };
    body.appendChild(prev);
    var next = document.createElement('button');
    next.className = "cert-nav-btn cert-nav-next";
    next.innerHTML = "&rarr;";
    next.onclick = function () { container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' }); clearInterval(certInterval); };
    body.appendChild(next);
  } else if (srcId === 'Accessibility') {
    addImg('images/Career Certs/Microsft accessibility.jpeg');
  }else if (srcId === 'Claude') {
    addImg('images/Career Certs/Claude_page-0001.jpg');
  } else if (srcId === 'HNG') {
    addImg('images/Career Certs/HNG cert_page-0001.jpg');
  } else if (srcId === 'ZURI') {
    addImg('images/Career Certs/ZuriBoard_page-0001.jpg');
  } else {
    body.innerHTML = '<div class="cert-placeholder"><span style="font-size:2rem">&#x1F4DC;</span><span>' + title + '</span><p style="font-size:.76rem;opacity:0.6;margin-top:10px">Certificate file missing.</p></div>';
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCertModal(e, force) {
  var modal = document.getElementById('certModal');
  if (!modal) return;
  if (force || !e || e.target === modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (certInterval) clearInterval(certInterval);
  }
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCertModal(null, true); });

/* --- Update copyright year --- */
document.querySelectorAll('.copy-year').forEach(function(el) {
  el.textContent = new Date().getFullYear();
});
