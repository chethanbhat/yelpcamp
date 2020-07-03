const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
	{
		name: 'Heaven Valley',
	 	image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1140&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Valley of Heavenly Bliss'
	},
	{
		name: 'Alpine Hill',
	 	image: 'https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Tall Trees and Huge Hills'
	},
	{	
		name: 'Cloud Rest',
	 	image: 'https://images.unsplash.com/photo-1470138831303-3e77dd49163e?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Kiss the clouds'
	},
	{
		name: 'Heaven Valley',
	 	image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1140&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Valley of Heavenly Bliss'
	},
	{
		name: 'Indian Trail',
	 	image: 'https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?auto=format&fit=crop&w=979&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Live like Indians'
	},
	{
		name: 'Starnight Estate',
	 	image: 'https://images.unsplash.com/photo-1479741044197-d28c298f8c77?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Blanket of Stars'
	},
	{
		name: 'River Cradle',
	 	image: 'https://images.unsplash.com/photo-1458571037713-913d8b481dc6?auto=format&fit=crop&w=1055&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'River. Enough Said !'
	},
	{
		name: 'Red Rock Trail',
	 	image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1008&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 
	 	description: 'Rocks.. Rocks.. Rocks...'
	}
	
];

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, err => {
		if(err){
			console.log(err);
		} else {
			console.log('removed campgrounds');

			// Add Campgrounds
			data.forEach(seed => {
				Campground.create(seed, (err, campground) => {
					if(err) {
						console.log('err')
					} else {
						Comment.create(
						{
							text: 'I love nature. But I love internet more :P',
							author: 'LolGuy'

						}, (err, comment) => {
							if(err){
								console.log('err');
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log('Created new comment')
							}
						});
					} 
				});

				console.log('Added Campground');
			});
		}
	});
}

module.exports = seedDB;
