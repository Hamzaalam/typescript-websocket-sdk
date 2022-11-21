# Typescript WebSocket client Sdk for both nodejs and browser

`packages` ---> contains sdk for nodejs and browser

`apps` ---> contains examples to utilize the sdk


To run packages first build it using below command at the root, This will generate the both packages build files!

```
npm run compile -ws
```


 To to run the `browser-example` app.

```
cd apps/browser-example
npm run start
```


To to run the `nodejs-example` app.

```
cd apps/nodejs-example
npm run start
```

To Test the packages in one shot!
```
npm run test
```

Note: no bundler has been used to bundle the packages native tsc used to compile the packages! 


