import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

import Loading from './components/Loading';
import Error from './components/Error';
import NoData from './components/NoData'

function App() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(Boolean)
    const [error, setError] = useState(Boolean)
    const [howMany, setHowMany] = useState(10)

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${howMany}`)
        .then(response => response.json())
        .then(actualData => {
            setData(actualData)
            setLoading(false)
            setError(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
            setError(true)
        })
    },[howMany])

    const change = (e) =>{
        setHowMany(e.target.value)
    }
    
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
            <div className='mainSite'>
                <h1>Articles</h1>
                <div className='changeHowMany'>
                    <div className='label'>Articles on page: </div>
                    <select onChange={change} value={howMany}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                    </select>
                </div>
                <div className="articlesContainer">
                    {data.map((element) => {
                        return(
                            <div className="oneArticle" key={element.id}>
                                <div className='nrArticle'>
                                    {data.indexOf(element)+1}
                                </div>
                                <Link className='imgLink' to={`/article/${element.id}`}>
                                    <img alt='article' src={element.imageUrl}/>
                                </Link>
                                <div className='articleInfo'>
                                    <Link to={`/article/${element.id}`}>
                                        <div className='articleTitle'>{element.title}</div>
                                    </Link>
                                    <div className='articlePublishedAt'>
                                        <strong>Published at: </strong>{new Date(element.publishedAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default App