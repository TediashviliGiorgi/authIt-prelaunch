import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Users, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { AccountTypeSelector } from '@/components/auth/AccountTypeSelector';
import { OrganizationTypeSelector } from '@/components/auth/OrganizationTypeSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CountryPhoneInput } from '@/components/ui/country-phone-input';
import { CountryRegionSelect } from '@/components/ui/country-region-select';
import { useAuth } from '@/hooks/useAuth';
import { Country } from '@/lib/countries';
import {
  registerStep1Schema,
  registerStep2Schema,
  INDUSTRIES,
} from '@/lib/validators';
import {
  RegisterStep1,
  RegisterStep2,
  AccountType,
  OrganizationType,
} from '@/types/auth';

export default function RegisterPage() {
  // ==========================================
  // STATE
  // ==========================================
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('GE');
  const { register: registerUser, loading } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');

  // ==========================================
  // FORMS
  // ==========================================

  // Step 1 Form - Account Type & Info
  const step1Form = useForm<RegisterStep1>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      accountType: 'company',
      country: 'GE',
      companyName: '',
      organizationName: '',
      email: '',
      phone: '',
      region: '',
      industry: '',
      address: '',
      description: '',
    },
  });

  // Step 2 Form - Password & Terms
  const step2Form = useForm<RegisterStep2>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      marketingEmails: false,
    },
  });

  // Watch account type for conditional rendering
  const accountType = step1Form.watch('accountType');
  const password = step2Form.watch('password');

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleCountryChange = (country: Country) => {
    setSelectedCountryCode(country.code);
    step1Form.setValue('country', country.code);
    step1Form.setValue('region', '');
  };

  const handleAccountTypeChange = (type: AccountType) => {
    step1Form.setValue('accountType', type);
    // Clear fields when switching
    if (type === 'company') {
      step1Form.setValue('organizationName', '');
      step1Form.setValue('organizationType', undefined);
      step1Form.setValue('description', '');
    } else {
      step1Form.setValue('companyName', '');
      step1Form.setValue('region', '');
      step1Form.setValue('industry', '');
    }
    // Clear errors
    step1Form.clearErrors();
  };

  const handleOrganizationTypeChange = (type: OrganizationType) => {
    step1Form.setValue('organizationType', type);
    step1Form.clearErrors('organizationType');
  };

  const handleStep1Submit = async () => {
    const isValid = await step1Form.trigger();
    if (isValid) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (step2Data: RegisterStep2) => {
    const step1Data = step1Form.getValues();

    const completeData = {
      // Account Type
      accountType: step1Data.accountType,

      // Common Fields
      email: step1Data.email,
      phone: step1Data.phone || undefined,
      country: step1Data.country || undefined,
      address: step1Data.address || undefined,

      // Company Fields
      companyName: step1Data.accountType === 'company' ? step1Data.companyName : undefined,
      region: step1Data.accountType === 'company' ? step1Data.region : undefined,
      industry: step1Data.accountType === 'company' ? step1Data.industry : undefined,

      // Organization Fields
      organizationName: step1Data.accountType === 'organization' ? step1Data.organizationName : undefined,
      organizationType: step1Data.accountType === 'organization' ? step1Data.organizationType : undefined,
      description: step1Data.accountType === 'organization' ? step1Data.description : undefined,

      // Password & Terms
      password: step2Data.password,
      confirmPassword: step2Data.confirmPassword,
      agreeToTerms: step2Data.agreeToTerms,
      marketingEmails: step2Data.marketingEmails || false,
      inviteToken: inviteToken || undefined,
    };

    await registerUser(completeData);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <AuthLayout>
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-lg shadow-xl border-border/50">
        {/* Header */}
        <CardHeader className="space-y-3">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-2 w-20 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-20 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              {accountType === 'company' ? (
                <Building2 className="w-6 h-6 text-primary" />
              ) : (
                <Users className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">
                {step === 1 ? t('auth.register.step1Title', 'Create Account') : t('auth.register.step2Title', 'Set Password')}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? t('auth.register.step1Desc', 'Choose account type and enter your details')
                  : t('auth.register.step2Desc', 'Create a secure password for your account')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* ==========================================
            STEP 1: Account Type & Information
            ========================================== */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleStep1Submit(); }}>
            <CardContent className="space-y-6">
              {/* Account Type Selector */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  {t('auth.register.accountType', 'Account Type')} *
                </Label>
                <AccountTypeSelector
                  value={accountType}
                  onChange={handleAccountTypeChange}
                  disabled={loading}
                />
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {accountType === 'company'
                      ? t('auth.register.companyDetails', 'Company Details')
                      : t('auth.register.organizationDetails', 'Organization Details')}
                  </span>
                </div>
              </div>

              {/* ==========================================
                  COMPANY FIELDS
                  ========================================== */}
              {accountType === 'company' && (
                <>
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      {t('auth.register.companyName', 'Company Name')} *
                    </Label>
                    <Input
                      id="companyName"
                      placeholder={t('auth.register.companyNamePlaceholder', 'Enter your company name')}
                      {...step1Form.register('companyName')}
                      disabled={loading}
                    />
                    {step1Form.formState.errors.companyName && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t('auth.register.email', 'Email Address')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.register.emailPlaceholder', 'company@example.com')}
                      {...step1Form.register('email')}
                      disabled={loading}
                    />
                    {step1Form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t('auth.register.phone', 'Phone Number')}
                    </Label>
                    <CountryPhoneInput
                      value={step1Form.watch('phone') || ''}
                      countryCode={selectedCountryCode}
                      onValueChange={(phone) => step1Form.setValue('phone', phone)}
                      onCountryChange={handleCountryChange}
                      placeholder={t('auth.register.phonePlaceholder', 'Enter phone number')}
                      disabled={loading}
                    />
                  </div>

                  {/* Country & Region */}
                  <CountryRegionSelect
                    countryCode={selectedCountryCode}
                    region={step1Form.watch('region') || ''}
                    onCountryChange={handleCountryChange}
                    onRegionChange={(region) => step1Form.setValue('region', region)}
                    countryLabel={t('auth.register.country', 'Country')}
                    regionLabel={t('auth.register.region', 'Region')}
                    countryPlaceholder={t('auth.register.selectCountry', 'Select country')}
                    regionPlaceholder={t('auth.register.selectRegion', 'Select region')}
                    disabled={loading}
                  />

                  {/* Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="industry">
                      {t('auth.register.industry', 'Industry')}
                    </Label>
                    <Select
                      onValueChange={(value) => step1Form.setValue('industry', value)}
                      disabled={loading}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder={t('auth.register.selectIndustry', 'Select industry')} />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {t('auth.register.address', 'Address')}
                    </Label>
                    <Input
                      id="address"
                      placeholder={t('auth.register.addressPlaceholder', 'Enter your address')}
                      {...step1Form.register('address')}
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              {/* ==========================================
                  ORGANIZATION FIELDS
                  ========================================== */}
              {accountType === 'organization' && (
                <>
                  {/* Organization Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      {t('auth.register.organizationType', 'Organization Type')} *
                    </Label>
                    <OrganizationTypeSelector
                      value={step1Form.watch('organizationType')}
                      onChange={handleOrganizationTypeChange}
                      disabled={loading}
                    />
                    {step1Form.formState.errors.organizationType && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.organizationType.message}
                      </p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">
                      {t('auth.register.organizationName', 'Organization Name')} *
                    </Label>
                    <Input
                      id="organizationName"
                      placeholder={t('auth.register.organizationNamePlaceholder', 'Enter organization name')}
                      {...step1Form.register('organizationName')}
                      disabled={loading}
                    />
                    {step1Form.formState.errors.organizationName && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.organizationName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t('auth.register.email', 'Email Address')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.register.emailPlaceholder', 'organization@example.com')}
                      {...step1Form.register('email')}
                      disabled={loading}
                    />
                    {step1Form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t('auth.register.phone', 'Phone Number')}
                    </Label>
                    <CountryPhoneInput
                      value={step1Form.watch('phone') || ''}
                      countryCode={selectedCountryCode}
                      onValueChange={(phone) => step1Form.setValue('phone', phone)}
                      onCountryChange={handleCountryChange}
                      placeholder={t('auth.register.phonePlaceholder', 'Enter phone number')}
                      disabled={loading}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label>{t('auth.register.country', 'Country')}</Label>
                    <CountryRegionSelect
                      countryCode={selectedCountryCode}
                      region=""
                      onCountryChange={handleCountryChange}
                      onRegionChange={() => {}}
                      countryLabel=""
                      regionLabel=""
                      countryPlaceholder={t('auth.register.selectCountry', 'Select country')}
                      regionPlaceholder=""
                      showRegion={false}
                      disabled={loading}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {t('auth.register.address', 'Address')}
                    </Label>
                    <Input
                      id="address"
                      placeholder={t('auth.register.addressPlaceholder', 'Enter your address')}
                      {...step1Form.register('address')}
                      disabled={loading}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {t('auth.register.description', 'Description')}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={t('auth.register.descriptionPlaceholder', 'Brief description of your organization...')}
                      {...step1Form.register('description')}
                      disabled={loading}
                      rows={3}
                    />
                    {step1Form.formState.errors.description && (
                      <p className="text-sm text-destructive">
                        {step1Form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {t('common.continue', 'Continue')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {t('auth.register.alreadyHaveAccount', 'Already have an account?')}{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t('auth.register.signIn', 'Sign in')}
                </Link>
              </p>
            </CardFooter>
          </form>
        )}

        {/* ==========================================
            STEP 2: Password & Terms
            ========================================== */}
        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
            <CardContent className="space-y-6">
              {/* Summary Card */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('auth.register.registeringAs', 'Registering as')}:
                </p>
                <div className="flex items-center gap-2">
                  {accountType === 'company' ? (
                    <Building2 className="w-4 h-4 text-primary" />
                  ) : (
                    <Users className="w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium">
                    {accountType === 'company'
                      ? step1Form.getValues('companyName')
                      : step1Form.getValues('organizationName')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step1Form.getValues('email')}
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  {t('auth.register.password', 'Password')} *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.register.passwordPlaceholder', 'Create a strong password')}
                    {...step2Form.register('password')}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {password && <PasswordStrengthIndicator password={password} />}
                {step2Form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {t('auth.register.confirmPassword', 'Confirm Password')} *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('auth.register.confirmPasswordPlaceholder', 'Repeat your password')}
                    {...step2Form.register('confirmPassword')}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {step2Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={step2Form.watch('agreeToTerms')}
                    onCheckedChange={(checked) =>
                      step2Form.setValue('agreeToTerms', checked as boolean)
                    }
                    disabled={loading}
                    className="mt-0.5"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="agreeToTerms" className="text-sm font-normal cursor-pointer">
                      {t('auth.register.agreeToTerms', 'I agree to the')}{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        {t('auth.register.termsOfService', 'Terms of Service')}
                      </Link>{' '}
                      {t('common.and', 'and')}{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        {t('auth.register.privacyPolicy', 'Privacy Policy')}
                      </Link>{' '}
                      *
                    </Label>
                  </div>
                </div>
                {step2Form.formState.errors.agreeToTerms && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.agreeToTerms.message}
                  </p>
                )}

                {/* Marketing Emails */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketingEmails"
                    checked={step2Form.watch('marketingEmails')}
                    onCheckedChange={(checked) =>
                      step2Form.setValue('marketingEmails', checked as boolean)
                    }
                    disabled={loading}
                    className="mt-0.5"
                  />
                  <Label htmlFor="marketingEmails" className="text-sm font-normal cursor-pointer">
                    {t('auth.register.marketingEmails', 'Send me product updates and news (optional)')}
                  </Label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('auth.register.creating', 'Creating account...')}
                  </>
                ) : (
                  t('auth.register.createAccount', 'Create Account')
                )}
              </Button>

              {/* Back Button */}
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleBackToStep1}
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back', 'Back')}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </AuthLayout>
  );
}