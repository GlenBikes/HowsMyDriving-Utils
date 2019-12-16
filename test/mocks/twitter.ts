import * as Twit from 'twit';

import '../../src/util/extend/string-ext';

export interface ITwitterUser {
  id?: number;
  id_str?: string;
  screen_name?: string;
}

export interface ITweet {
  id?: number;
  id_str?: string;
  user_screen_name?: string;
  in_reply_to_screen_name?: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  tweet_user_id?: number;
  tweet_user_id_str?: string;
  tweet_user_screen_name?: string;
  full_text?: string;
  display_text_range?: Array<number>;
  user?: ITwitterUser 
}

export function createTweet(options: ITweet): ITweet {
  let ret: ITweet = options;
  
  return ret;
}

// Print out subset of tweet object properties.
export function PrintTweet(tweet: Twit.Twitter.Status): string {
  var shortened = "";
  
  if (tweet.text) {
    shortened = tweet.text.trunc(100);
  }
  
  if (tweet.full_text) {
    shortened = tweet.full_text.trunc(100);
  }

  return (
    "id_str: " +
    tweet.id_str +
    ", in_reply_to_screen_name: " +
    tweet.in_reply_to_screen_name +
    ", in_reply_to_status_id_str: " +
    tweet.in_reply_to_status_id_str +
    ", " +
    shortened
  );
}

