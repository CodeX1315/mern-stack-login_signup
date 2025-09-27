const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200)
        .json([
            {
                name: "17Pro Max",
                price: 120000,
            },
            {
                name: "Iphone 14",
                price: 90000,
            }
        ])
});

module.exports = router;