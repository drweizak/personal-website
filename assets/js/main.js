//Chamar todas as funções relacionadas com tamanhos para tomarem alterações no resize
function resizableElements(viewport) {

}

//Chamar todas as funções iniciais, esperando pelas imagens serem carregadas
(function ($, viewport) {
  $(document).ready(function () {
    $('body').waitForImages(function () {
      resizableElements(viewport);

      $('#leftSection .right-selector').on('click', function(){
        $(this).parent().toggleClass('show-section');
        $('#rightSection').removeClass('show-section');
      });
      $('#rightSection .left-selector').on('click', function(){
        $(this).parent().toggleClass('show-section');
        $('#leftSection').removeClass('show-section');
      });
    });
  });
})(jQuery, ResponsiveBootstrapToolkit);

//Vai chamar a função que possui todas as funções associadas ao resize
(function ($, viewport) {
  $(window).resize(function () {
    resizableElements(viewport);

  });
})(jQuery, ResponsiveBootstrapToolkit);

//Caso se pretenda aplicar um fadeOut ao body antes de todo se carregar
$(window).load(function () {
  $('body').waitForImages(function () {

  });
});
