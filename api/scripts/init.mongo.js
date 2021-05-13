/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://sivapreethi:1234qwe@cluster0.6eduu.mongodb.net/products scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

// const db = require("../db");

/* global db print */
/* eslint no-restricted-globals: "off" */

db.products.remove({});
db.deleted_products.remove({});

const productsDB = [
  {
    id: 1,
    category: 'Shirts',
    productName: 'GAP',
    price: 40,
    image: 'https://www.gapfactory.com/webcontent/0020/067/474/cn20067474.jpg',
  },
  {
    id: 2,
    category: 'Jeans',
    productName: 'Levis',
    price: 50,
    image: 'https://oldnavy.gap.com/webcontent/0017/090/947/cn17090947.jpg',
  },
  {
    id: 3,
    category: 'Jackets',
    productName: 'North Face',
    price: 150,
    image: 'https://www.rei.com/media/product/1580910006',
  }];

db.products.insertMany(productsDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });

db.deleted_products.createIndex({ id: 1 }, { unique: true });

var a = db.products.findOne({id: 1});

print(a.length);

