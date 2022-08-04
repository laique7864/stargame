import { useState } from "react"
import { colors, utils } from "./Utils"


export const PlayNumber = (props) => {
    const onNumberClick = () => {
        props.onNumberClick(props.item, props.status)
    }
    return (

        <button style={{ backgroundColor: colors[props.status] }}
            className="number" onClick={onNumberClick} >{props.item}</button>

    )

}



