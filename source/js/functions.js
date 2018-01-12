function removeClass(elem, elemClass){

  // IE10+
  if (elem.classList){
    elem.classList.remove(elemClass);
  } else {
    var currentClass = elem.className;

    if(currentClass.indexOf(elemClass) > 1){
      newClass = currentClass.replace(elemClass,'');
      elem.className = newClass;
    }
  }
}

function addClass(elem, elemClass){

  // IE10+
  if (elem.classList){
    elem.classList.add(elemClass);
  } else {
    var currentClass = elem.className;

    if(currentClass.indexOf(elemClass) < 1){
      elem.className += ' ' + elemClass;
    }
  }
}

function fadeOut(elem){

  // IE10+
  if(window.requestAnimationFrame){
    elem.style.opacity = 1;

    (function fade() {
      if ((elem.style.opacity -= 0.1) < 0) {
        elem.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  } else {
    elem.style.display = "none";
  }
}

function fadeIn(elem, display){

  // IE10+
  if(window.requestAnimationFrame){
    elem.style.opacity = 0;
    elem.style.display = display || "block";

    (function fade() {
      var val  = parseFloat(elem.style.opacity),
          calc = (val += 0.1) > 1;
      if (!calc) {
        elem.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  } else {
    elem.style.display = display || "block";
  }
}

function priceFormat(val){
  val = val.toFixed(2);
  val = val.toString();
  val = val.split('.');
  val = 'R$ <span>'+ val[0] +'</span>,'+ val[1];

  return val;
}

function parcela(val, installments){
  var novoValor = 0;
  var text   = '';

  novoValor = val / installments;
  novoValor = novoValor.toFixed(2);
  novoValor = novoValor.replace('.',',');
  text     = 'ou '+ installments +' x <span>R$ '+ novoValor +'</span>';

  return text;
}

function supportLocalStorage(){
  if(window.localStorage){
    return true;

  } else {
    console.log('Sorry! The browser does not support localStorage...');
    return false;
  }
}

function setItemLocalStorage(item, val){
  if(supportLocalStorage()){
    localStorage.setItem(item, JSON.stringify(val));
  }
}

function getItemLocalStorage(item){
  if(supportLocalStorage()){
    return JSON.parse(localStorage.getItem(item));
  }
}

function removeItemLocalStorage(item){
  if(supportLocalStorage()){
    localStorage.removeItem(item);
    window.location = window.location;
  }
}

function contadorCarrinhoItens(){
  var carrinho = getItemLocalStorage('carrinho');

  if(carrinho){
    var contador = 0;

    for(var i = 0; i < carrinho.length; i++){
      var item = carrinho[i];
      contador += item.amount;
    }

    if(contador === 0){
      setTimeout(function(){
        removeItemLocalStorage('carrinho');
      }, 3000);
    }

    return contador;
  }
}

function atualizarContantorItens(){
  var contadores = document.getElementsByClassName('carrinhoContador'),
      carrinhoItens = (contadorCarrinhoItens()) ? contadorCarrinhoItens() : 0;

  for(var i = 0; i < contadores.length; i++){
    var contador = contadores[i];
    contador.innerHTML = carrinhoItens;
    
  }
}