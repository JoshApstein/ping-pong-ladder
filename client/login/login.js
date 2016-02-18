$('document').ready(function() {
  $('#login').on('submit', function(e) {
    e.preventDefault();
    var userInfo = {userName: $('#user').val(), password: $('#pw').val()};
    console.log(userInfo.userName)
    userInfo = JSON.stringify(userInfo);
    $.ajax({
      type:'POST',
      data: userInfo,
      url: '/',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        if (typeof data.redirect == 'string')
          window.location = data.redirect;
      },
      error: function(error){
        if(error.responseText === 'showAlert') {
          alert("Please enter correct user name and password.");
          $('#user').val('');
          $('#pw').val('');
        }
      }
    });
  });
});
