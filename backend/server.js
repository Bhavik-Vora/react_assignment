import { connectDB } from "./config/database.js";
import app from "./app.js";
app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Home is Calling</h1>");
});

connectDB();
