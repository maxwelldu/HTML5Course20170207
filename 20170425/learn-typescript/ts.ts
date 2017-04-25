var color:string = 'green';
// color = 3;
console.log(color);

var num:number = 100;
// num = "str";
var isRight:boolean = true;
// isRight = 1;
var num:any = "green";
num = 3;
var arr:number[] = [234,123];
// arr.push("str");
var arr:any[] = ['red', 123];
arr.push(true);
console.log(arr);

enum Color {
    red,
    green,
    blue
}
console.log(Color[1]);
console.log(Color['blue']);
console.log(Color.red);
// console.log(Color.white);

enum Sex {
    female,
    male
}

function add(num1: number, num2?: number, num3?: number):number{
    // return "str";
    // return true;
    if (num2) {
        return num1 + num2;
    } else {
        return num1 + 1;
    }
}
console.log(add(1));//2
console.log(add(1,2));//3
console.log(add(1,2,3));//3

class Book {
    static color:string;
    static num:number = 100;
    title: string;
    abc: string;
    say: any;
    constructor(title:string){
        this.title = title;
        this.abc = 'abc';
        this.say = function say():void{}
    }
    getTitle():string{
        return this.title;
    }
    static sayHello():string{
        return 'hello';
    }
}
console.log(Book.num);
Book.sayHello();
var book = new Book('book');
console.log(book.abc);

class JsBook extends Book {
    num:number = 200;
    price:number;
    constructor(title:string, price:number) {
        super(title);
        this.price = price;
    }
    getTitle():string{
        return 'success';
    }
    getColor():string{
        return 'red';
    }
}

var jsbook = new JsBook('typescript', 89);
console.log(jsbook.num);
console.log(jsbook.getTitle());


interface LabelledValue {
    label: string;
    size?: number;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
var myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

interface SearchFunc {
    (source: string, subString: string): boolean;
}
var mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    var result = source.search(subString);
    return result > -1;
    // return 1;
    // return "str";
    // return true;
}
console.log(mySearch("hello world", "world"));
