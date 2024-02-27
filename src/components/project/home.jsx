import Details from "./details";
import Students from "./students";
import Tasks from "./task";
import Comment from "./comment"
export default function Home(){
    document.title = 'Project';
    return(
        <>
        <Details/>
        <Students/>
        <Tasks />
        <Comment />
        </>
    )
}
                