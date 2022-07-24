import { useState } from "react"
import FeedUi from "./feed_ui"
import useFetch from "./useEffect"
import ClipLoader from "react-spinners/ClipLoader";
const Home = () => {
    const [pageNo,setPageNo] = useState(1)
    const { data: feedData,isPending,error } = useFetch('http://localhost:8080/api/posts?page='+pageNo+'&num=5')

    const nextPage = ()=>{
        setPageNo(pageNo+1)
        Home
    }
    const prevPage = ()=>{
        setPageNo(pageNo-1)
        Home
    }
    return (
      <div className="home">
        
        {isPending?(<ClipLoader color="F03B14" loading={isPending} size={30} />)
        :(<div>
        { error && <div>{ error }</div> }
        { feedData && <FeedUi feedData={feedData.results} /> }
        <div className="page-buttons">
        {feedData && <button className="prevButton" onClick={prevPage} disabled={pageNo===1}>Prev</button>}
        { feedData && <button className="nextButton" onClick={nextPage}  disabled={!feedData.hasNext}>Next</button>}
        </div></div>)}
    </div>
    )
}

export default Home