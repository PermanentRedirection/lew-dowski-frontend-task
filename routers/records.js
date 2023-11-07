const express = require('express');

const { getRecords, getSingleRecord, purchaseItem, revertPurchase } = require('./recordControllers');

const router = express.Router();

router.get('/', getRecords);
router.get('/records/:id', getSingleRecord);
router.post('/purchase-item', purchaseItem);
router.post('/revert-purchase', revertPurchase);

module.exports = router;
