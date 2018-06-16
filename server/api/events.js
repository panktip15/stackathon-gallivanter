const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/:location/:date/:category', async (req, res, next) => {
  const { data } = await axios.get(
    `http://api.eventful.com/json/events/search?app_key=${
      process.env.EVENTFUL_APP_KEY
    }&where=${req.params.location}&within=25&date=${req.params.date}&category=${
      req.params.category
    }&sort_order=popularity`
  );
  res.json(data);
});

router.get('/categories', async (req, res, next) => {
  const { data } = await axios.get(
    `http://api.eventful.com/json/categories/list?app_key=${
      process.env.EVENTFUL_APP_KEY
    }`
  );
  res.json(data);
});
