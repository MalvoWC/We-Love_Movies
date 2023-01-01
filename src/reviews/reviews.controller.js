const reviewsService = require("./reviews.service");

function exists(req, res, next) {
  reviewsService
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      } else next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

function destroy(req, res, next) {
   reviewsService
    .destroy(req.params.reviewId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data
  };
  reviewsService
    .update(updatedReview, req.params.reviewId)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  destroy: [
    exists,
    destroy
  ],
  update: [
    exists,
    update,
  ],
};