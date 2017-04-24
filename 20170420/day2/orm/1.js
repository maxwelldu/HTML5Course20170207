/**
 * Created by sks on 2017/4/20.
 */

var orm = require("orm");

orm.connect("mysql://root:@localhost/web6cms", function (err, db) {
  if (err) throw err;

  var Person = db.define("person", {
    name      : String,
    surname   : String,
    age       : Number, // FLOAT
    male      : Boolean,
    continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
    photo     : Buffer, // BLOB/BINARY
    data      : Object // JSON encoded
  }, {
    methods: {
      fullName: function () {
        return this.name + ' ' + this.surname;
      }
    },
    validations: {
      age: orm.enforce.ranges.number(18, undefined, "under-age")
    }
  });

  // add the table to the database
  db.sync(function(err) {
    if (err) throw err;

    // add a row to the person table
    Person.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
      if (err) throw err;

      // query the person table by surname
      Person.find({ surname: "Doe" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
        if (err) throw err;

        console.log("People found: %d", people.length);
        console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

        people[0].age = 16;
        people[0].save(function (err) {
          // err.msg = "under-age";
        });
      });

    });
  });
});