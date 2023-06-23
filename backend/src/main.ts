import "dotenv/config";
import "./passport";
import "./database";
import { app } from "./app";

// Get the port from the app configuration
const port = app.get("port");

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default server;
