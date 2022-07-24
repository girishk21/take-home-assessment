
function FeedUi({feedData}){
    return(
        <div>
            
            {feedData.map((feed)=>(
                <div className="feed">
                <div className="single-feed" key={feed.id}>
                    <div className="image-title">
                    <div className="image-container">
                        <img src={feed.avatar}></img>
                    </div>
                    <div className="title">{feed.title}</div>
                    </div>
                    <div className="body">
                        <p>{feed.post}</p>
                    </div>
                    <div className="author">Created By {feed.user} on {feed.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
                </div>
                </div>
            ))}
            </div>
        
    )
}

export default FeedUi