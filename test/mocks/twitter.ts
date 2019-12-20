import * as Twit from 'twit';

import '../../src/util/extend/string-ext';

import { ITweet, ITwitterUser } from 'howsmydriving-twitter';

export function createTweet(options: ITweet): ITweet {
  let ret: ITweet = options;

  return ret;
}

// Print out subset of tweet object properties.
export function PrintTweet(tweet: ITweet): string {
  var shortened = '';

  if (tweet.text) {
    shortened = tweet.text.trunc(100);
  }

  if (tweet.full_text) {
    shortened = tweet.full_text.trunc(100);
  }

  return (
    'id_str: ' +
    tweet.id_str +
    ', in_reply_to_screen_name: ' +
    tweet.in_reply_to_screen_name +
    ', in_reply_to_status_id_str: ' +
    tweet.in_reply_to_status_id_str +
    ', ' +
    shortened
  );
}
