(() => {
  const consentStorageKey = 'hyperalis_contact_cookie_consent_v1';
  const cookieBanner = document.getElementById('cookie-banner');
  const meetingsContainer = document.querySelector('.meetings-iframe-container');
  const meetingsPlaceholder = document.getElementById('meetings-placeholder');
  const formPlaceholder = document.getElementById('form-placeholder');
  const formFrame = document.querySelector('.hs-form-frame');
  let embedsLoaded = false;

  if (!cookieBanner || !meetingsContainer || !formFrame) {
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

  const loadHubspotEmbeds = () => {
    if (embedsLoaded) {
      return;
    }

    embedsLoaded = true;

    if (meetingsContainer.dataset.cookieSrc) {
      meetingsContainer.innerHTML = '';
      meetingsContainer.dataset.src = meetingsContainer.dataset.cookieSrc;
    }

    meetingsPlaceholder?.setAttribute('hidden', '');
    formPlaceholder?.setAttribute('hidden', '');
    formFrame.removeAttribute('hidden');

    const meetingsScript = document.createElement('script');
    meetingsScript.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    meetingsScript.async = true;
    document.body.appendChild(meetingsScript);

    const formsScript = document.createElement('script');
    formsScript.src = 'https://js-eu1.hsforms.net/forms/embed/147404340.js';
    formsScript.defer = true;
    document.body.appendChild(formsScript);
  };

  const storedConsent = getStoredConsent();

  if (storedConsent === 'accept') {
    loadHubspotEmbeds();
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
      loadHubspotEmbeds();
    }

    if (action === 'reject') {
      setConsent('reject');
    }

    hideBanner();
  });
})();
