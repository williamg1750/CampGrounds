const express = require('express');
const router = express.router;

router.get('/', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

router.post(
  '/',
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id).populate('reviews');
    console.log(campground);
    res.render('campgrounds/show', { campground });
  })
);

router.get(
  '/:id/edit',
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
  })
);

router.put(
  '/:id',
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:id',
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  })
);

router.post(
  '/:id/reviews',
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:id/reviews/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

module.export = router;
