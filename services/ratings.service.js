const statusCodes = require('../utils/constants/statusCodes');
const ratingModel = require('../models/ratingModel');

const getMovieRating = async (req, res) => {
    const { id } = req.params

    await ratingModel.find({ movieId: id },
        (err, docs) => {
            if (err) res.status(statusCodes.queryError).json({
                error: err
            });
            else res.status(statusCodes.success).json({
                ratings: docs
            });
        }
    ).clone()
        .catch(
            (err) => {
                console.log(err);
            });
}

const addMovieRating = async (req, res) => {

    let { rating, commentTitle, commentContent, userId, movieId } = req.body

    if (!rating || !commentTitle || !commentContent || !userId || !movieId) {
        res.status(statusCodes.missingParameters).json({
            message: "Missing parameters"
        });
    }
    else {
        const ratingObj = new ratingModel(req.body);

        await ratingObj.save()
        res.status(statusCodes.success).json({
            message: "Rating added",
            data: ratingObj
        });
    }
}

const editMovieRating = async (req, res) => {
    const { rating, commentTitle, commentContent } = req.body
    const { id } = req.params

    await ratingModel.findByIdAndUpdate(id,
        {
            rating: rating,
            commentTitle: commentTitle,
            commentContent: commentContent,
        },
        {
            new: true
        },
        (err, docs) => {
            if (err) res.status(statusCodes.queryError).json({
                error: err
            });
            else {
                res.status(statusCodes.success).json({
                    message: "Rating edited"
                });
            }
        }
    ).clone().catch(
        (err) => {
            console.log(err);
        });
}


const deleteMovieRating = async (req, res) => {
    const { id } = req.params

    await ratingModel.findOneAndDelete({ _id: id },
        (err, docs) => {
            if (err) res.status(statusCodes.queryError).json({
                error: err
            });
            else {
                res.status(statusCodes.success).json({
                    message: "Rating deleted"
                });
            }

        }
    ).clone().catch(
        (err) => {
            console.log(err);
        });
}

module.exports = {
    getMovieRating,
    addMovieRating,
    editMovieRating,
    deleteMovieRating
}