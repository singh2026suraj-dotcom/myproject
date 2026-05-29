(function () {
  function normalizePath(path) {
    const p = (path || "/").replace(/\/+$/, "");
    return p || "/";
  }

  function linkMatchesRoute(link, route) {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return false;
    try {
      return normalizePath(new URL(href, location.origin).pathname) === route;
    } catch {
      return false;
    }
  }

  function updateNavRoute() {
    const route = normalizePath(location.pathname);
    document.body.dataset.route = route;

    document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
      link.classList.toggle("nav-route-current", linkMatchesRoute(link, route));
    });
  }

  function patchHistory(method) {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      updateNavRoute();
      return result;
    };
  }

  patchHistory("pushState");
  patchHistory("replaceState");
  window.addEventListener("popstate", updateNavRoute);
  window.addEventListener("hashchange", updateNavRoute);
  document.addEventListener("DOMContentLoaded", updateNavRoute);
  window.addEventListener("load", updateNavRoute);

  var root = document.getElementById("root");
  if (root) {
    new MutationObserver(updateNavRoute).observe(root, {
      childList: true,
      subtree: true,
    });
  }

  updateNavRoute();
})();
