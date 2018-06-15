const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/:location/:date', async (req, res, next) => {
  const { data } = await axios.get(
    `http://api.eventful.com/json/events/search?app_key=${
      process.env.EVENTFUL_APP_KEY
    }&where=${req.params.location}&within=25&date=${req.params.date}`
  );
  res.json(data);
});
