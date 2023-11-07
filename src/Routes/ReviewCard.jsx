export default function ReviewCard(props)
{
    function convertMillisecondsToReadableDate(timestamp) {
        const date = new Date(timestamp);
      
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;
    
        return formattedDate;
    }

    function generateStarIcons(rating) {
        const maxRating = 5; 
        const starIcons = [];
      
        for (let i = 1; i <= maxRating; i++) {
          if (i <= rating) {
            starIcons.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
          } else if (i - rating <= 0.5) {
            starIcons.push(<i key={i} className="bi bi-star-half text-warning"></i>);
          } else {
            starIcons.push(<i key={i} className="bi bi-star text-warning"></i>);
          }
        }
      
        return starIcons;
    }

    return (
        <div key={props.id} className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="card-title star-icons">{generateStarIcons(props.rating)}</h4>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <h6 className="card-subtitle mb-2 text-muted">{props.reviewerFirstName} {props.reviewerLastName} <span className="reviewer-class">({props.reviewerClass})</span></h6>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="card-text mt-2">{props.reviewText}</p>
                        <p className="card-text review-written">{convertMillisecondsToReadableDate(props.timestamp)}</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <button id="delete" className="btn btn-secondary btn-color" onClick={() => {
                            const deletedReview = props.id;
                            props.onClick(deletedReview);
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}