import cookieParser from "cookie-parser";
import express from "express";
import methodOverride from "method-override";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import MainRouter from "./routes/main.routes.mjs";
import SongsRouter from "./routes/songs.routes.mjs";
import UserRouter from "./routes/user.routes.mjs";
import webpackConfig from "./webpack_conf/webpack.dev.js";

// Initialise Express instance
const app = express();
// Set the Express view engine to expect EJS templates
app.set("view engine", "ejs");
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride("_method"));
// Expose the files stored in the public folder
app.use(express.static("public"));
// Expose the files stored in the distribution folder
app.use(express.static("dist"));

// Set up Webpack in dev env
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // html only
      writeToDisk: (filePath) => /\.html$/.test(filePath),
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
}
// main router to the back because express will default to that route if its in front
const routers = [UserRouter, SongsRouter, MainRouter];
routers.forEach((router) => app.use("/", router));

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
console.log(`🚀 App listening on the port ${PORT}`);
