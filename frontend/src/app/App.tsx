import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import { routePaths } from '@/config/routes'
import { AuthProvider } from '@/features/auth/AuthProvider'
import AccountPage from '@/pages/AccountPage'
import ApplicationPage from '@/pages/ApplicationPage'
import DestinationPage from '@/pages/DestinationPage'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <RootLayout>
          <Routes>
            <Route path={routePaths.home} element={<HomePage />} />
            <Route path={routePaths.destination} element={<DestinationPage />} />
            <Route
              path={routePaths.destinationApply}
              element={<ApplicationPage />}
            />
            <Route
              path={routePaths.destinationForCitizenship}
              element={<DestinationPage />}
            />
            <Route path={routePaths.login} element={<LoginPage />} />
            <Route path={routePaths.account} element={<AccountPage />} />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}
