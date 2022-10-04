const endpointURL = "https://api.twitter.com/2/users/by?usernames=";

async function getUserIdByUsername(
  bearerToken: string,
  needle: any,
  userName: string
) {
  // These are the parameters for the API request
  // specify User names to fetch, and any additional fields that are required
  // by default, only the User ID, name and user name are returned
  const params = {
    usernames: userName, // Edit usernames to look up
    "user.fields": "created_at,description", // Edit optional query parameters here
    expansions: "pinned_tweet_id",
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${bearerToken}`,
    },
  });

  if (res?.body?.data) {
    return res.body.data;
  } else {
    throw new Error("Unsuccessful request");
  }
}

export { getUserIdByUsername };
