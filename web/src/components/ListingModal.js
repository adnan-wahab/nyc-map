function ListingModal({ object }) {
    if (!object) return null
    console.log('listing', object)
    return (
        <div className="p-5 top-10 left-10 fixed bg-white shadow text-black z-50">
            <div className="mini-bubble-details">
                <img
                    width="100px"
                    height="100px"
                    src={object.picture_url + '?im_w=1200'}
                />
                <strong>${parseInt(object.price.slice(1)) * 30}</strong>
                <div>{object.name}</div>
                <div>3 bd, 2 ba</div>
                <div>1,604 sqft</div>
                <div>Review Score: {object.review_scores_rating}</div>
                <div className="text-red-600">
                    Price is 300 over expected value!
                </div>
                <div className="text-green-600">
                    Price is 300 under expected value!
                </div>
                <a href={object.listing_url}>Link to listing</a>
            </div>
        </div>
    )
}

export default ListingModal
