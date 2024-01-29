import React from 'react'

function Movie ({data}) {
    return (
        <>
        <div className="movie-main">

            <div className="img-set">
                <img src={data?.img} alt="" />
            </div>

            <div className="text-set">
                <div className="overview">
                    <h2>Overview</h2>
                    <p>{data?.text}</p>
                    <button className="btn-play">
                      <a href={data?.link} target="/"> Play Now</a>
                    </button>
                </div>

                <div className="title">
                    <p>{data?.id}</p>
                </div>
                
            </div>

        </div>
        </>
    )
}

export default Movie;
