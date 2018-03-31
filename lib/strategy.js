const util = require('util');
const crypto = require('crypto');

const OAuth2Strategy = require('passport-oauth2')

/**
 * `Strategy` constructor.
 *
 * The Figma authentication strategy authenticates requests by delegating to
 * Figma using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Figma application's Client ID
 *   - `clientSecret`  your Figma application's Client Secret
 *   - `callbackURL`   URL to which Figma will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request. At the time of writing there is 
 *                     only 1 valid scope: 'file_read'
 *                     (see https://www.figma.com/developers/docs#auth-oauth for more info)
 *   - `state`        State needs to be enabled (true) for the Figma authentication flow to work
 *
 * Examples:
 *
 *     passport.use(new FigmaStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret',
 *         callbackURL: 'https://www.example.net/auth/figma/callback',
 *         state: true
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         console.log(accessToken, refreshToken);
 *         done(null, {});
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://www.figma.com/oauth';
    options.tokenURL = options.tokenURL || 'https://www.figma.com/api/oauth/token';
    options.scope = options.scope || ['file_read'];
    options.scopeSeparator = options.scopeSeparator || ',';
    options.customHeaders = options.customHeaders || {};

    OAuth2Strategy.call(this, options, verify);
    this.name = 'figma';
    this._oauth2.useAuthorizationHeaderforGET(true);
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Usually you would fetch the authenticated user's profile here
 * but Figma has no profile at this point so we are just
 * letting it pass
 * 
 * @param {String} accessToken 
 * @param {Function} done 
 */
Strategy.prototype.userProfile = function(accessToken, done) {
    done(null, {});
}

module.exports = Strategy;