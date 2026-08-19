(function () {
  var DEFAULT_LOCALE = 'es';
  var SUPPORTED = ['es', 'en', 'pt', 'fr', 'de'];

  var dict = {
    es: {
      nav_essays: 'Ensayos',
      nav_about: 'Sobre',
      theme_toggle: 'Cambiar tema',
      featured_label: 'Destacado',
      all_texts: 'Todos los textos',
      likes_aria: 'Me gusta',
      share_label: 'Compartir',
      reading_time: '{n} min de lectura',
      updated_label: 'Actualizado',
      back_all_posts: '← Todos los artículos',
      empty_state: 'Pronto habrá artículos aquí.',
      not_found_title: 'Página no encontrada',
      back_home: '← Volver al inicio',
    },
    en: {
      nav_essays: 'Essays',
      nav_about: 'About',
      theme_toggle: 'Toggle theme',
      featured_label: 'Featured',
      all_texts: 'All essays',
      likes_aria: 'Like',
      share_label: 'Share',
      reading_time: '{n} min read',
      updated_label: 'Updated',
      back_all_posts: '← All posts',
      empty_state: 'New posts coming soon.',
      not_found_title: 'Page not found',
      back_home: '← Back to home',
    },
    pt: {
      nav_essays: 'Ensaios',
      nav_about: 'Sobre',
      theme_toggle: 'Alternar tema',
      featured_label: 'Destaque',
      all_texts: 'Todos os textos',
      likes_aria: 'Curtir',
      share_label: 'Compartilhar',
      reading_time: '{n} min de leitura',
      updated_label: 'Atualizado',
      back_all_posts: '← Todos os artigos',
      empty_state: 'Em breve novos artigos.',
      not_found_title: 'Página não encontrada',
      back_home: '← Voltar ao início',
    },
    fr: {
      nav_essays: 'Essais',
      nav_about: 'À propos',
      theme_toggle: 'Changer de thème',
      featured_label: 'À la une',
      all_texts: 'Tous les textes',
      likes_aria: "J'aime",
      share_label: 'Partager',
      reading_time: '{n} min de lecture',
      updated_label: 'Mis à jour',
      back_all_posts: '← Tous les articles',
      empty_state: 'De nouveaux articles arrivent bientôt.',
      not_found_title: 'Page introuvable',
      back_home: "← Retour à l'accueil",
    },
    de: {
      nav_essays: 'Essays',
      nav_about: 'Über mich',
      theme_toggle: 'Design wechseln',
      featured_label: 'Hervorgehoben',
      all_texts: 'Alle Texte',
      likes_aria: 'Gefällt mir',
      share_label: 'Teilen',
      reading_time: '{n} Min. Lesezeit',
      updated_label: 'Aktualisiert',
      back_all_posts: '← Alle Beiträge',
      empty_state: 'Bald gibt es neue Beiträge.',
      not_found_title: 'Seite nicht gefunden',
      back_home: '← Zurück zur Startseite',
    },
  };

  var dateOptsLong = { year: 'numeric', month: 'long', day: 'numeric' };
  var dateOptsShort = { month: 'short', day: 'numeric', year: 'numeric' };

  function detectLocale() {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || DEFAULT_LOCALE];
    for (var i = 0; i < langs.length; i++) {
      var base = String(langs[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(base) !== -1) return base;
    }
    return DEFAULT_LOCALE;
  }

  var locale = detectLocale();
  if (locale === DEFAULT_LOCALE) return; // Already rendered in the default language, nothing to do

  var t = dict[locale] || dict[DEFAULT_LOCALE];
  document.documentElement.lang = locale;

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = t[key];
      if (value == null) return;
      var count = el.getAttribute('data-i18n-count');
      el.textContent = count != null ? value.replace('{n}', count) : value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key] != null) el.setAttribute('aria-label', t[key]);
    });

    document.querySelectorAll('time[datetime]').forEach(function (el) {
      var iso = el.getAttribute('datetime');
      var opts = el.hasAttribute('data-date-short') ? dateOptsShort : dateOptsLong;
      try {
        el.textContent = new Intl.DateTimeFormat(locale, opts).format(new Date(iso));
      } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
