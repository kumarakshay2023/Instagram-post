import express from 'express';
import https from "https";
import qs from "querystring";

const instaRouter  = express.Router();

instaRouter.route("/posts/:username").get(getInstagramPostService)


export async function getInstagramPostService(req, res, next) {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ error: "Username and amount are required" });
    }

    const options = {
      method: "POST",
      hostname: process.env.RAPIDAPI_HOST,
      path: "/get_ig_user_posts.php",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          res.json(jsonData);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse response from API" });
        }
      });
    });

    apiReq.on("error", (error) => {
        next(error);
    });

    apiReq.write(qs.stringify({ username_or_url: username }));
    apiReq.end();
  } catch (error) {
    next(error);
  }
}

export default instaRouter;