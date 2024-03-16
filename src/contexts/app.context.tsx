import { useState, createContext } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  logoutFunction: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  loadingPage: false,
  setLoadingPage: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  logoutFunction: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const logoutFunction = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loadingPage,
        setLoadingPage,
        profile,
        setProfile,
        logoutFunction
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
