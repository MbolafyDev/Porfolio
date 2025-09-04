$(document).ready(function () {
  $(".progress-bar").each(function () {
    var $bar = $(this);
    var skill = $bar.data("skill");
    $bar.animate(
      { width: skill + "%" },
      {
        duration: 1500,
        step: function (now) {
          $bar.text(Math.round(now) + "%");
        },
      }
    );
  });
});