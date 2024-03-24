import { useState, createContext } from 'react'
import { User } from 'src/types/user.type'
import { clearLS, getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  loadingPage: boolean
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  handleLogout: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  loadingPage: false,
  setLoadingPage: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  handleLogout: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [loadingPage, setLoadingPage] = useState<boolean>(initialAppContext.loadingPage)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
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
        handleLogout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
