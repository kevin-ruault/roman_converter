const { integerToRoman } = require("../utils/romanConverter");

export function convertNumber(req: any, res: any) {
  const numParam = req.query.number;
  const num = parseInt(numParam, 10);

  if (isNaN(num) || num < 0 || num > 100) {
    return res
      .status(400)
      .json({ error: "Invalid number. Must be between 0 and 100." });
  }

  const result = integerToRoman(num);
  return res.json({ result });
}
