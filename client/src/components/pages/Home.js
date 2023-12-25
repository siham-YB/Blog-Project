// import {articles} from '../data'
// import Cards from "../Cards"
import SearchBar from '../SearchBar'


export default function Home () {

    return (
    <div className="posts">
    {/* {articles.map(article=> (
        <Cards key={article.id} article = {article} />
    ))} */}
    <SearchBar />

    

</div>
    )
}