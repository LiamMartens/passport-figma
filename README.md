# passport-figma

[![Build Status](https://travis-ci.org/LiamMartens/passport-figma.svg?branch=master)](https://travis-ci.org/LiamMartens/passport-figma)[![Coverage Status](https://coveralls.io/repos/github/LiamMartens/passport-figma/badge.svg?branch=master)](https://coveralls.io/github/LiamMartens/passport-figma?branch=master)[![devDependencies Status](https://david-dm.org/LiamMartens/passport-figma/dev-status.svg)](https://david-dm.org/LiamMartens/passport-figma?type=dev)

[Passport](http://passportjs.org/) strategy for authenticating with [Figma](https://figma.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Figma in your Node.js applications.
By plugging into Passport, Figma authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install passport-figma
```

## Usage

#### Create an Application

Before using `passport-figma`, you must register an application with Figma.
If you have not already done so, a new application can be created at
[Figma My Apps](https://www.figma.com/developers/apps).
Your application will be issued a client ID and client
secret, which need to be provided to the strategy. You will also need to
configure a callback URL which matches the route in your application.

#### Configure Strategy

The Figma authentication strategy authenticates users using a Figma account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. Figma also
requires a `state` to be passed, which you can enable by setting it to `true`.
Lastly, the strategy also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which is empty for the time being as Figma
has no open profile implemented.  The `verify` callback must call `cb` 
roviding a user to complete authentication.

```js
var FigmaStrategy = require('passport-figma').Strategy;

passport.use(new FigmaStrategy({
    clientID: FIGMA_CLIENT_ID,
    clientSecret: FIGMA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/figma/callback",
    state: true
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken);
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'figma'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/github',
  passport.authenticate('figma'));

app.get('/auth/github/callback', 
  passport.authenticate('figma', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```
_Keep in mind you also need to enable the `express-session` middleware for Figma's `state` verification to work correctly_

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/passport/express-4.x-facebook-example)
as a starting point for their own web applications.  The example shows how to
authenticate users using Facebook.  However, because both Facebook and GitHub
use OAuth 2.0, the code is similar.  Simply replace references to Facebook with
corresponding references to GitHub.

## Support

#### Funding

This software is provided to you as open source, free of charge.  The time and
effort to develop and maintain this project is dedicated by [@LiamMartens](https://github.com/LiamMartens).
If you (or your employer) benefit from this project, please consider a financial
contribution.  Your contribution helps continue the efforts that produce this
and other open source software.

Funds are accepted via [PayPal](https://paypal.me/LiamMartens), any amount is appreciated.

## License

[The MIT License](http://opensource.org/licenses/MIT)
