const mongoose = require('mongoose')
const cities = require('./cities')
const Campground = require('../models/campground')
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelpCamp')
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("Mongo connection error!")
    console.log(err)
})

// Picks a random number in an array and returns the elements at the index of that number
const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 400; i++){
        // Picks a random number to select a city
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) +10 ;
        const camp = new Campground({
            // YOUR USER ID
            author: '61a3d8c63360f7e9295a1ad3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices augue orci, sit amet consequat nisl convallis et. Nunc hendrerit condimentum hendrerit. Donec convallis, urna ac pharetra fermentum, purus nisl bibendum lorem, vel viverra urna nisi ut neque. Donec imperdiet ut sapien vel aliquam. In porta dolor maximus tempus gravida. Integer id pretium ex. Phasellus augue erat, rhoncus et rhoncus non, tincidunt vitae tellus.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
              },
            images: [
                {
                    url: 'https://res.cloudinary.com/df9vdkahc/image/upload/v1638161978/YelpCamp/mh6a7ssmqkies8ekuivz.jpg',
                    filename: 'YelpCamp/mh6a7ssmqkies8ekuivz',
                  },
                  {
                    url: 'https://res.cloudinary.com/df9vdkahc/image/upload/v1638161981/YelpCamp/wvbsxehtiesbaoo0xrwv.jpg',
                    filename: 'YelpCamp/wvbsxehtiesbaoo0xrwv',
                  },
                  {
                    url: 'https://res.cloudinary.com/df9vdkahc/image/upload/v1638161982/YelpCamp/ymzqzev8cktagsiwljcq.jpg',
                    filename: 'YelpCamp/ymzqzev8cktagsiwljcq',
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})