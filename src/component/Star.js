import { utils } from "./Utils"
export const Star = (props) => {
    return (
        <div>
          
            {
utils.range(1,props.stars).map((item)=>{

    return(

            <div key={item} className="star" />
            )

})}

        </div>
    )
}