import { createStitches, createTheme } from '@stitches/core'
import { Provider, SupabaseClient } from '@supabase/supabase-js'
import merge from 'deepmerge'
import React, { useEffect, useState } from 'react'
import * as defaultLocalization from '../../../common/lib/Localization'
import { I18nVariables } from '../../../common/lib/Localization'
import * as themes from '../../../common/theming/Themes'
import {
  Appearance,
  CustomTheme,
  Localization,
  RedirectTo,
  SocialLayout,
  ViewType,
} from '../../types'
import { VIEWS } from './../../constants'
import {
  EmailAuth,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
} from './interfaces'
import { UserContextProvider, useUser } from './UserContext'

export interface Props {
  supabaseClient: SupabaseClient
  children?: React.ReactNode
  // className?: string
  // style?: React.CSSProperties
  socialLayout?: SocialLayout
  providers?: Provider[]
  view?: ViewType
  redirectTo?: RedirectTo
  onlyThirdPartyProviders?: boolean
  magicLink?: boolean
  /**
   * this is for importing a custom theme
   */
  customTheme?: CustomTheme
  /**
   * This will toggle on the dark variation of the theme
   */
  dark?: boolean
  /**
   * Override the labels and button text
   */
  localization?: {
    lang?: 'en' | 'ja' // es
    variables?: I18nVariables
  }
  appearance?: Appearance
}

function Auth({
  supabaseClient,
  // style,
  socialLayout = 'vertical',
  providers,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  appearance = { theme: 'supabase' },
  dark,
  localization = { lang: 'en' },
}: Props): JSX.Element | null {
  // const merge = require('deepmerge')

  /**
   * Localization support
   */

  const i18n: Localization = merge(
    defaultLocalization[localization.lang ?? 'en'],
    localization.variables ?? {}
  )

  /**
   * Create default theme
   *
   * createStitches()
   * https://stitches.dev/docs/api#theme
   *
   * to add a new theme use  createTheme({})
   * https://stitches.dev/docs/api#theme
   */
  createStitches({
    theme: merge(
      themes[appearance.theme ?? 'supabase'],
      appearance.variables?.light ?? {}
    ),
  })

  /**
   * merge theme variables with for dark theme
   */
  const darkTheme = createTheme(
    merge(
      themes.darkThemes[appearance.theme ?? 'supabase'],
      appearance.variables?.dark ?? {}
    )
  )

  const [authView, setAuthView] = useState(view)
  const [defaultEmail, setDefaultEmail] = useState('')
  const [defaultPassword, setDefaultPassword] = useState('')

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' is used
   *
   * @returns boolean
   */
  const SignView = authView === 'sign_in' || authView === 'sign_up'

  /**
   * Wraps around all auth components
   * renders the social auth providers if SignView is true
   *
   * also handles the theme override
   *
   * @param children
   * @returns React.ReactNode
   */
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className={dark ? darkTheme : ''}>
      {SignView && (
        <SocialAuth
          appearance={appearance}
          supabaseClient={supabaseClient}
          providers={providers}
          socialLayout={socialLayout}
          redirectTo={redirectTo}
          onlyThirdPartyProviders={onlyThirdPartyProviders}
          i18n={i18n}
          view={authView}
        />
      )}
      {!onlyThirdPartyProviders && children}
    </div>
  )

  useEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    setAuthView(view)
  }, [view])

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_IN:
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            appearance={appearance}
            supabaseClient={supabaseClient}
            // @ts-expect-error
            authView={authView}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
            i18n={i18n}
          />
        </Container>
      )
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.MAGIC_LINK:
      return (
        <Container>
          <MagicLink
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            i18n={i18n}
          />
        </Container>
      )

    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            i18n={i18n}
          />
        </Container>
      )
    default:
      return null
  }
}

Auth.ForgottenPassword = ForgottenPassword
Auth.UpdatePassword = UpdatePassword
Auth.MagicLink = MagicLink
Auth.UserContextProvider = UserContextProvider
Auth.useUser = useUser

export default Auth
