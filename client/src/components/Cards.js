import { Link } from 'react-router-dom';
export default function Cards({ article }) {
    return (
            <div className='cards'>
                <Link className='link' to={`/posts/${article.id}`}>
                    <span className='title'>{article.title}</span>
                    <p className='articleImg'>{article.image}</p>
                    <p className='description'>{article.description}</p>
                    <button className='cardButton'>Read more</button>
                </Link>
            </div>
    );
}
