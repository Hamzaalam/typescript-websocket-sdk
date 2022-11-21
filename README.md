# Typescript WebSocket client Sdk for both nodejs and browser

`packages` ---> contains sdk for nodejs and browser

`apps` ---> contains examples to utilize the sdk

Install the dependencies at the root of project

```
npm install
```

To run packages, comiple it using below command at the root, This will generate the both packages build files!

```
npm run build -ws
```


 To to run the `browser-example` app.

```
cd apps/browser-example
npm run start
```
example screenshot!

![Screenshot from 2022-11-21 13-07-14](https://user-images.githubusercontent.com/43663027/203049807-dbbf4916-cadc-4c34-b72e-30151f4896c2.png)


To to run the `nodejs-example` app.

```
cd apps/nodejs-example
npm run start
```
example screenshot!

![Screenshot from 2022-11-21 13-09-21](https://user-images.githubusercontent.com/43663027/203050390-9fcce71c-2452-4f47-aa46-d43cd66a4679.png)

To Test the packages in one shot!
```
npm run test
```

Note: no bundler has been used to bundle the packages native tsc used to compile the packages! 
except in the `browser-example` `parcel` has been used build it.


