const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/:location/:date/:category', async (req, res, next) => {
  const { data } = await axios.get(
    `http://api.eventful.com/json/events/search?app_key=${
      process.env.EVENTFUL_APP_KEY
    }&where=${req.params.location}&within=20&date=${req.params.date}&category=${
      req.params.category
    }&sort_order=popularity&page_size=15&page_number=1`
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
