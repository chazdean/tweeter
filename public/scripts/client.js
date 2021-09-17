/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
        <span class="tweet-date">${timeago.format(tweetObject.created_at)}</span>
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

  const postTweet = () => {
    $.get("/tweets", function(data, status) {
      const $newTweet = createTweetElement(data[data.length - 1]);
      $('.tweet-container').prepend($newTweet);
    });
  };

  $("form").submit(function(event) {
    event.preventDefault();

    const form = $(this);
    const textArea = $(this).find(".tweet-text");

    if (textArea.val() === "") {
      return alert("Cannot submit empty field");
    } else if (textArea.val().length >= 140) {
      return alert("Too many characters!");
    }

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: form.serialize(),
    }).then(() => {
      postTweet();
    });

    textArea.val("");

  });

  const loadTweets = () => {
    
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
    }).then((response) => {
      renderTweets(response);
    });
  };

  loadTweets();

});