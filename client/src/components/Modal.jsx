import { useEffect } from "react";
import styled from "styled-components";

const StyledModal = styled.div`
    position: absolute;
    display: ${props => props.active ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & .content {
        padding: 10px;
        height: 50%;
        width: 50%;
        background: #000;
        color: #fff;
    }
`

export default function Modal({active, onClose, data}, props) {


    return <StyledModal {...props} active={active} onClick={onClose}>

        <div className="content">

            <ul>
                {
                    data && data.map((user) => <li key={user.number}>
                            {user.name}
                        </li>)
                }
            </ul>
        </div>

    </StyledModal>
}