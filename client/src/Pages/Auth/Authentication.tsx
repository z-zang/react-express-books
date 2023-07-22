// type Props = {}
import { Outlet } from "react-router-dom"

const Authentication = () => {
    return (
        <div>Authentication Wrapper
            <Outlet />
        </div>
    )
}

export default Authentication