import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthContext } from '@/contexts/AuthContext'
import { Eye, EyeOff, Loader2, BadgeCheck, Wallet, Chrome } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface LoginFormProps {
  onSwitchToSignup: () => void
  onSuccess: () => void
}

export function LoginForm({ onSwitchToSignup, onSuccess }: LoginFormProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  
  const { signIn } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        onSuccess()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleProvider = (provider: string) => {
    setError('')
    setOauthLoading(provider)
  }

  const allDisabled = loading || !!oauthLoading

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('auth.signin.title')}</CardTitle>
        <CardDescription className="text-center">
          {t('auth.signin.desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={allDisabled}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password.placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={allDisabled}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={allDisabled}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={allDisabled}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('auth.signingIn')}
              </>
            ) : (
              t('auth.signin')
            )}
          </Button>
        </form>

        {/* Social / External providers */}
        <div className="my-6">
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-xs text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* BankID pill */}
          <Button 
            className="w-full h-14 rounded-full bg-[#2E0A46] hover:bg-[#3a1662] text-white text-base font-medium justify-center"
            onClick={() => handleProvider('BankID')} 
            disabled={allDisabled}
          >
            {oauthLoading === 'BankID' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Logg inn med BankID</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-3">
                <svg
                  width="30"
                  height="20"
                  viewBox="0 0 30 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-white"
                >
                  <rect x="2" y="2" width="9" height="4" rx="2" fill="currentColor" />
                  <rect x="19" y="2" width="9" height="4" rx="2" fill="currentColor" />
                  <rect x="2" y="8" width="9" height="4" rx="2" fill="currentColor" />
                  <rect x="13.5" y="8" width="9" height="4" rx="2" fill="currentColor" />
                  <rect x="2" y="14" width="9" height="4" rx="2" fill="currentColor" />
                  <rect x="19" y="14" width="9" height="4" rx="2" fill="currentColor" />
                </svg>
                <span>Logg inn med BankID</span>
              </div>
            )}
          </Button>

          {/* Vipps pill */}
          <Button 
            className="w-full h-14 rounded-full bg-[#FF5B24] hover:bg-[#ff6a39] text-white text-base font-medium justify-center"
            onClick={() => handleProvider('Vipps')} 
            disabled={allDisabled}
          >
            {oauthLoading === 'Vipps' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Log in with vipps</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span className="sr-only">Log in with Vipps</span>
                <span className="flex items-center gap-2" aria-hidden="true">
                  <span>Log in with</span>
                  <span className="flex items-center">
                    <span className="lowercase font-semibold">v</span>
                    <svg className="mx-1" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3" cy="3" r="2" fill="currentColor" />
                      <path d="M1 9 C 6 13, 16 13, 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                    <span className="lowercase font-semibold">pps</span>
                  </span>
                </span>
              </div>
            )}
          </Button>

          {/* Google button - styled close to Google's guidelines */}
          <Button 
            className="w-full h-14 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm justify-center"
            onClick={() => handleProvider('Google')} 
            disabled={allDisabled}
          >
            {oauthLoading === 'Google' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Sign in with Google</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"/>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.285 16.108 18.771 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.191-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.62-3.317-11.283-7.955l-6.5 5.02C9.518 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.261 4.166-3.994 5.565l.003-.002 6.191 5.238C35.258 41.803 40 38 42.871 32.871 44.211 30.279 45 27.24 45 24c0-1.341-.138-2.651-.389-3.917z"/>
                  </svg>
                </span>
                <span>Sign in with Google</span>
              </div>
            )}
          </Button>
        </div>
        
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">{t('auth.noAccount')}</span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-800 font-medium"
            disabled={allDisabled}
          >
            {t('auth.signup')}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
