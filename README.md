Implementation of work logistic service

###Install all dependence:

```
npm i
```

###Fixtures:
Use fixtures to add to database cities with neighbors. We will need it for create shortest path from
source city to target city.

```
node fixtures/fixtures-create-cities.js
```

![Alt text](https://github.com/Slashmsu/tony/blob/master/graph.png?raw=true "Cities graph")

At main page we can search information about our package by package's id!
Or create new package, choose source city and target city, choose package type,
backend will send to us route from source city to target city.

![Alt text](https://github.com/Slashmsu/tony/blob/master/mainPage.png?raw=true "Main Page")

After that package will be send or package will be find by id and you will be redirected to package page. Here you can see all
information about you package.
