
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
var paymentOptions=document.querySelectorAll('.payment-option');
var paymentMessage=document.getElementById('payment-msg');
paymentOptions.forEach(function(option){
  option.addEventListener('click',function(){
    var panelId=option.getAttribute('aria-controls');
    var willOpen=option.getAttribute('aria-expanded')!== 'true';
    paymentOptions.forEach(function(button){
      button.setAttribute('aria-expanded','false');
      button.querySelector('.payment-chevron').textContent='+';
      var panel=document.getElementById(button.getAttribute('aria-controls'));
      if(panel)panel.hidden=true;
    });
    if(willOpen){
      option.setAttribute('aria-expanded','true');
      option.querySelector('.payment-chevron').textContent='-';
      var panel=document.getElementById(panelId);
      if(panel){
        panel.hidden=false;
        var firstInput=panel.querySelector('input');
        if(firstInput)firstInput.focus();
      }
      if(paymentMessage)paymentMessage.textContent=option.dataset.payment+' details';
    }
  });
});
document.querySelectorAll('.donation-form').forEach(function(form){
  form.addEventListener('submit',function(event){
    event.preventDefault();
    var amount=form.elements.amount.value;
    if(!amount||parseFloat(amount)<1){
      if(paymentMessage)paymentMessage.textContent='Enter a donation amount of at least 1.';
      return;
    }
    var method=form.dataset.method;
    if(paymentMessage){
      paymentMessage.textContent=method==='Bank'
        ? 'Your bank transfer request is ready. Account details need to be connected.'
        : 'Your mobile money request is ready. Secure payment setup is not connected yet.';
    }
  });
});
})();
