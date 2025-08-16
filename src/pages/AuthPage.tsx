import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type AuthMode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleSuccess = () => {
    if (mode === 'signup') {
      // After successful signup, show a message and switch to login
      setMode('login')
      // You could show a toast notification here
    } else {
      // After successful login, redirect to dashboard
      navigate('/dashboard')
    }
  }

  const handleBackToLanding = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <Button
          variant="ghost"
          onClick={handleBackToLanding}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('auth.backHome')}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {mode === 'login' ? (
            <LoginForm
              onSwitchToSignup={() => setMode('signup')}
              onSuccess={handleSuccess}
            />
          ) : (
            <SignupForm
              onSwitchToLogin={() => setMode('login')}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
        <p>© 2024 Kryptools. {t('footer.rights')}</p>
      </div>
    </div>
  )
}
