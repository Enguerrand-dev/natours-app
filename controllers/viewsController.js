const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Bookings = require('../models/bookingModel');
const Booking = require('../models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) get all the tour data from collection
  const tours = await Tour.find();
  // 2) Build template
  // 3) render the template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data; for the request tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com ws://127.0.0.1:64737/"
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour
    });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Account' });
};

exports.getLogin = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:64737/"
    )
    .render('login', { title: 'login' });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  //console.log('Update data:', req.body);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account-form', {
    title: 'Your account',
    user: updatedUser
  });
});
exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});
