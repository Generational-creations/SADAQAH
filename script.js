
(function(){
var menuButton=document.querySelector('.menu-toggle');
var primaryNav=document.getElementById('primary-nav');
function setMenuOpen(open){
  if(!menuButton||!primaryNav)return;
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
  primaryNav.classList.toggle('is-open',open);
}
function route(){
  var h=(location.hash||'#home').slice(1);
  setMenuOpen(false);
  if(h==='give'||h==='work'){var target=document.getElementById(h);if(target)target.scrollIntoView()}else if(location.pathname.indexOf('index.html')>-1||location.pathname==='/'||location.pathname===''){window.scrollTo(0,0)}
}
window.addEventListener('hashchange',route);route();
if(menuButton&&primaryNav){
  menuButton.addEventListener('click',function(){
    setMenuOpen(menuButton.getAttribute('aria-expanded')!=='true');
  });
  primaryNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click',function(){setMenuOpen(false)});
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape')setMenuOpen(false);
  });
  window.addEventListener('resize',function(){
    if(window.innerWidth>760)setMenuOpen(false);
  });
}
function toggle(sel){var buttons=document.querySelectorAll(sel);if(!buttons.length)return;buttons.forEach(function(b){b.addEventListener('click',function(){
  document.querySelectorAll(sel).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');
  if(sel==='.amts button'){var cust=document.getElementById('cust');if(cust)cust.value='';}
})})}
toggle('.seg button');toggle('.amts button');
var cust=document.getElementById('cust');
if(cust){
  cust.addEventListener('input',function(){
    cust.value=cust.value.replace(/[^0-9.]/g,'').replace(/(\..*)\./g,'$1');
    if(cust.value)document.querySelectorAll('.amts button').forEach(function(x){x.setAttribute('aria-pressed','false')});
  });
}
var donateButton=document.getElementById('don');
if(donateButton){
  donateButton.addEventListener('click',function(){
    var sel=document.querySelector('.amts button[aria-pressed=true]');
    var amt=cust&&cust.value?parseFloat(cust.value):(sel?parseFloat(sel.dataset.a):0);
    var frequencyButton=document.querySelector('.seg button[aria-pressed=true]');
    var f=frequencyButton?frequencyButton.dataset.f:'One-time';
    var m=document.getElementById('msg');
    if(!(amt>=1&&amt<=10000)){if(m)m.textContent='Enter an amount between $1 and $10,000.';return}
    if(m)m.textContent=f+' gift of $'+amt.toFixed(2)+' selected. Secure checkout is not connected yet.';
  });
}
})();
