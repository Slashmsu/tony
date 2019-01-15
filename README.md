Example of the logistic service

###Install all dependence:

```
npm i
```

###Fixtures:
Use fixtures to add to the database Cities with Neighbors. We will need it to create shortest path from
Source City to Target City.

```
node fixtures/fixtures-create-cities.js
```

![Alt text](https://github.com/Slashmsu/tony/blob/master/graph.png?raw=true "Cities graph")

At main page we can search information about our package, by package's id!
Or create new package, choose Source City and Target City, choose Package Type,
backend will send to us route from Source City to Target City.

![Alt text](https://github.com/Slashmsu/tony/blob/master/mainPage.png?raw=true "Main Page")

After that package will be send or package will be find by id and you will be redirected to package page. Here you can see all
information about you package.
