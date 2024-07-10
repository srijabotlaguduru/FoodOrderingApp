//restaurantData.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');

// Load environment variables from .env
dotenv.config();

// MongoDB connection setup for restaurant database
mongoose.connect(process.env.MONGO_URI_RESTAURANTS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const restaurantDB = mongoose.connection;
restaurantDB.on('error', console.error.bind(console, 'MongoDB connection error for restaurant database:'));
restaurantDB.once('open', async () => {
  console.log('Connected to Restaurant database');

  // Define predetermined restaurant data
  const restaurants = [
    {
      name: 'Pizza Hut',
      address: {
        latitude: 13.012590,
        longitude : 77.627450
      },
      uniqueId: 'rest1',
      mainTag: 'ITALIAN',
      tags: ['PASTA', 'PIZZA'],
    },
    {
      name: 'Pizza Hut',
      address: {
        latitude: 17.41734949328635, 
        longitude : 78.36741954467905
      },
      uniqueId: 'rest2',
      mainTag: 'ITALIAN',
      tags: ['PASTA', 'PIZZA'],
    },
    {
      name: 'Dominos',
      address: {
        latitude: 17.37052612893275,
        longitude : 78.42954664923434
      },
      uniqueId: 'rest3',
      mainTag: 'ITALIAN',
      tags: ['PASTA', 'PIZZA', 'BREAD'],
    },
    {
      name: 'Dominos',
      address: {
        latitude: 17.407858950760453, 
        longitude : 78.37589649960425
      },
      uniqueId: 'rest4',
      mainTag: 'ITALIAN',
      tags: ['PASTA', 'PIZZA', 'BREAD'],
    },
    {
      name: 'La Pinos',
      address: {
        latitude: 17.371366560184413,  
        longitude : 78.4291391550058
      },
      uniqueId: 'rest5',
      mainTag: 'ITALIAN',
      tags: ['PASTA', 'PIZZA'],
    },
    {
      name: 'Mojo Pizza',
      address: {
        latitude: 17.36505892578157,  
        longitude : 78.42626382709798 
      },
      uniqueId: 'rest6',
      mainTag: 'ITALIAN',
      tags: ['PIZZA'],
    },
    {
      name: 'Oven Story',
      address: {
        latitude: 17.356293410761374,  
        longitude : 78.42137147788046 
      },
      uniqueId: 'rest7',
      mainTag: 'ITALIAN',
      tags: ['PIZZA', 'BREAD'],
    },
    {
      name: 'Amritsar Haveli',
      address: {
        latitude:  17.374086288475166, 
        longitude : 78.43044706529237
      },
      uniqueId: 'rest8',
      mainTag: 'INDIAN',
      tags: ['NORTH INDIAN', 'INDO-CHINESE'],
    },
    {
      name: 'Pakka Local',
      address: {
        latitude:  17.42159064876658, 
        longitude : 78.44452329837965 
      },
      uniqueId: 'rest9',
      mainTag: 'INDIAN',
      tags: ['NORTH INDIAN', 'INDO-CHINESE', 'SOUTH INDIAN'],
    },
    {
      name: 'Bikanervala',
      address: {
        latitude:  17.413401122648626,  
        longitude : 78.45018812417347 
      },
      uniqueId: 'rest10',
      mainTag: 'INDIAN',
      tags: ['NORTH INDIAN', 'INDO-CHINESE'],
    },
    {
      name: 'Jewel Of Nizam',
      address: {
        latitude:  17.408651029260515, 
        longitude : 78.45413633562896 
      },
      uniqueId: 'rest11',
      mainTag: 'INDIAN',
      tags: ['NORTH INDIAN', 'INDO-CHINESE'],
    },
    {
      name: 'Ambika Tiffin Centre',
      address: {
        latitude:  17.36356721829038, 
        longitude :  78.42331880664656
      },
      uniqueId: 'rest12',
      mainTag: 'INDIAN',
      tags: ['SOUTH INDIAN'],
    },
    {
      name: 'Yashodhama Tiffins',
      address: {
        latitude:  17.365085777741665,  
        longitude : 78.42133886618159
      },
      uniqueId: 'rest13',
      mainTag: 'INDIAN',
      tags: ['SOUTH INDIAN'],
    },
    {
      name: 'Chowpati Chat',
      address: {
        latitude:  17.36716752995447,  
        longitude : 78.41692953837325 
      },
      uniqueId: 'rest14',
      mainTag: 'SNACKS',
      tags: ['INDIAN-SNACKS'],
    },
    {
      name: 'Gokul Chat',
      address: {
        latitude:  17.385179067822538,   
        longitude : 78.48592823548847 
      },
      uniqueId: 'rest15',
      mainTag: 'SNACKS',
      tags: ['INDIAN-SNACKS','SANDWICHES'],
    },
    {
      name: 'Rajashree Foods',
      address: {
        latitude:  17.394498135959058,  
        longitude : 78.3409103183256 
      },
      uniqueId: 'rest16',
      mainTag: 'SNACKS',
      tags: ['INDIAN-SNACKS', 'MOMOS', 'SANDWICHES'],
    },
    {
      name: 'Subway',
      address: {
        latitude:  17.386947310527685, 
        longitude : 78.33642029986741 
      },
      uniqueId: 'rest17',
      mainTag: 'SNACKS',
      tags: ['ROLLS', 'SANDWICHES'],
    },
    {
      name: 'Cream Stone',
      address: {
        latitude:  17.35653917865993, 
        longitude : 78.42218686948625
      },
      uniqueId: 'rest18',
      mainTag: 'DESSERTS',
      tags: ['CAKES', 'ICE-CREAM'],
    },
    {
      name: 'Baskin Robbins',
      address: {
        latitude:  17.40374096421565,
        longitude :  78.453450696243
      },
      uniqueId: 'rest19',
      mainTag: 'DESSERTS',
      tags: ['CAKES', 'ICE-CREAM'],
    },
    {
      name: 'Karachi Bakery',
      address: {
        latitude:  17.3763838414585, 
        longitude :  78.42804481268703
      },
      uniqueId: 'rest20',
      mainTag: 'DESSERTS',
      tags: ['CAKES', 'INDIAN-DESERTS'],
    },
    {
      name: 'Swiss Castle',
      address: {
        latitude:  17.38654085539341,  
        longitude :  78.42976142636333
      },
      uniqueId: 'rest21',
      mainTag: 'DESSERTS',
      tags: ['CAKES'],
    },
    {
      name: 'Pista House',
      address: {
        latitude:  17.357582331195836, 
        longitude :  78.42326506874511 
      },
      uniqueId: 'rest22',
      mainTag: 'DESSERTS',
      tags: ['INDIAN-DESERTS'],
    },
    {
      name: 'McDonalds',
      address: {
        latitude:  17.356626275103075, 
        longitude :  78.42045576818845
      },
      uniqueId: 'rest23',
      mainTag: 'OTHERS',
      tags: ['BURGERS'],
    },
    {
      name: 'Burger King',
      address: {
        latitude:  17.37415685358674, 
        longitude :  78.42921049793759
      },
      uniqueId: 'rest24',
      mainTag: 'OTHERS',
      tags: ['BURGERS'],
    },
    {
      name: 'KFC',
      address: {
        latitude:  17.356953964848184, 
        longitude :  78.42371733417343 
      },
      uniqueId: 'rest25',
      mainTag: 'OTHERS',
      tags: ['BURGERS'],
    },
    {
      name: 'Chillis',
      address: {
        latitude:  17.436155750056543, 
        longitude :  78.4476640923101
      },
      uniqueId: 'rest26',
      mainTag: 'OTHERS',
      tags: ['MEXICAN'],
    },
    {
      name: 'Taco Bell',
      address: {
        latitude:  17.445981912105267, 
        longitude :  78.44697744564624
      },
      uniqueId: 'rest27',
      mainTag: 'OTHERS',
      tags: ['MEXICAN'],
    },
    {
      name: 'Starbucks',
      address: {
        latitude:  17.436810843972644, 
        longitude :  78.44629080017572
      },
      uniqueId: 'rest28',
      mainTag: 'DRINKS',
      tags: ['TEA', 'COFFEE', 'MILKSHAKES'],
    },
    {
      name: 'Niloufer Cafe Old',
      address: {
        latitude:  17.399870387431704, 
        longitude :  78.46260871831456
      },
      uniqueId: 'rest29',
      mainTag: 'DRINKS',
      tags: ['TEA'],
    },
    {
      name: 'Dunkin Donuts',
      address: {
        latitude:  17.45541390197316, 
        longitude :  78.36284244467903 
      },
      uniqueId: 'rest30',
      mainTag: 'DRINKS',
      tags: ['COFFEE', 'MILKSHAKES'],
    },
    {
      name: 'Cafe Coffee Day',
      address: {
        latitude:  17.460326530179138,  
        longitude :  78.36438739698771
      },
      uniqueId: 'rest31',
      mainTag: 'DRINKS',
      tags: ['COFFEE', 'MILKSHAKES'],
    },
    {
      name: 'Thick Shakes',
      address: {
        latitude:  17.454922631867152, 
        longitude :  78.38378513152992
      },
      uniqueId: 'rest32',
      mainTag: 'DRINKS',
      tags: ['MILKSHAKES'],
    },
    {
      name: 'Third Wave Coffee',
      address: {
        latitude:  17.460162777934872, 
        longitude :   78.37262714279244
      },
      uniqueId: 'rest33',
      mainTag: 'DRINKS',
      tags: ['COFFEE'],
    },
  ];

  // Insert the predefined data into the restaurant collection
  try {
    await Restaurant.insertMany(restaurants);
    console.log('Restaurants have been successfully added to the database.');
  } catch (err) {
    console.error('Error adding restaurants to the database:', err);
  } finally {
    mongoose.connection.close();
  }
});
