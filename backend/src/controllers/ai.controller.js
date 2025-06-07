const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  console.log("REQ BODY:", req.body); 
  const code = req.body.code;
   if (!code || typeof code !== "string") {
    return res.status(400).send("Prompt is required and must be a string.");
  }
  if (!code) {
    return res.status(400).send("Prompt is required");
  }
  const response = await aiService(code);
  return res.send(response);
};
