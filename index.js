const Twit = require("twit");
const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const nztaAkldId = "403101385";

const stream = T.stream("statuses/filter", { follow: [nztaAkldId] });

stream.on("tweet", ({ id_str, quoted_status, text, user }) => {
  const lowercasedText = text.toLowerCase();
  if (
    lowercasedText.includes("sh1") ||
    (quoted_status && quoted_status.text.toLowerCase().includes("sh1"))
  ) {
    console.log(`${user.name}: ${text}`);
    T.post("statuses/retweet/:id", { id: id_str }, (err, data, response) => {
      console.log(data);
    });
  }
});
