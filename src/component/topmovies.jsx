function TopMovie ({data}) {
    return (
        <>
        <div className="top-movie-main">

            <div className="top-img">
                <img src={data?.img} alt="" />
            </div>

            <div className="the-text">
                <h2>{data?.id}</h2>
                <p>{data?.text}</p>
                <button className="btn-play">
                   <a href={data?.link} target="/" > Play Now </a>
                </button>
            </div>

        </div>
        </>
    )
}

export default TopMovie;