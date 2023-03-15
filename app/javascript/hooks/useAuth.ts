import { useQuery } from '@tanstack/react-query'
import { checkAuthenticationQuery } from '../queries/auth'
import { CHECK_AUTHENTICATION_QUERY } from '../constants/query'
import { useEffect, useState } from 'react'
import { AUTH_TOKEN } from '../constants/localStorage'
import { addAuthorizationHeader } from '../utils/axios'

const THIRTY_SECONDS = 30 * 1000

const useAuth = () => {
  const [_token, setToken] = useState<null | string>(null)
  useEffect(() => {
    const newToken = localStorage.getItem(AUTH_TOKEN)
    if (newToken == null) {
      return
    }
    addAuthorizationHeader(newToken)
    setToken(newToken)
  }, [])
  useQuery({
    queryKey: [CHECK_AUTHENTICATION_QUERY],
    queryFn: checkAuthenticationQuery,
    refetchOnWindowFocus: true,
    staleTime: THIRTY_SECONDS
  })
}

export default useAuth
