import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewSmall = ({ stars, reviews }) => {
  return (
    <div className="container d-flex align-items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <span key={index}>
            {stars >= ratingValue ? (
              <FontAwesomeIcon icon={faStar} color="#ffc107" />
            ) : stars >= ratingValue - 0.5 ? (
              <FontAwesomeIcon icon={faStarHalfAlt} color="#ffc107" />
            ) : (
              <FontAwesomeIcon icon={faStar} color="#e4e5e9" />
            )}
          </span>
        );
      })} 
      {reviews != null && <span className="ms-2">({reviews} comentarios)</span>}
    </div>
  );
};

export default ReviewSmall;