(function(){

  var carrinho = {

    abrir: function(){

      // add class on tag <body>
      body   = document.getElementsByTagName('body')[0];
      addClass(body, 'abrirCarrinho');

      // create overlay
      var overlay = document.createElement('div');
      overlay.setAttribute('id','carrinhoOverlay');
      body.appendChild(overlay);

      // show overlay
      overlay.style.display = 'none';
      fadeIn(overlay);
    },

    total: function(arr){

      var total = 0;

      if(arr){
        for(var i = 0; i < arr.length; i++){
          var item = arr[i];
          total += item.subtotal;
        }
      }

      return total;
    },

    conteudo: function(){

      var bagBody   = document.getElementById('carrinhoBody');
      var bagFooter = document.getElementById('carrinhoFooter');
      var bagMsg    = document.getElementById('carrinhoMsg');

      if(carrinho.total(getItemLocalStorage('carrinho')) === 0){
        bagBody.style.display = 'none';
        bagFooter.style.display = 'none';
        bagMsg.style.display = 'block';

      } else {

        bagBody.style.display = 'block';
        bagFooter.style.display = 'block';
        bagMsg.style.display = 'none';

        // update total and installments
        var bagTotal = document.getElementById('carrinhoTotal');
        bagTotal.innerHTML = priceFormat(carrinho.total(getItemLocalStorage('carrinho')));

        var bagInstallments = document.getElementById('carrinhoParcelas');
        bagInstallments.innerHTML = parcela(carrinho.total(getItemLocalStorage('carrinho')), 10);
      }
    },

    items: function(arr){

      if(arr){
        var carrinhoItens = document.getElementById('carrinhoItens');
        carrinhoItens.innerHTML = '';

        arr.forEach(function(item){
          var carrinhoItem  = document.createElement('li');
          addClass(carrinhoItem, 'carrinhoItem');

          var carrinhoItemHTML =
            '<button class="carrinhoRemoverItem" id="'+ item.id +'"></button>\n'+
            '<div class="carrinhoItemTexto">\n'+
              '<span class="carrinhoItemDesc">'+ item.title +' '+ item.description +'</span>\n'+

              '<div class="carrinhoItemInfo">\n'+
                '<span class="carrinhoItemTamanho">'+ item.size +'</span> | <span class="carrinhoItemEstilo">'+ item.style +'</span>\n'+
                '<div class="carrinhoItemQuantidade">Quantidade: '+ item.amount +'</div>\n'+
                '<div class="carrinhoItemPreco">'+ priceFormat(item.subtotal) +'</div>\n'+
              '</div>\n'+
            '</div>\n'+

            '<div class="carrinhoItemThumb">\n'+
              '<img src="assets/imagens/produtos/produto'+ item.id +'.jpg" alt="">\n'+
            '</div>';

          carrinhoItem.innerHTML = carrinhoItemHTML;
          carrinhoItens.appendChild(carrinhoItem);
        });
      }
    },

    remove: function(arr, produtoId, itemLocalStorage){

      if(arr.length > 0){
        for(var i = 0; i < arr.length; i++){
          if(produtoId === arr[i].id){
            arr.splice(i, 1);
          }
        }
      }

      setItemLocalStorage(itemLocalStorage, arr);
    }
  };


  var bagCtrl = function(){
    carrinho.abrir();
    carrinho.conteudo();
    carrinho.items(getItemLocalStorage('carrinho'));
  };

  var button = document.getElementById('btnAbrirCarrinho');

  button.addEventListener('click', bagCtrl);

  // overlay bag
  var body = document.getElementsByTagName('body')[0];
  body.addEventListener('click', function(e){
    var overlay = e.target;

    if(e.target.id === 'carrinhoOverlay'){
      removeClass(this, 'abrirCarrinho');

      fadeOut(overlay);
      setTimeout(function(){
        overlay.remove();
      }, 2000);
    }
  });

  var carrinhoItens = document.getElementById('carrinhoItens');
  carrinhoItens.addEventListener('click', function(e){

    var element = e.target;
    var parent = element.parentNode;

    if(element.className === 'carrinhoRemoverItem'){

      // remove html element
      fadeOut(parent);
      setTimeout(function(){
        parent.remove();
      }, 2000);

      // remove object from array
      carrinho.remove(getItemLocalStorage('carrinho'), parseInt(element.id), 'carrinho');

      // update counters
      atualizarContantorItens();

      // update html conteudo bag
      carrinho.conteudo();
    }
  });
})();