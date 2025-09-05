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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button variant="outline" className="w-full relative" onClick={() => handleProvider('BankID')} disabled={allDisabled}>
            {oauthLoading === 'BankID' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>BankID</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span>BankID</span>
                <BadgeCheck className="h-4 w-4 absolute right-2" />
              </div>
            )}
          </Button>
          <Button variant="outline" className="w-full relative" onClick={() => handleProvider('Vipps')} disabled={allDisabled}>
            {oauthLoading === 'Vipps' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Vipps</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span>Vipps</span>
                <Wallet className="h-4 w-4 absolute right-2" />
              </div>
            )}
          </Button>
          <Button variant="outline" className="w-full relative" onClick={() => handleProvider('Google')} disabled={allDisabled}>
            {oauthLoading === 'Google' ? (
              <div className="flex items-center justify-center w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Google</span>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span>Google</span>
                <Chrome className="h-4 w-4 absolute right-2" />
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
