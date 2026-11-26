
(function(){
var menuButton=document.querySelector('.menu-toggle');
var primaryNav=document.getElementById('primary-nav');
var siteHeader=document.querySelector('header');
function updateHeader(){
  if(siteHeader)siteHeader.classList.toggle('is-scrolled',window.scrollY>20);
}
window.addEventListener('scroll',updateHeader,{passive:true});
updateHeader();
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
var paymentMessageEnglish='Select a payment method to continue.';
function translate(text){
  return window.SadaqahLanguage?window.SadaqahLanguage.translate(text):text;
}
function setPaymentMessage(text){
  paymentMessageEnglish=text;
  if(paymentMessage)paymentMessage.textContent=translate(text);
}
var giftConfigurator=document.getElementById('monthly-gift-form');
if(giftConfigurator){
  var customGiftAmount=document.getElementById('custom-gift-amount');
  var giftSummaryProgram=document.getElementById('gift-summary-program');
  var giftSummaryDescription=document.getElementById('gift-summary-description');
  var giftSummaryAmount=document.getElementById('gift-summary-amount');
  var givingPaymentStep=document.getElementById('giving-payment-step');
  var startMonthlyGift=document.getElementById('start-monthly-gift');

  function updateMonthlyGift(){
    var selectedProgram=giftConfigurator.querySelector('input[name="program"]:checked');
    var selectedAmount=giftConfigurator.querySelector('input[name="gift_amount"]:checked');
    var amountValue=customGiftAmount.value.trim()|| (selectedAmount&&selectedAmount.value);
    var amount=Number(amountValue);
    var program=selectedProgram?selectedProgram.value:'Clean Water';
    var programOption=selectedProgram?selectedProgram.closest('.program-option'):null;
    var description=programOption?programOption.querySelector('small').dataset.description:'';

    giftConfigurator.querySelectorAll('.program-option').forEach(function(option){
      option.classList.toggle('is-selected',option.querySelector('input').checked);
    });
    giftConfigurator.querySelectorAll('.amount-option').forEach(function(option){
      option.classList.toggle('is-selected',option.querySelector('input').checked);
    });

    if(giftSummaryProgram)giftSummaryProgram.textContent=translate(program);
    if(giftSummaryDescription)giftSummaryDescription.textContent=translate(description);
    if(giftSummaryAmount){
      giftSummaryAmount.textContent=Number.isFinite(amount)&&amount>0
        ?new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(amount)+'/month'
        :translate('Enter a valid amount');
    }

    document.querySelectorAll('.donation-form').forEach(function(form){
      form.elements.program.value=program;
      form.elements.amount.value=Number.isFinite(amount)&&amount>0?String(amount):'';
    });
    return amount;
  }

  giftConfigurator.querySelectorAll('input[name="program"]').forEach(function(input){
    input.addEventListener('change',updateMonthlyGift);
  });
  giftConfigurator.querySelectorAll('input[name="gift_amount"]').forEach(function(input){
    input.addEventListener('change',function(){
      customGiftAmount.value='';
      updateMonthlyGift();
    });
  });
  customGiftAmount.addEventListener('input',function(){
    giftConfigurator.querySelectorAll('input[name="gift_amount"]').forEach(function(input){
      input.checked=false;
    });
    updateMonthlyGift();
  });

  updateMonthlyGift();
  document.addEventListener('sadaqah:languagechange',updateMonthlyGift);
  startMonthlyGift.addEventListener('click',function(){
    var amount=updateMonthlyGift();
    if(!Number.isFinite(amount)||amount<1){
      setPaymentMessage('Enter a monthly donation amount of at least £1.');
      customGiftAmount.focus();
      return;
    }
    givingPaymentStep.hidden=false;
    startMonthlyGift.setAttribute('aria-expanded','true');
    setPaymentMessage('Your monthly gift is selected. Recurring payments are not connected yet.');
    var firstOption=givingPaymentStep.querySelector('.payment-option');
    if(firstOption)firstOption.focus();
  });
}
document.addEventListener('sadaqah:languagechange',function(){
  setPaymentMessage(paymentMessageEnglish);
});
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
        var firstInput=panel.querySelector('input:not([type="hidden"]):not([readonly])');
        if(firstInput)firstInput.focus();
      }
      setPaymentMessage(option.dataset.payment==='Bank'?'Bank details':'Mobile money details');
    }
  });
});
document.querySelectorAll('.donation-form').forEach(function(form){
  form.addEventListener('submit',function(event){
    event.preventDefault();
    var amount=form.elements.amount.value;
    if(!amount||parseFloat(amount)<1){
      setPaymentMessage('Enter a donation amount of at least 1.');
      return;
    }
    var method=form.dataset.method;
    setPaymentMessage(method==='Bank'
      ? 'Monthly bank transfer details are not connected yet. Please contact us to arrange your gift.'
      : 'Your monthly gift is selected. Mobile money checkout is not connected yet.');
  });
});
var timelineItems=document.querySelectorAll('.timeline-item');
if(timelineItems.length&&'IntersectionObserver' in window){
  // Reveal each timeline chapter once as it enters the viewport.
  var timelineObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.18});
  timelineItems.forEach(function(item){timelineObserver.observe(item)});
}else{
  timelineItems.forEach(function(item){item.classList.add('is-visible')});
}
})();
