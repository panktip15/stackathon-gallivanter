const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/:location/:date', async (req, res, next) => {
  const { data } = await axios.get(
    `http://api.eventful.com/json/events/search?app_key=${
      process.env.EVENTFUL_APP_KEY
    }&location=San+Diego&date=${req.params.date}`
    // `/api/eventful.com/json/events/search?
    // }&location=${req.params.location}`
  );
  console.log(req.params.date);
  res.json(data);
});
