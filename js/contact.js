(() => {
  const consentStorageKey = 'hyperalis_scheduling_cookie_consent_v1';
  const cookieBanner = document.getElementById('cookie-banner');
  const meetingsContainer = document.querySelector('.meetings-iframe-container');
  let calendarLoaded = false;

  if (!cookieBanner || !meetingsContainer) {
    return;
  }

  const hideBanner = () => {
    cookieBanner.setAttribute('hidden', '');
  };

  const showBanner = () => {
    cookieBanner.removeAttribute('hidden');
  };

  const setConsent = (value) => {
    try {
      localStorage.setItem(consentStorageKey, value);
    } catch (error) {
      // Ignore storage errors in private mode or restricted browsers.
    }
  };

  const getStoredConsent = () => {
    try {
      return localStorage.getItem(consentStorageKey);
    } catch (error) {
      return null;
    }
  };

  const loadBookingCalendar = () => {
    if (calendarLoaded) {
      return;
    }

    calendarLoaded = true;

    if (meetingsContainer.dataset.cookieSrc) {
      meetingsContainer.innerHTML = '';
      meetingsContainer.dataset.src = meetingsContainer.dataset.cookieSrc;
    }

    const meetingsScript = document.createElement('script');
    meetingsScript.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    meetingsScript.async = true;
    document.body.appendChild(meetingsScript);
  };

  const storedConsent = getStoredConsent();

  if (storedConsent === 'accept') {
    loadBookingCalendar();
  } else if (storedConsent === 'reject') {
    hideBanner();
  } else {
    showBanner();
  }

  cookieBanner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cookie-action]');
    if (!button) {
      return;
    }

    const action = button.getAttribute('data-cookie-action');

    if (action === 'accept') {
      setConsent('accept');
      loadBookingCalendar();
    }

    if (action === 'reject') {
      setConsent('reject');
    }

    hideBanner();
  });
})();
