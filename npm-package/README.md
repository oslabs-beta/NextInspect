<h1 align="center">NextInspect</h1>

<p align="center">Developer Tool for Viewing Next.js Sever Side Rendered Network Requests</p>

## **Description**

NextInspect is a developer tool that allows Next.js developers to see network request metrics in Server Side Rendered(SSR) components. Metrics are displayed in a format similar to the native Chrome network devtools, so onboarding and usage is a breeze. Metrics for network requests made in Client Side Rendered components are also shown, eliminating the need to click back and forth between the native Chrome devtools and NextInspect. Please also install the Chrome extension for NextInspect to see metrics in the devtools panel.

## **Installation**

Installation is done using the `npm install` command.

```console
$ npm install nextinspect
```

In the package.json of your next.js app, add this to the scripts

```
"nextinspect": "node ./node_modules/nextinspect/dist/server.js & node ./node_modules/.bin/next dev"
```

In the 'next.config.js' file of your Next.js app, add a key to your 'nextConfig' object called experimental. The value of this key should be an object and add the following key to this inner object 

```
instrumentationHook: True
```

Add a file to the root directory of your Next.js project called 'instrumentation.js' and paste in the following code

```
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
         await import('nextinspect/tracing'); 
        } 
    }
```


## Quick Start

1. Install the NextInspect Chrome extension.
2. Start both the telemetry collection and your Next.js app in dev mode by running 
```
$ npm run nextinspect
```
3. Go to your Next.js application page.
4. Open the NextInspect devtool by right clicking the page and selecting inspect. In the double right arrow dropdown to the right of the Network tab, you will be able to view your other devtool extensions.
5. Refresh your page to view telemtry metrics.



