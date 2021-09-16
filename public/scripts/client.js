/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = (tweetObject) => {
    const $test = $(`
  <article class="tweet">
  <header>
      <div class="user-badge">
        <img class="user-avatar" src=${tweetObject.user.avatars}>
        <span class="user-name">${tweetObject.user.name}</span>
      </div>
      <span class="user-handle">${tweetObject.user.handle}</span>
  </header>
  <main>
    <div class="user-content">
      <p>${tweetObject.content.text}</p>
    </div>
  </main>
  <footer>
    <div class="footer-utility">
      <div>
        <span class="tweet-date">${tweetObject.created_at}</span>
      </div>
      <div class="footer-icons">
        <div>
          <i class="fas fa-flag icon"></i>
        </div>
        <div>
          <i class="fas fa-retweet icon"></i>
        </div>
        <div>
          <i class="fas fa-heart icon"></i>
        </div>
      </div>
    </div>
  </footer>
</article>
    `);

    return $test;
  };

  const renderTweets = (tweetData) => {
    tweetData.forEach(tweet => {
      const $newTweet = createTweetElement(tweet);
      $('.tweet-container').append($newTweet);
    });
  };

  renderTweets(data);

  $('.tweet-date').text((index, text) => {
    return timeago.format(text);
  }); 

  $("form").submit(function(event) {
    event.preventDefault();

    const form = $(this);

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    }).then((response) => {
      console.log(response);
    });


  });

});