$('document').ready(function() {
  $('#report').on('submit', function(e) {
    e.preventDefault();
    var info = {
      winner: $('#winner').val(),
      winScore: $('#won').val(),
      loseScore: $('#lost').val()
    };
    info = JSON.stringify(info);
    $.ajax({
      type:'POST',
      data: info,
      url: '/profile',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        if (typeof data.redirect == 'string')
          window.location = data.redirect;
      }
    });
  });


});
