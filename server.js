import "module-alias/register.js";
import { app } from "./src/index.js";
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
