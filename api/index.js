const express = require("express");
const { google } = require("googleapis");
const REACT_APP_YOUTUBE_API_KEY = "AIzaSyCCVbaUVJRZ23dTiekEQWD1qrluis3YOPs";

const youtube = google.youtube({
  version: "v3",
  auth: REACT_APP_YOUTUBE_API_KEY,
});

const router = express.Router();

router.get("/videos/search/:keyword", (req, res, next) => {
  const { keyword } = req.params;
  const { pageToken } = req.query;
  (async () => {
    // 検索結果を動画IDで取得
    const {
      data: { items: idItems, nextPageToken },
    } = await youtube.search.list({
      part: "id",
      q: keyword,
      type: "video",
      maxResults: 20,
      pageToken,
    });
    // 動画の情報を取得
    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const {
      data: { items },
    } = await youtube.videos.list({
      part: "statistics,snippet",
      id: ids.join(","),
    });
    res.json({ items, nextPageToken });
  })().catch(next);
});

module.exports = router;