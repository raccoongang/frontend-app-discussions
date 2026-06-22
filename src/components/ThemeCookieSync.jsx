import { useContext, useEffect, useRef } from 'react';

import { AppContext } from '@edx/frontend-platform/react';

const readThemeCookie = () => document.cookie.match(/(?:^|;\s*)theme-variant=(dark|light)/)?.[1];

/**
 * Adopt the shared cross-origin `theme-variant` cookie as the active Paragon theme
 * variant, in EVERY mode — including the in-context sidebar (embedded in the learning
 * MFE via an <iframe>), which renders no header and therefore has no <ThemeToggle/>
 * to adopt the cookie. Without this, embedded discussions always render light even
 * when the rest of the page is dark.
 *
 * It also polls the cookie (and re-checks on focus/visibility) so a theme switch made
 * in the parent window (the learning header toggle writes the shared-domain cookie)
 * propagates LIVE into this iframe — each MFE is its own origin, so frontend-platform's
 * per-origin localStorage cannot sync the choice across the iframe boundary.
 *
 * Renders nothing; safe to mount unconditionally inside AppProvider.
 */
const ThemeCookieSync = () => {
  const { paragonTheme } = useContext(AppContext);
  const setThemeVariant = paragonTheme?.setThemeVariant;
  const lastApplied = useRef(null);

  useEffect(() => {
    if (!setThemeVariant) { return undefined; }
    const apply = () => {
      const variant = readThemeCookie();
      if (variant && variant !== lastApplied.current) {
        lastApplied.current = variant;
        setThemeVariant(variant);
      }
    };
    // When embedded as a cross-origin iframe, Chrome storage partitioning can hide
    // the cookie from this frame, so the parent's header toggle also BROADCASTS the
    // new variant via postMessage — honour it for an instant live switch.
    const onMessage = (event) => {
      const variant = event?.data?.type === 'rg-theme-variant' ? event.data.variant : null;
      if ((variant === 'dark' || variant === 'light') && variant !== lastApplied.current) {
        lastApplied.current = variant;
        setThemeVariant(variant);
      }
    };
    apply();
    const intervalId = setInterval(apply, 1000);
    document.addEventListener('visibilitychange', apply);
    window.addEventListener('focus', apply);
    window.addEventListener('message', onMessage);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', apply);
      window.removeEventListener('focus', apply);
      window.removeEventListener('message', onMessage);
    };
  }, [setThemeVariant]);

  return null;
};

export default ThemeCookieSync;
