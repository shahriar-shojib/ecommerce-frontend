import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
// import session from 'express-session';
// import sessionFileStore from 'session-file-store';
// const FileStore = new sessionFileStore(session);
const cookieSession = require('cookie-session');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		bodyParser.json(),
		cookieSession({
			name: 'session',
			secret: 'randomText',
			maxAge: 3600000,
		}),
		sapper.middleware({
			session: (req, res) => {
				return {
					token: req.session.token,
				};
			},
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
