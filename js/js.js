$(document).ready(function(){

  var quoteAuthor = document.getElementById('quoteAuthor');
  var quoteText = document.getElementById('quoteText');
  var changeQuoteButton = document.getElementById('newQuoteButton');
  var twitterButton = document.querySelector('.twitter-share-button');

// gets quote from provider api via ajax

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
                  twitterButton.href = "https://twitter.com/intent/tweet?text=" + newQuote.quoteText;
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

// change quote button controller

changeQuoteButton.addEventListener('click', function(){
  $(changeQuoteButton).toggleClass("buttonColChange");
  setTimeout(function () {
    $(changeQuoteButton).toggleClass("buttonColChange");
  }, 2200);
  getQuote();
}, false);

getQuote();

});
