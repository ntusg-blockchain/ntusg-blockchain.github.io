//Set up dotenv
//const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const { createSecureHeaders } = require('next-secure-headers');
const debug = process.env.NODE_ENV !== "production";

module.exports = {
	// Githug page.
	exportPathMap: function () {
		return {
		  "/": { page: "/" },
		  "/about": { page: "/about" },
		  "/attendanceTracker": { page: "/attendanceTracker" },
		  "/integerstorage": { page: "/integerstorage" },
		  "/quickguide": { page: "/quickguide" },
		  "/callIntegerStorage": { page: "/callIntegerStorage" },
		  "/signMessage": { page: "/signMessage" },
		  "/404": { page: "/404" }
		}
	  },
	  //assetPrefix: '',
	  assetPrefix: !debug ? '/bns-demo-app/' : '',
	  webpack: (config, { dev }) => {
		// Perform customizations to webpack config
		// console.log('webpack');
		// console.log(config.module.rules, dev);
		config.module.rules = config.module.rules.map(rule => {
		  if(rule.loader === 'babel-loader') {
			rule.options.cacheDirectory = false
		  }
		  return rule
		})
		// Important: return the modified config
		return config
	  },/*,
	  webpackDevMiddleware: (config) => {
		// Perform customizations to webpack dev middleware config
		// console.log('webpackDevMiddleware');
		// console.log(config);
		// Important: return the modified config
		return config
	  }, */

	//In general, X-Powered-By HTTP response header should be removed from response headers because it helps hackers to get the server information.
	poweredByHeader: false,

	async headers() {
		return [
			{
				source: '/(.*)',
				headers: createSecureHeaders({ contentSecurityPolicy: true, referrerPolicy: 'no-referrer' })
			}
		];
	},/*
	webpack: (config, { buildId, dev }) => {
		// This allows the app to refer to files through our symlink
		config.resolve.symlinks = false;
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv)); //dotenv
		return config;
	}
	*/
};
