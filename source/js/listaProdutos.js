atualizarContantorItens();

(function(){

  function getProduto(produto){
    var produtoLista  = document.getElementById('produtosLista'),
        produtoItem = document.createElement('li'),
        parcelas = (produto.installments > 0) ? '<div class="produtoParcelas">'+ parcela(produto.price, produto.installments) +'</div>' : '',
        produtoHTML =
          '<div>\n'+
            '<a href="#" title="'+ produto.title +'"'+
              'data-product-id="'+ produto.id +'"'+
              'data-product-sku="'+ produto.sku +'"'+
              'data-product-title="'+ produto.title +'"'+
              'data-product-description="'+ produto.description +'"'+
              'data-product-availableSizes="'+ produto.availableSizes +'"'+
              'data-product-size="'+ produto.availableSizes[0] +'"'+
              'data-product-style="'+ produto.style +'"'+
              'data-product-price="'+ produto.price +'"'+
              'data-product-installments="'+ produto.installments +'"'+
              'data-product-currencyId="'+ produto.currencyId +'"'+
              'data-product-currencyFormat="'+ produto.currencyFormat +'"'+
              'data-product-isFreeShipping="'+ produto.isFreeShipping +'">\n'+
              '<img src="assets/imagens/produtos/produto'+ produto.id +'.jpg" alt="'+ produto.title +'" class="produtoImg">\n'+
            '</a>\n'+
            '<div class="produtoInfo">\n'+
              '<p class="produtoTitulo">'+ produto.title +'</p>\n'+
              '<div class="produtoPreco">'+ priceFormat(produto.price) +'</div>\n'+
              parcelas+
            '</div>\n'+
          '</div>';

    produtoItem.setAttribute('class', 'produto col-md-4');
    produtoItem.innerHTML = produtoHTML;
    produtoLista.appendChild(produtoItem);
  }

  // ajax
	var xhr = new XMLHttpRequest(),
			url = 'data/products.json';

  xhr.open('GET', url);

  xhr.addEventListener('load', function() {

    if (this.status >= 200 && this.status < 400) {

      var datas 	 = JSON.parse(this.responseText),
      		produtos = datas.products;

      produtos.forEach(function(produto) {
      	getProduto(produto);
      });

    } else {
    	console.log('Erro ' + this.status + ': arquivo não encontrado');
    }
  });

  xhr.addEventListener('error', function(event){
  	console.log('Ocorreu um erro ao carregar os dados!');
	});

	xhr.addEventListener('loadstart', function(event){
    preloader.show();
	});

	xhr.addEventListener('loadend', function(event){
    preloader.hide();
	});

  xhr.send();
})();