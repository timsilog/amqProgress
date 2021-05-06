const express = require('express');
const path = require('path');
const app = express()
const PORT = process.env.PORT || 5000;

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build", "index.html"));
// });

app.use(
  express.static(
    path.join(__dirname, '../../build'),
  ),
);

app.listen(PORT, () => console.log(`hosting @${PORT}`));