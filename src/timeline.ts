// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const getUserTweets = async (
  bearerToken: string,
  needle: any,
  userId: string
) => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets`;
  let userTweets: any[] = [];

  // we request the author_id expansion so that we can print out the user name later
  let params = {
    max_results: 100,
    "tweet.fields": "created_at",
    expansions: "author_id",
  };

  const options = {
    headers: {
      "User-Agent": "v2UserTweetsJS",
      authorization: `Bearer ${bearerToken}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  let userName;

  while (hasNextPage) {
    let resp: any = await getPage(params, options, nextToken, url, needle);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      userName = resp.includes.users[0].username;
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  console.dir(userTweets, {
    depth: null,
  });
  console.log(
    `Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`
  );
};

const getPage = async (
  params: any,
  options: any,
  nextToken: any,
  url: string,
  needle: any
) => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

export { getUserTweets };
