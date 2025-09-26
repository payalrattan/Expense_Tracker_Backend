import express from 'express';
const router = express.Router();

router.get('/reports', verifyTokenMiddleware, async (req, res) => {

  const reportsData = [
    { label: 'September', income: 5000, expenses: 2000 },
    { label: 'October', income: 4500, expenses: 2500 },
  ];

  res.json(reportsData);
});

export default router;
