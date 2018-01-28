# Ionic PWA Toolkit

## Giphy API key
You need to replace {API_KEY} with a real Giphy API key in src/components/random-gif/random-gif.tsx

## About the Ionic PWA Toolkit
The Ionic PWA Toolkit is the recommended way to build production ready Progressive Web Apps (PWAs) with Ionic. This toolkit gets you started with [Stencil](https://stenciljs.com/) and Ionic (4.x+). This combination of tools gives you the ability to build a fast, efficient PWA with zero config needed and best practices out of the box.

## Getting Started

To start building a PWA with the Ionic PWA Toolkit, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/ionic-pwa-toolkit.git random-gif-generator
cd random-gif-generator
```

and run:

```bash
npm install
npm start
```

## Production

To build your PWA for production, run:

```bash
npm run build
```
A production build includes everything needed for your project to be a PWA right out of the box. This includes both a Web Manifest (src/manifest.json) and a Service Worker (www/sw.js).


## Hosting

For top PWA performance, your app should be hosted with a hosting provider that supports HTTPS and HTTP2 out of the box.

We currently recommend [Firebase Hosting](https://firebase.google.com/docs/hosting/).

### H2 Push

To ensure the fastest possible load time for your PWA, we recommend setting up H2 push on Firebase. [Here is an example](https://github.com/ionic-team/ionic-stencil-hn-app/blob/master/firebase.json#L19-L25) of what this looks like in your `firebase.json` file. Lets go over the steps of how to setup H2 push properly for your Ionic PWA:

- Do a production build of your PWA with `npm run build`
- Serve your WWW folder locally using a local http server and open it in Chrome. https://www.npmjs.com/package/http-server works pretty well for this. If using the http-server package you can serve your www folder by running `http-server www`.
- Open Chrome Dev Tools on your PWA and open the [network tab of your chrome dev tools](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference). Reload the page and you should see all of your JS files show up in the network tab. Besides the `sw.js` file, these are the files you want to H2 push.
- You can then put these files in your push header setup by following this syntax https://github.com/ionic-team/ionic-stencil-hn-app/blob/master/firebase.json#L23.

## Service Workers

For info on how Service Workers work in Stencil check out our [Service Worker docs](https://stenciljs.com/docs/service-workers).

## Developing with a Service Worker

In some cases, for instance when you are working on adding [web push notifications](https://developers.google.com/web/fundamentals/push-notifications/) or [background sync](https://developers.google.com/web/updates/2015/12/background-sync), both which require a Service Worker, it can be handy to be able to dev builds with a service worker.

To do this with the Ionic PWA toolkit simply run `npm run devWithSW`. This will start a dev build, but with the Service Worker also getting livereloaded.

## Lazy Loading Images

Check out the `lazy-img` component in `src/components/lazy-img/lazy-img.tsx`.

## Unit Tests

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```

## Testing your PWA's performance

We recommend using https://www.webpagetest.org/easy with the `Run Lighthouse Audit` option turned on. This will give you an in depth look into your PWAs load performance on the average device connected to the average network. For more info on how to use webpagetest check out https://zoompf.com/blog/2015/07/the-seo-experts-guide-to-web-performance-using-webpagetest-2.
