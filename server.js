const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const products = [
  { id: 1, name: "అరిసెలు", category: "పిండి వంటలు", price: 180, unit: "250g" },
  { id: 2, name: "సకినాలు", category: "పిండి వంటలు", price: 160, unit: "250g" },
  { id: 3, name: "మురుకులు", category: "స్నాక్స్", price: 120, unit: "250g" },
  { id: 4, name: "చెక్కలు", category: "స్నాక్స్", price: 130, unit: "250g" },
  { id: 5, name: "కజ్జికాయలు", category: "స్వీట్స్", price: 190, unit: "250g" }
];

app.get("/api/products", (req, res) => res.json(products));
app.post("/api/orders", (req, res) => {
  const { customer, phone, address, items } = req.body || {};
  if (!customer || !phone || !address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: "దయచేసి అన్ని వివరాలు నమోదు చేయండి." });
  }
  // Demo order endpoint. Connect a production database and payment gateway before launch.
  res.status(201).json({ message: "మీ ఆర్డర్ వివరాలు అందాయి. మా బృందం మిమ్మల్ని సంప్రదిస్తుంది.", orderId: "RRA" + Date.now() });
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log(`RamRuchiAdda running on ${PORT}`));
