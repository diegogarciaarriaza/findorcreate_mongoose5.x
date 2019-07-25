### Coming soon

This useful plugin allow you to activate the findOrCreate function for mongoose 5.x. The method will search the documments that have coincidence with your 'query' or will create it if don't exist!, And return you the new document just created or the found!

### Installation

```
npm i findorcreate_mongoose5.x
```

#### Usage

If you execute the bellow code, it will create a new register "Michael Jordan 23" into your mongo database

```
const findOrCreate = require("findorcreate_mongoose5.x")
var instance = new mongoose()

const schema = instance.Schema({
    name: String,
    surname: String,
    number: Number
});

schema.statics.findOrCreate = findOrCreate

var yourModel = instance.model('findOrCreate', schema);

yourModel.findOrCreate({name: 'Michael', surname: 'Jordan'}, {name: 'Michael', surname: 'Jordan', number: 23})
  .then((record) => {
    console.log(record.document, record.created);
})
  .catch(error) => {
    console.error(error);
});
```

If you execute again the code with other values, for example: 

```
yourModel.findOrCreate({name: 'Michael', surname: 'Jordan'}, {name: 'Michael', surname: 'Jordan', number: 00})
```

This will return "Michael Jordan 23" again because it already exists. Great!

You can use async/await too

```
try{
  let record = await yourModel.findOrCreate({name: 'Michael', surname: 'Jordan'}, {name: 'Michael', surname: 'Jordan', number: 23})
  console.log(record.document, record.created);
}
catch(error){
  console.error(error);
}
```

### Testing

```
npm test
```

### License

ISC