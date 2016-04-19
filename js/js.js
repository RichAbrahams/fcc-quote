$(document).ready(function(){

  var quoteAuthor = document.getElementById('quoteAuthor');
  var quoteText = document.getElementById('quoteText');
  var changeQuoteButton = document.getElementById('newQuoteButton');

  function getQuote() {
    $.ajax({
              url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp',
              type: 'GET',
              contentType: 'application/jsonp; charset=utf-8',
              dataType : 'jsonp',
              jsonp: "jsonp",
              success: function(result){
                  var newQuote = result;
                  if (newQuote.quoteText.length > 139){
                    getQuote();
                  } else {
                  quoteText.style.WebkitAnimationName = "fader";
                  quoteAuthor.style.WebkitAnimationName = "fader";
                  quoteText.innerHTML = newQuote.quoteText;
                  quoteAuthor.innerHTML = newQuote.quoteAuthor;
                  setTimeout(function(){
                    quoteText.style.WebkitAnimationName = null;
                    quoteAuthor.style.WebkitAnimationName = null;
                  },1000);
              }
            }
      });
  }

changeQuoteButton.addEventListener('click', getQuote, false);

getQuote();

});
