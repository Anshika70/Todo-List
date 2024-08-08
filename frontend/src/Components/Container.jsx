import BlurBox from './BlurBox';
import style from './Container.module.css'
function Container(){
    return <div className={style.container}>
        <BlurBox></BlurBox> 
    </div>
}
export default Container;