import {articles} from "../data"
import { useLocation } from "react-router-dom";
// import SearchBar from "../SearchBar";


 export default function Posts () {
    const location = useLocation()
    const path = location.pathname.split("/")[2]

    const article = articles.find((p=>p.id.toString() === path))
    console.log(location)
    return ( 
        <div className="articles">
          <p className="articleImg">{article.image}</p> 
          <h1 className="articleTitle">{article.title}</h1>
          <p className="articlePost">{article.post}</p>
        </div>
    );
 };