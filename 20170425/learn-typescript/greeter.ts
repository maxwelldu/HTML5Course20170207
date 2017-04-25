class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
    hello() {
      return "<h2>Hello</h2>";
    }
};

var greeter = new Greeter("Hello, world!");

document.body.innerHTML = greeter.hello();
