var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return "<h1>" + this.greeting + "</h1>";
    };
    Greeter.prototype.hello = function () {
        return "<h2>Hello</h2>";
    };
    return Greeter;
}());
;
var greeter = new Greeter("Hello, world!");
document.body.innerHTML = greeter.hello();
