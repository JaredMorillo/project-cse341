const express = require("express");
const app = express();
exports.app = app;

const routes = require("./routes");
const db = require("./database/db");

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require("body-parser");
require("dotenv").config();

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const GitHubStrategy = require("passport-github2").Strategy;

// ---------------------------------------------
// ORDER MATTERS — The correct order is below
// ---------------------------------------------

// Parse cookies
app.use(cookieParser());

// Express body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions FIRST
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));

// Passport NEXT
app.use(passport.initialize());
app.use(passport.session());

// CORS AFTER session + passport
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS']
}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// PASSPORT STRATEGY
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Root route
app.get("/", (req, res) => {
  res.send(req.session.user !== undefined
    ? `Logged in as ${req.session.user.displayName}`
    : "Log out"
  );
});

// GitHub OAuth callback
app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;  // ← stores user for your middleware
    res.redirect('/');
  }
);

// Routes (after authentication system)
app.use("/", routes);

// Start DB + server
const port = process.env.PORT || 8080;
db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database and App listening on port ${port}`);
    });
  }
});
