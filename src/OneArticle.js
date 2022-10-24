import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import Loading from './components/Loading';
import Error from './components/Error';
import NoData from './components/NoData'

function OneArticle(){

    const { id } = useParams()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(Boolean)
    const [error, setError] = useState(Boolean)

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
        .then(response => response.json())
        .then(actualData => {
            setData(actualData)
            setLoading(false)
            setError(false)
        })
        .catch(err => {
            setLoading(false)
            setError(true)
        })
    },[id])

    if(loading === true){
        return <Loading/>
    }
    if(error === true){
        return <Error/>
    }
    if(data.length === 0){
        return <NoData/>
    }
    else{
        return(
            <div className='articlePageContainer'>
                <div className='articlePage'>
                    <h1>{data.title}</h1>
                    <div className='articleDescription'>
                        <img alt='article' src={data.imageUrl}/>
                        <div className='articleInfo'>
                            <div className='newsSite'>
                                <strong>News site: </strong>{data.newsSite}
                            </div>
                            <div className="datesInfo">
                                <div className='articlePublishedAt'>
                                    <strong>Published at: </strong>{new Date(data.publishedAt).toLocaleString()}
                                </div>
                                <div className='articleUpdatedAt'>
                                    <strong>Last update: </strong>{new Date(data.updatedAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='articleSummary'>
                        <strong>Summary: </strong>{data.summary}
                    </div>
                    <div className='articleLink'>
                        <strong>Link to article: </strong>
                        <a href={data.url}>{data.url}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default OneArticle