$( document ).ready(function() {
  console.log($('#types-hidden-tokens').text());
  $('#tokenfield').tokenfield({
    autocomplete: {
      source: ['Halal', 'Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free'],

      delay: 100
    },
    tokens: $('#types-hidden-tokens').text().split(','),
    showAutocompleteOnFocus: true
  });

  $("input[name='phone']").mask("(999) 999-9999");

  $("input[name='address'").geocomplete();
});
