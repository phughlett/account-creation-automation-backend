const app = require("./app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening at localhost on port: ${PORT}`);
});