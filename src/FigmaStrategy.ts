import OAuth2Strategy from 'passport-oauth2';
import { User, Profile } from './types';
import { parseJsonFromStringOrBuffer } from './utils';

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
export class FigmaStrategy extends OAuth2Strategy {
    constructor(opts: Omit<OAuth2Strategy.StrategyOptions, 'authorizationURL' | 'tokenURL'>, verify: OAuth2Strategy.VerifyFunction) {
        const options: OAuth2Strategy.StrategyOptions = {
            authorizationURL: 'https://www.figma.com/oauth',
            tokenURL: 'https://www.figma.com/api/oauth/token',
            scope: ['file_read'],
            scopeSeparator: ',',
            customHeaders: {},
            ...opts,
        };
        super(options, verify);
        this.name = 'figma';
        this._oauth2.useAuthorizationHeaderforGET(true);
    }

    private apiUrl(path: string) {
        return `https://api.figma.com/v1/${path}`;
    }

    /**
     * Usually you would fetch the authenticated user's profile here
     * but Figma has no profile at this point so we are just
     * letting it pass
     * 
     * @param {String} accessToken 
     * @param {Function} done 
     */
    public userProfile(accessToken: string, done: (err?: Error | null, profile?: Profile) => void) {
        this._oauth2.get(this.apiUrl('me'), accessToken, (err, result) => {
            if (err || !result) { return done(new Error(`(${err ? err.statusCode : 500}) Failed to fetch user profile`)) }
            try {
                const user = parseJsonFromStringOrBuffer<User>(result);
                done(null, {
                    provider: 'figma',
                    id: user.id,
                    displayName: user.handle,
                    emails: [{
                        value: user.email,
                    }],
                    photos: [user.img_url]
                });
            } catch (err) {
                done(err);
            }
        });
    }
}