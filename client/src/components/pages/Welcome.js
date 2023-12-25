import homepage from '../../images/homepage.jpg'

export default function Welcome ()  {
return (
<div>
<img className="welcome"src={homepage} />
 <p className='coding'><span className='symbols-welcome'>/*</span> Coding <span className='symbols-welcome'>+</span> Continue Coding <span className='symbols-welcome'>=</span> An Expert! <span className='symbols-welcome'>*/</span></p>
</div>
)
}