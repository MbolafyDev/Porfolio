// script/script.js
$(function () {
  "use strict";

  const supportsIntersection = 'IntersectionObserver' in window;

  // --------- Animation des barres de progression ---------
  function animateProgress($bars) {
    $bars.each(function () {
      const $bar = $(this);
      const skill = parseInt($bar.data('skill') || 0, 10);
      if ($bar.hasClass('animated')) return;
      $bar.addClass('animated');
      $bar.animate({ width: skill + '%' }, 1600);
      $({ percent: 0 }).animate(
        { percent: skill },
        {
          duration: 1600,
          step: function (now) {
            $bar.text(Math.floor(now) + '%');
          },
        }
      );
    });
  }

  // --------- Apparition fluide des éléments ---------
  function animateInView($elements) {
    $elements.each(function () {
      const $el = $(this);
      if ($el.hasClass('in-view')) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        $el.addClass('in-view');
      }
    });
  }

  // --------- IntersectionObserver ---------
  if (supportsIntersection) {
    const observerOptions = { threshold: 0.2 };

    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgress($(entry.target));
          progressObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    $('.progress-bar').each(function () {
      progressObserver.observe(this);
    });

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('in-view');
          itemObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    $('.timeline-item, .project-card').each(function () {
      itemObserver.observe(this);
    });
  } 
  else {
    function onScroll() {
      animateProgress($('.progress-bar'));
      animateInView($('.timeline-item, .project-card'));
    }
    $(window).on('scroll resize', onScroll);
    onScroll();
  }

  // --------- Smooth Scroll ---------
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 60 }, 700);
    }
  });
});
