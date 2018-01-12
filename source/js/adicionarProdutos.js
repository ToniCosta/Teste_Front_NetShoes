(function(){
  var produtosArray;
  var carrinho = getItemLocalStorage('carrinho');

  produtosArray = (carrinho) ? carrinho : [];

  // get values from properties
  var producList = document.getElementById('produtosLista');

  producList.addEventListener("click", function(e) {
    e.preventDefault();

    if(e.target.nodeName === 'IMG'){
      var product = e.target.parentNode;

      var id             = parseInt(product.getAttribute('data-product-id')),
          sku            = parseInt(product.getAttribute('data-product-sku')),
          title          = product.getAttribute('data-product-title'),
          description    = product.getAttribute('data-product-description'),
          availableSizes = product.getAttribute('data-product-availableSizes'),
          size           = product.getAttribute('data-product-size'),
          style          = product.getAttribute('data-product-style'),
          price          = parseFloat(product.getAttribute('data-product-price')),
          installments   = parseInt(product.getAttribute('data-product-installments')),
          currencyId     = product.getAttribute('data-product-currencyId'),
          currencyFormat = product.getAttribute('data-product-currencyFormat'),
          isFreeShipping = product.getAttribute('data-product-isFreeShipping'),
          amount         = 1;

      // check if the item has already been added in the bag
      var verificaCarrinho = false,
          index;

      if(produtosArray.length > 0){
        for(var i = 0; i < produtosArray.length; i++){
          if(id === produtosArray[i].id){
            verificaCarrinho = true;
            index = i;
          }
        }
      }

      // if item does not exist add in bag
      if(!verificaCarrinho){
        var datas = {
          'id': id,
          'sku': sku,
          'title': title,
          'description': description,
          'availableSizes': availableSizes,
          'size': size,
          'style': style,
          'price': price,
          'installments': installments,
          'currencyId': currencyId,
          'currencyFormat': currencyFormat,
          'isFreeShipping': isFreeShipping,
          'amount': amount,
          'subtotal': price
        };

        produtosArray.push(datas);

      // if the item exists in the bag updates 'amount' and 'subtotal'
      } else {

        produtosArray[index].amount += 1;

        var newSubtotal = produtosArray[index].amount * produtosArray[index].price;
        produtosArray[index].subtotal = parseFloat(newSubtotal.toFixed(2));
      }

      // save datas on localStorage
      setItemLocalStorage('carrinho', produtosArray);

      // update #bar-bag-counter
      atualizarContantorItens();

      // debug
      // console.table(getItemLocalStorage('bag'));
    }
  });
})();