# Hedgehog Practice

A simple project to practice with AngularJS and Socket.IO.

## Requirements

1. NodeJS - [http://nodejs.org](http://nodejs.org)
2. Grunt - `npm install -g grunt-cli`
3. Node-Dev = `npm install -g node-dev`

## Get Started

1. Clone the Repo

``` sh
git clone https://github.com/twilson63/hedgehog-practice.git
```

2. cd into app

``` sh
cd hedgehog-practice
```

3. npm install

``` sh
npm install
```

4. run grunt

``` sh
grunt concat
```

5. run grunt watch

``` sh
grunt watch
```

6. run node-dev in new terminal

```
node-dev app.js
```

7. open browser and editer

8. add search form template

* Open `public/app/tpls/index.html`

``` html
<form class="form-search">
  <div class="input-append">
    <input class="search-query" type="text" ng-model="query">
    <button class="btn" ng-click="search()">
      <i class="icon-bolt"></i>
    </button>
  </div>
</form>
```

9. add search form client code

* Open `public/app/controllers/index.js`

``` js
$scope.search = function() {
  socket.emit('search', $scope.query, function(res) {
    $scope.hogs = res.responseData.results;
  });
};
```

10. add search form server code

* Open `/app.js`

``` js
socket.on('search', function (q, fn) {
  request('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&' +
   'q=HedgeHog+' + q,
    {json: true},
    function(e,r,b) { fn(b); }
  );
});
```

11. add results and select template

* Open `public/app/tpls/index.html`

``` html
<li ng-repeat="hog in hogs" >
  <a href="#" ng-click="select(hog)">
  <div class="media">
    <div class="chevron pull-right">
      <i class="icon-chevron-right"></i>
    </div>
    <div class="pull-left">
      <img class="media-object" style="" ng-src="{{hog.tbUrl}}" />
    </div>
    <div class="media-body">
      <h4><div ng-bind-html-unsafe="hog.title"></div></h4>
    </div>
  </div>
  </a>
</li>
```

12. Add select client code

* Open `public/app/controllers/index.js`

``` js
$scope.select = function(hog) {
  $scope.selected = hog.url;
};

```

13. Add submit template

* Open `public/app/tpls/index.html`

``` html

<div class="row">
  <img ng-src="{{selected}}"></img>
</div>
<div class="row">
<button 
  style="margin-top: 20px;"
  class="btn pull-right" 
  ng-show="selected"
  ng-click="submit()">Submit</button>
</div>

```

14. Add submit client code

* Open `public/app/controllers/index.js`

``` js
$scope.submit = function() {
  socket.emit('submit', $scope.selected);
  $location.path('/vote');
};

```

15. Add submit server code

* Open `/app.js`

``` js
socket.on('submit', function(url) {
  db.put(uuid.v1(), JSON.stringify({url: url, votes: 0}));
  io.sockets.emit('addHog', url);
});

```

16. Add vote template 

* Open `/app/tpls/vote.html`

``` html
<div class="span2" ng-repeat="hog in hogs">
  <a href="#" ng-click="vote(hog)">
    <img 
      style="height: 120px; width: 120px;"
      ng-src="{{hog.url}}" 
     />
  </a>
</div>

```

17. Add Vote Client Code

* open `/public/app/controllers/vote.js`

``` js
$scope.hogs = [];
socket.on('addHog', function(hog) {
  $scope.hogs.push(hog);
});
socket.emit('hogs');
$scope.vote = function(hog) {
  socket.emit('vote', hog);
  $location.path('/leaders');
};
```

18. Add vote server side code

``` js
socket.on('vote', function(hog) {
  db.put(hog.id, JSON.stringify({
    url: hog.url, 
    votes: hog.votes + 1
  }));
});
```

19. Add leaders template 

* Open `/public/app/tpls/leaders.html`

``` html
<div class="span2" ng-repeat="hog in hogs | orderBy: '-votes'">
  <a href="#" ng-click="vote(hog)">
    <img 
      style="height: 120px; width: 120px;"
      ng-src="{{hog.url}}" 
     />
  </a>
  <div style="padding: 30px;font-size: 3em;font-weight: bold;">{{hog.votes}}</div>
</div>
```

20. Add leaders client code

* open `/public/app/controllers/leaders`

``` js
$scope.hogs = [];
// insert leaders code here
socket.on('addHog', function(hog) {
  $scope.hogs.push(hog);
});
socket.emit('hogs');
```

## Complete

Now you should have a simple hedgehog voting app.

## Errors

If you find any errors or typos, please submit issue and I will fix

Thanks