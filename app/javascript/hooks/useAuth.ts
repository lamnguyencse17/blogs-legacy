import {useQuery} from "@tanstack/react-query";
import {checkAuthenticationQuery} from "../queries/auth";
import {CHECK_AUTHENTICATION_QUERY} from "../constants/query"

const useAuth = () => {
    useQuery({
        queryKey: [CHECK_AUTHENTICATION_QUERY],
        queryFn: checkAuthenticationQuery
    })
}

export default useAuth