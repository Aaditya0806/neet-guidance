jQuery(document).ready(function ($) {

  $(document).on('click', ".mobile_toggle_trigger.et_pb_button", function (event) {
    $('#divi_filter').slideToggle();
  });


  if ($("#divi_filter").length > 0) {
    $("#divi_filter").find('.mobile_toggle_trigger.sticky-toggle').click(function () {
      $(this).closest('#divi_filter').toggleClass('toggle_open');
    });

  }

  $(document.body).on('click', '.bc-link-whole-grid-card', function (t) {
    var $target = $(t.target)
    $newtab = $target.closest(".et_pb_de_mach_archive_loop");


    if (!$target.hasClass('ajax_add_to_cart')) {
      var url = $(this).data("link-url");
      if ($newtab.hasClass("link_whole_new_tab")) {
        window.open(
          url,
          '_blank'
        );
      } else {
        window.location.href = url;
      }
    }
  });



  if ($('.mobile_toggle_trigger').length > 0) {
    $('.mobile_toggle_trigger').closest('.et_pb_column').css('z-index', '20');
  }


  $(".divi-filer-toggle .et_pb_contact_field_options_title ").click(function (e) {

    if ($(this).closest(".et_pb_de_mach_search_posts_item").hasClass("visible")) {
      $(".et_pb_de_mach_search_posts_item").removeClass("visible");
    } else {
      $(".et_pb_de_mach_search_posts_item").removeClass("visible");
      $(this).closest(".et_pb_de_mach_search_posts_item").addClass("visible");
    }

  });

  // look for filter_var and check enable this option in the filter
  var post_var = $('.divi-filter-archive-loop.main-loop').attr("data-filter-var");

  if (typeof (post_var) != 'undefined') {
    var dataObj = JSON.parse(post_var);
    if (typeof (dataObj.meta_query) != 'undefined') {
      // console.log(dataObj.meta_query);
      jQuery.each(dataObj.meta_query, function (index, val) {

        if ( val.key == '_weight' ){
          val.key = 'product_weight';
        } else if ( val.key == '_wc_average_rating') {
          val.key = 'product_rating';
        }
        if (jQuery('[name="' + val.key + '"]').closest(".et_pb_de_mach_search_posts_item").hasClass("filter_params")) {
          if (jQuery('[name="' + val.key + '"]').closest(".et_pb_de_mach_search_posts_item").hasClass("filter_params_yes_title")) {
            var filter_param_type = "title";
          } else {
            var filter_param_type = "no-title";
          }

          var type = jQuery('[name="' + val.key + '"]').attr("data-field_type"),
            slug = $('[name="' + val.key + '"]').attr("name"),
            name = jQuery('[name="' + val.key + '"]').closest(".et_pb_de_mach_search_posts_item").find(".et_pb_contact_field_options_title ").html(),
            iris_to = jQuery('[name="' + val.key + '"]').closest(".et_pb_de_mach_search_posts_item").find(".irs-to").text(),
            irs_from = jQuery('[name="' + val.key + '"]').closest(".et_pb_de_mach_search_posts_item").find(".irs-from").text();

          if (type == "select") {
            var value = jQuery('[name="' + val.key + '"]').find('option:selected').text();
            divi_filter_params(type, slug, value, name, filter_param_type, iris_to, irs_from);
          } else if (type == "radio") {
            jQuery('[name="' + val.key + '"]:checked').each(function () {
              var value = jQuery(this).parent().find('.radio-label').attr('title');
              divi_filter_params(type, slug, value, name, filter_param_type, iris_to, irs_from);
            });
          } else {
            var value = jQuery('[name="' + val.key + '"]').val();
            divi_filter_params(type, slug, value, name, filter_param_type, iris_to, irs_from);
          }
        }
      });
    }

    if (typeof (dataObj.tax_query) != 'undefined') {
      // console.log(dataObj.meta_query);
      jQuery.each(dataObj.tax_query, function (index, val) {


        if (jQuery('[name="' + val.taxonomy + '"]').length > 0 && jQuery('[name="' + val.taxonomy + '"]').eq(0).closest(".et_pb_de_mach_search_posts_item").hasClass("filter_params")) {
          if (jQuery('input[name="' + val.taxonomy + '"]').eq(0).closest(".et_pb_de_mach_search_posts_item").hasClass("filter_params_yes_title")) {
            var filter_param_type = "title";
          } else {
            var filter_param_type = "no-title";
          }
          var type = jQuery('[name="' + val.taxonomy + '"]').eq(0).attr("data-field_type"),
            name = jQuery('[name="' + val.taxonomy + '"]').eq(0).closest(".et_pb_de_mach_search_posts_item").find(".et_pb_contact_field_options_title ").html(),
            iris_to = jQuery('[name="' + val.taxonomy + '"]').eq(0).closest(".et_pb_de_mach_search_posts_item").find(".irs-to").text(),
            irs_from = jQuery('[name="' + val.taxonomy + '"]').eq(0).closest(".et_pb_de_mach_search_posts_item").find(".irs-from").text();;

          if (type == "select") {
            var value = jQuery('[name="' + val.taxonomy + '"]').find('option:selected').text();
            divi_filter_params(type, val.taxonomy, value, name, filter_param_type, iris_to, irs_from);
          } else if (type == "radio") {
            jQuery('[name="' + val.taxonomy + '"]:checked').each(function () {
              var value = jQuery(this).parent().find('.radio-label').attr('title');
              divi_filter_params(type, val.taxonomy, value, name, filter_param_type, iris_to, irs_from);
            });
          } else {
            var value = jQuery('[name="' + val.taxonomy + '"]').val();
            divi_filter_params(type, val.taxonomy, value, name, filter_param_type, iris_to, irs_from);
          }
        }
      });

    }
  }

  show_filter_counts();

  show_hide_reset();

  // same_height_cards();
  // Check radio filters and show filter count options
  //show_filter_counts();

  $('.reset-filters').click(function (event) {
    event.preventDefault();

    if ($(".js-range-slider").length) {

      $('.js-range-slider').each(function (i, obj) {
        var $slider = $(this);
        var slider_instance = $slider.data("ionRangeSlider");
        slider_instance.options.to = slider_instance.options.max;
        slider_instance.reset();
      });
    }

    $(".et_pb_contact_field_radio").removeClass("hidethis");
    $(this).closest('#divi_filter').find("input[type=text], textarea").val("");
    $(this).closest('#divi_filter').find('.et_pb_contact_select').prop('selectedIndex', 0);
    $(this).closest('#divi_filter').find('.et_pb_contact_field_radio input').prop('checked', false);
    $(this).closest('#divi_filter').find('.et_pb_contact_field_radio input[value=""]').prop('checked', true);

    $(this).closest('#divi_filter').find('.et_pb_contact_field_options_wrapper').each(function (i, obj) {
      if ($(this).find('label[data-value="all"]').length) {
        $(this).find('label[data-value="all"]').closest('.et_pb_contact_field_radio').find('input').prop('checked', true);
      }
    });
    $('.filter-param-item').remove();


    var oldURL = document.location.href;
    var index = 0;
    var newURL = oldURL;
    index = oldURL.indexOf('?');
    if (index == -1) {
      index = oldURL.indexOf('');
    }
    if (index != -1) {
      newURL = oldURL.substring(0, index);
    }
    window.history.replaceState(null, null, newURL);

    divi_find_filters_to_filter();

  });

  if (jQuery('.divi-filter-archive-loop.main-loop').length > 0 && "1" == filter_ajax_object.ajax_pagination) {
    jQuery('.woocommerce-ordering').submit(function () {
      return false;
    });
  }

  if (jQuery('.orderby').length > 0) {
    var sortorder = jQuery('.orderby').val();
    var sortasc = 'desc';

    if (sortorder == 'price') {
      sortasc = 'asc';
    }

    if (Array.isArray(sortorder.split('-'))) {
      var split_sort = sortorder.split('-');
      sortorder = split_sort[0];
      sortasc = split_sort[1];
    }

    jQuery('.orderby').closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-sortorder", sortorder);
    jQuery('.orderby').closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-sortasc", sortasc);
    jQuery('.orderby').closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-orderbyvalue", jQuery('.orderby').val());
  }
});

jQuery(document).on('click', 'a.page-numbers', function (e) {
  if (jQuery('.divi-filter-archive-loop.main-loop').length > 0 && "1" == filter_ajax_object.ajax_pagination) {
    e.preventDefault();
    e.stopPropagation();

    var current_page = parseInt(jQuery(this).closest('ul').find('.current').text());
    var new_page = current_page;
    if (jQuery(this).hasClass('next')) {
      new_page = current_page + 1;
    } else if (jQuery(this).hasClass('prev')) {
      new_page = current_page - 1;
    } else {
      new_page = parseInt(jQuery(this).text());
    }

    divi_append_url('page', new_page);

    jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr('data-current-page', new_page);
    //jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-pagechanged", 'true');

    divi_find_filters_to_filter();
  }else{
    e.preventDefault();
    e.stopPropagation();
    var current_page = parseInt(jQuery(this).closest('ul').find('.current').text());
    var new_page = current_page;
    if (jQuery(this).hasClass('next')) {
      new_page = current_page + 1;
    } else if (jQuery(this).hasClass('prev')) {
      new_page = current_page - 1;
    } else {
      new_page = parseInt(jQuery(this).text());
    }

    divi_append_url('page', new_page);
    window.location.reload();
  }
});

jQuery(document).on('change', '.orderby', function (e) {
  if (jQuery('.divi-filter-archive-loop.main-loop').length > 0 && "1" == filter_ajax_object.ajax_pagination) {
    e.preventDefault();
    e.stopPropagation();

    var sortorder = jQuery(this).val();
    var sortasc = 'desc';

    if (sortorder == 'price') {
      sortasc = 'asc';
    }

    if (Array.isArray(sortorder.split('-'))) {
      var split_sort = sortorder.split('-');
      sortorder = split_sort[0];
      sortasc = split_sort[1];
    }

    divi_append_url('orderby', jQuery(this).val());

    jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-sortorder", sortorder);
    jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-sortasc", sortasc);
    jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-orderbyvalue", jQuery(this).val());
    jQuery(this).closest('.et_pb_module').find('.divi-filter-archive-loop.main-loop').attr("data-pagechanged", 'true');

    divi_find_filters_to_filter();
  } else {
    jQuery(this).closest('form').submit();
  }
});

jQuery(".radio-label").click(function () {

  var radiobutton_val = jQuery(this).attr("data-value"),
    parent = jQuery(this).closest(".et_pb_contact_field_options_list");
  parent.find('input[type="radio"]').prop("checked", false);
  parent.find('input[value="' + radiobutton_val + '"]').trigger("click");

});

function divi_append_url(filter_item_name, filter_item_val) {
  var url = document.location.href;

  filter_item_val = encodeURIComponent(filter_item_val);
  if (window.location.href.indexOf('?') == -1) {
    // if no parameters set
    if (filter_item_val != '') {
      window.history.replaceState(null, null, url + "?filter=true&" + filter_item_name + "=" + filter_item_val);
    }
  } else {

    if (window.location.search.indexOf('?filter') == -1) {
      newurl = url.replace('?', '?filter=true&');
      url = newurl;
      window.history.replaceState(null, null, newurl);
    }
    // set paramater
    if (window.location.search.indexOf('&' + filter_item_name) > -1) {
      // if already set

      var stringToGoIntoTheRegex = filter_item_name;
      var regex = new RegExp("([?&]" + stringToGoIntoTheRegex + ")=([^#&]*)", "g");

      var newurl = '';

      if (filter_item_val != '') {
        newurl = url.replace(regex, '$1=' + filter_item_val);
        window.history.replaceState(null, null, newurl);
      } else {
        newurl = url.replace(regex, '');
        window.history.replaceState(null, null, newurl);
      }

    } else {

      if (filter_item_val != '') {
        window.history.replaceState(null, null, url + "&" + filter_item_name + "=" + filter_item_val);
      }
    }
  }
};

function divi_filter_params(type, slug, value, name, filter_param_type, iris_to, irs_from) {

  var addTag = false;
  if (jQuery('.divi-filter-item[data-filter-option="' + slug + '"]').hasClass('divi-checkboxmulti')) {
    if (jQuery('.param-' + slug + '[data-value="' + value + '"]').length) {
      jQuery('.param-' + slug + '[data-value="' + value + '"]').remove();
    } else {
      addTag = true;
    }
  } else {
    if (jQuery('.param-' + slug).length) {
      jQuery('.param-' + slug).remove();
    }

    if (jQuery('.param-' + slug + '[data-value="' + value + '"]').length == 0) {
      addTag = true;
    }
  }

  if (addTag == true && value !== "") {
    if (value !== "All") {
      if (type == "range") {
        value = irs_from + ' - ' + iris_to;
      }

      if (filter_param_type == "title") {
        var tag = '<p class="filter-param-item param-' + slug + '" data-filter="' + slug + '" data-type="' + type + '" data-value="' + value + '">' + name + ': ' + value + '<span class="remove-filter"></span></p>';
      } else {
        var tag = '<p class="filter-param-item param-' + slug + '" data-filter="' + slug + '" data-type="' + type + '" data-value="' + value + '">' + value + '<span class="remove-filter"></span></p>';
      }
      jQuery('.filter-param-tags').append(tag);
    }
  }
}

/*function divi_filter_params_array(type_arr, slug_arr, value_arr, name_arr, filter_param_type_arr, iris_to_arr, irs_from_arr) {

  var len = type_arr.length;
  var data = []
  for (var x = 0; x < len; x++) {
    var element = {
      "type_arr": type_arr[x],
      "slug_arr": slug_arr[x],
      "value_arr": value_arr[x],
      "name_arr": name_arr[x],
      "filter_param_type_arr": filter_param_type_arr[x],
      "iris_to_arr": iris_to_arr[x],
      "irs_from_arr": irs_from_arr[x]
    };
    data.push(element);
  }

}*/

function divi_filter_params_array(type_arr, slug_arr, value_arr, name_arr, filter_param_type_arr, iris_to_arr, irs_from_arr) {

  var len = type_arr.length;
  var data = []
  for (var x = 0; x < len; x++) {
    var element = {
      "type_arr": type_arr[x],
      "slug_arr": slug_arr[x],
      "value_arr": value_arr[x],
      "name_arr": name_arr[x],
      "filter_param_type_arr": filter_param_type_arr[x],
      "iris_to_arr": iris_to_arr[x],
      "irs_from_arr": irs_from_arr[x]
    };
    data.push(element);
  }

  jQuery.each(data, function (i, item) {
    var type = item.type_arr,
      slug = item.slug_arr,
      value = item.value_arr,
      name = item.name_arr,
      filter_param_type = item.filter_param_type_arr,
      iris_to = item.iris_to_arr,
      irs_from = item.irs_from_arr;

    divi_filter_params(type, slug, value, name, filter_param_type, iris_to, irs_from)

  });

}

jQuery(document).on('click', '.remove-filter', function () {

  var filter = jQuery(this).closest(".filter-param-item").attr("data-filter"),
    type = jQuery(this).closest(".filter-param-item").attr("data-type"),
    value = jQuery(this).closest(".filter-param-item").attr("data-value"),
    text = jQuery(this).closest(".filter-param-item").text();

  if (type == "radio") {

    if (jQuery('.divi-filter-item[data-filter-option="' + filter + '"]').hasClass('divi-checkboxmulti')) {
      jQuery('.divi-filter-item[data-filter-option="' + filter + '"]').find('.radio-label[title="' + value + '"]').parent().find('input').prop('checked', false);
    } else {
      jQuery('.et_pb_contact_field_radio input[name="' + filter + '"]').prop('checked', false);
      jQuery('.et_pb_contact_field_radio input[name="' + filter + '"][value=""]').prop('checked', true);
    }
  } else if (type == "range") {
    var $slider = jQuery('.js-range-slider[name="' + filter + '"]');
    var slider_instance = $slider.data("ionRangeSlider");
    slider_instance.options.from = slider_instance.options.min;
    slider_instance.options.to = slider_instance.options.max;
    slider_instance.reset();
  } else if (type == "select") {
    jQuery('.et_pb_contact_select[name="' + filter + '"]').prop('selectedIndex', 0);
  }

  jQuery(this).closest(".filter-param-item").remove();
  divi_find_filters_to_filter();

});

function divi_find_filters_to_filter() {
  var filter_item_name_arr = [];
  var filter_item_id_arr = [];
  var filter_item_val_arr = [];
  var filter_input_type_arr = [];
  var filter_value_exist = false;
  jQuery('.et_pb_de_mach_filter_posts').each(function () {
    if (jQuery(this).width() > 0) {
      jQuery(this).find('.divi-acf').each(function (i, obj) {
        var filter_checked = false;

        var filter_input_type = jQuery(this).closest('.et_pb_contact').find('.et_pb_contact_field').data('type');

        if (jQuery(this).attr('data-filtertype') == 'divi-checkboxsingle') {
          if (!jQuery(this).is("select")) {

            var parent = jQuery(this).closest(".et_pb_contact_field_options_list");
            var checked = parent.find("input:checked");

            if (checked.length > 0) {
              var filter_item_name = checked.attr("name"),
                filter_item_id = checked.attr("id"),
                filter_item_val = checked.val(),
                filter_checked = true;
            }

          } else {
            var filter_item_name = jQuery(this).attr("name"),
              filter_item_id = jQuery(this).attr("id"),
              filter_item_val = jQuery(this).val(),
              filter_checked = true;
          }

        } else if (jQuery(this).attr('data-filtertype') == 'divi-checkboxmulti') {

          var parent = jQuery(this).closest(".et_pb_contact_field_options_list");
          var checked = parent.find("input:checked");
          var checked_arr = [];
          checked.each(function () {
            checked_arr.push(jQuery(this).val());
          });

          var filter_item_name = jQuery(this).attr("name"),
            filter_item_id = jQuery(this).attr("id"),
            filter_item_val = checked_arr.join(','),
            filter_checked = true;

          if (filter_item_name_arr.indexOf(filter_item_name) != -1) {
            filter_checked = false;
          }


        } else {
          var filter_item_name = jQuery(this).attr("name"),
            filter_item_id = jQuery(this).attr("id"),
            filter_item_val = jQuery(this).val(),
            filter_checked = true;
        }

        if (filter_checked == true) {
          if (filter_item_name_arr.indexOf(filter_item_name) == -1) {
            filter_item_name_arr.push(filter_item_name);
            filter_item_id_arr.push(filter_item_id);
            filter_item_val_arr.push(filter_item_val);
            filter_input_type_arr.push(filter_input_type);
          }

          if (filter_item_val != '') {
            filter_value_exist = true;
          }

          divi_append_url(filter_item_name, filter_item_val);
        }

      });
    }
  });

  if (window.location.search.indexOf("?filter") > -1 && (window.location.search.indexOf("&page") > -1 || window.location.search.indexOf("&orderby") > -1)) {
    filter_value_exist = true;
  }

  if (filter_value_exist == false) {
    var url = document.location.href;
    newurl = url.replace('?filter=true', '');
    window.history.replaceState(null, null, newurl);
  }

  show_hide_reset();

  divi_filter_posts(filter_item_name_arr, filter_item_id_arr, filter_item_val_arr, filter_input_type_arr);
}

function divi_filter_posts(filter_item_name_arr, filter_item_id_arr, filter_item_val_arr, filter_input_type_arr) {
  var $main_filtered_posts = jQuery(".divi-filter-archive-loop.main-loop"),
    layoutid = $main_filtered_posts.attr("data-layoutid"),
    noresults = $main_filtered_posts.attr("data-noresults"),
    sortorder = $main_filtered_posts.attr("data-sortorder"),
    orderby_value = $main_filtered_posts.attr("data-orderbyvalue"),
    sorttype = $main_filtered_posts.attr("data-sorttype"),
    sortasc = $main_filtered_posts.attr("data-sortasc"),
    gridstyle = $main_filtered_posts.attr("data-gridstyle"),
    columnscount = $main_filtered_posts.attr("data-columnscount"),
    postnumber = $main_filtered_posts.attr("data-postnumber"),
    loadmore = $main_filtered_posts.attr("data-loadmore"),
    loadmoretext = $main_filtered_posts.attr("data-btntext"),
    loadmoretextloading = $main_filtered_posts.attr("data-btntext_loading"),
    resultcount = $main_filtered_posts.attr("data-resultcount"),
    countposition = $main_filtered_posts.attr("data-countposition"),
    search = $main_filtered_posts.attr("data-search"),
    sortchanged = $main_filtered_posts.attr("data-sortchanged"),
    include_cats = $main_filtered_posts.attr("data-include_category"),
    include_tags = $main_filtered_posts.attr("data-include_tag"),
    exclude_cats = $main_filtered_posts.attr("data-exclude_category"),
    //pagechanged = $main_filtered_posts.attr("data-pagechanged"),
    category_currently_in = $main_filtered_posts.attr("data-current_category"),
    current_custom_category = $main_filtered_posts.attr("data-current_custom_category"),
    current_custom_category_terms = $main_filtered_posts.attr("data-current_custom_category_terms"),
    current_author = $main_filtered_posts.attr("data-current_author"),
    has_map = $main_filtered_posts.attr("data-has-map"),
    map_selector = $main_filtered_posts.attr("data-map-selector"),
    marker_layout = $main_filtered_posts.attr("data-map-marker-layout"),
    loop_current_page = $main_filtered_posts.attr("data-current-page"),
    loadmore_icon = $main_filtered_posts.find(".divi-loadmore").attr("data-icon"),
    link_wholegrid = $main_filtered_posts.attr("data-link_wholegrid");
  var data_fields = [];

  var filter_item_name_arr_string = filter_item_name_arr.join(", "),
    filter_item_id_arr_string = filter_item_id_arr.join(", "),
    filter_item_val_arr_string = filter_item_val_arr.join(", "),
    filter_input_type_arr_string = filter_input_type_arr.join(", ");

  // GET FILTER VALUES
  $num = 0;
  var added_filter_items = [];
  jQuery('.divi-acf').each(function (i, obj) {

    var filter_item_name = jQuery(this).attr("name"),
      filter_item_val = jQuery(this).val(),
      input_type = jQuery(this).attr('data-filtertype'),
      acf_type = jQuery(this).closest('.et_pb_contact').find('.et_pb_contact_field').data('type');

    //////////////// CHECKBOX
    if (input_type == "divi-checkboxsingle" || input_type == "divi-checkboxmulti") {

      if (jQuery(this).is('select')) {
        if (filter_item_val != "") {
          data_fields.push({
            fieldList: [{
              name: filter_item_name,
              val: filter_item_val,
              type: "radio",
              acf_type: acf_type
            }]
          });
        }
      } else {
        var parent = jQuery(this).closest(".et_pb_contact_field_options_list");
        var checked = parent.find("input:checked");
        var checked_arr = [];
        checked.each(function () {
          checked_arr.push(jQuery(this).val());
        });

        filter_item_val = checked_arr.join(",");

        if (added_filter_items.indexOf(filter_item_name) == -1 && filter_item_val != '') {
          data_fields.push({
            fieldList: [{
              name: filter_item_name,
              val: filter_item_val,
              type: "radio",
              acf_type: acf_type
            }]
          });
        }
      }
    } else if (input_type == "rangeslider") {

      // check if item is empty first
      if (filter_item_val != "") {
        data_fields.push({
          fieldList: [{
            name: filter_item_name,
            val: filter_item_val,
            type: "range",
            acf_type: acf_type
          }]
        });
      }
    } else if (input_type == "customtaxonomy") {
      if (filter_item_val != "") {
        data_fields.push({
          fieldList: [{
            name: filter_item_name,
            val: filter_item_val,
            type: "customtaxonomy",
            acf_type: acf_type
          }]
        });
      }
    } else if (input_type == "acfselectmulitple") {
      if (filter_item_val != "") {
        data_fields.push({
          fieldList: [{
            name: filter_item_name,
            val: filter_item_val,
            type: "acfselectmulitple",
            acf_type: acf_type
          }]
        });
      }
    } else {

      // check if item is empty first
      if (filter_item_val != "") {
        data_fields.push({
          fieldList: [{
            name: filter_item_name,
            val: filter_item_val,
            type: "other",
            acf_type: acf_type
          }]
        });
      }
    }

    if (added_filter_items.indexOf(filter_item_name) == -1) {
      added_filter_items.push(filter_item_name);
    }
  });

  if (search != '') {
    data_fields.push({
      fieldList: [{
        name: 's',
        val: search,
        type: "search"
      }]
    });
  }

  var current_page = 1;

  if (loadmore == 'on') {
    //postnumber = parseInt(postnumber) * parseInt(loop_current_page);
  } else {
    current_page = parseInt(loop_current_page);
  }
  $main_filtered_posts.removeAttr("data-sortchanged");

  var $loop_module = jQuery('.divi-filter-archive-loop.main-loop'),
    post_var = $loop_module.attr("data-filter-var");

  data = {
    'action': 'divi_filter_ajax_handler',
    'layoutid': layoutid,
    'noresults': noresults,
    'filter_item_name': filter_item_name_arr_string,
    'filter_item_id': filter_item_id_arr_string,
    'filter_item_val': filter_item_val_arr_string,
    'filter_input_type': filter_input_type_arr_string,
    'orderby_param': orderby_value,
    'sortorder': sortorder,
    'sortasc': sortasc,
    'gridstyle': gridstyle,
    'columnscount': columnscount,
    'postnumber': postnumber,
    'loadmore': loadmore,
    'loadmoretext': loadmoretext,
    'include_cats': include_cats,
    'include_tags': include_tags,
    'exclude_cats': exclude_cats,
    'resultcount': resultcount,
    'countposition': countposition,
    'loadmoretextloading': loadmoretextloading,
    'has_map': has_map,
    'map_selector': map_selector,
    'marker_layout': marker_layout,
    'current_page': current_page,
    'query': post_var,
    'loadmore_icon': loadmore_icon,
    'link_wholegrid': link_wholegrid,
    data_fields
  };

  if (layoutid == 'none') {
    data.show_rating = $main_filtered_posts.attr('data-show_rating');
    data.show_price = $main_filtered_posts.attr('data-show_price');
    data.show_excerpt = $main_filtered_posts.attr('data-show_excerpt');
    data.show_add_to_cart = $main_filtered_posts.attr('data-show_add_to_cart');
  }

  jQuery.ajax({
    url: filter_ajax_object.ajax_url,
    data: data,
    type: 'POST',
    beforeSend: function (xhr) {
      // $main_filtered_posts.prepend('<div class="ajax-loading"><div class="spinner donut-cont"></div></div>');
      $main_filtered_posts.closest('.filtered-posts-cont').find('.filtered-posts-loading').prepend('<div class="ajax-loading"><div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div></div><div class="spinner donut-cont"><div class="donut"></div></div><div class="spinner donutmulti-cont"><div class="donut multi"></div></div><div class="spinner ripple-cont"><div class="ripple"></div></div></div>');
      jQuery('.divi-acf').attr('disabled', 'disabled');
      jQuery('.et_pb_de_mach_search_posts_item').animate({ "opacity": .5 }, 250);
    },
    success: function (data) {
      if (data) {
        // var newurl_correct = data.newurl.replace('%5B0%5D','')
        // window.history.pushState("", "", newurl_correct);
        jQuery('.divi-acf').removeAttr('disabled');
        jQuery('.et_pb_de_mach_search_posts_item').animate({ "opacity": 1 }, 250);
        if ($main_filtered_posts.find('.loop-grid').length > 0 || $main_filtered_posts.find('.no-results-layout').length > 0) {
          $main_filtered_posts.find('.loop-grid').remove();
          $main_filtered_posts.find('.no-results-layout').remove();
          $main_filtered_posts.append(data.posts);
        } else if ($main_filtered_posts.find('ul').length > 0) {
          $main_filtered_posts.find('ul').html(data.posts);
        }
        $main_filtered_posts.find('.df-inner-styles').remove();
        $main_filtered_posts.append(data.css_output);

        $main_filtered_posts.attr('data-current-page', data.loadmore_param.current_page);

        if (data.loadmore_param.current_page == 1) {
          $main_filtered_posts.attr('data-max-page', data.loadmore_param.max_num_pages);
        }

        $main_filtered_posts.removeClass('has-result').removeClass('no-results-layout').addClass(data.filter_result);

        if (data.before_shop_loop) {
          jQuery('.filter-param-tags').prevAll().remove();
          jQuery('.filter-param-tags').before(data.before_shop_loop);
        }

        if (typeof data.after_shop_loop != 'undefined') {
          $main_filtered_posts.closest('.filtered-posts-cont').nextAll().remove();
          $main_filtered_posts.closest('.filtered-posts-cont').after(data.after_shop_loop);
        }

        if (data.loadmore_param.current_page == 1) {
          $main_filtered_posts.attr('data-max-page', data.loadmore_param.max_num_pages);
        }

        $main_filtered_posts.attr('data-filter-var', data.loadmore_param.post_var);

        if ("undefined" != typeof wc_add_to_cart_variation_params) {
          jQuery(".variations_form").each(function () {
            jQuery(this).wc_variation_form();
          })
        }

        jQuery(".single_add_to_cart_button").addClass("ajax_add_to_cart");

        if ("undefined" != typeof ajax_disabled_products_class) {
          $("." + ajax_disabled_products_class + " .single_add_to_cart_button").removeClass("ajax_add_to_cart");
        }

        //resizeAllGridItems();
        //show_filter_counts();
        // same_height_cards();

        if (data.map_data && jQuery(map_selector).length > 0) {
          jQuery(map_selector).each(function () {
            var _this = jQuery(this);
            _this.find('.et_pb_map_pin').remove();
            jQuery.each(data.map_data, function (ind, map) {
              _this.append('<div class="et_pb_map_pin" data-lat="' + map.lat + '" data-lng="' + map.lng + '" data-title="' + map.title + '"><div class="infowindow">' + map.infoview + '</div></div>');
            });
            et_pb_map_init(_this);
          });
        }
      } else {
        $main_filtered_posts.html('No posts found.');
      }
      $main_filtered_posts.closest('.filtered-posts-cont').find('.ajax-loading').remove();

      var filter_settings = jQuery('#divi_filter').attr('data-settings');
      var dataObj = JSON.parse(filter_settings);

      var scrollto = dataObj.scrollto,
        scrollto_where = dataObj.scrollto_where,
        scrollto_section = dataObj.scrollto_section,
        scrollto_fine_tune = dataObj.scrollto_fine_tune;


      if (scrollto == 'on') {
        if (scrollto_where == 'all') {
          breakpoint = '5000';
          min_breakpoint = '0';
        } else if (scrollto_where == 'desktop') {
          breakpoint = '5000';
          min_breakpoint = '981';
        } else if (scrollto_where == 'tab_mob') {
          breakpoint = '980';
          min_breakpoint = '0';
        } else {
          breakpoint = '767';
          min_breakpoint = '0';
        }
        if (jQuery(window).width() > min_breakpoint && jQuery(window).width() <= breakpoint) {
          $scrolltosection = $main_filtered_posts.closest('.' + scrollto_section);

          scrollto_fine_tune = scrollto_fine_tune.replace('px', '');
          if (scrollto_fine_tune.match("^-")) {
            scrollto_fine_tune = scrollto_fine_tune.replace('-', '');
            scrollto_fine_tune_dis = scrollto_fine_tune;
            jQuery('html, body').animate({
              scrollTop: $scrolltosection.offset().top - scrollto_fine_tune_dis
            }, 500);
          } else {
            scrollto_fine_tune_dis = scrollto_fine_tune;
            jQuery('html, body').animate({
              scrollTop: $scrolltosection.offset().top + scrollto_fine_tune_dis
            }, 500);
          }

        }
      }

    }
  });
  return false;
}

function divi_remove_filters() {
  jQuery(".et_pb_contact_field_radio").removeClass("hidethis");

  jQuery('.refine-filters > span').each(function () {

    var filter_item_name = jQuery(this).attr("data-filter-name"),
      filter_item_val = jQuery(this).attr("data-filter-val");
    var filter_item_val_array = filter_item_val.split(",");

    var counts = {};

    jQuery.each(filter_item_val_array, function (key, value) {
      if (!counts.hasOwnProperty(value)) {
        counts[value] = 1;
      } else {
        counts[value]++;
      }
    });

    //  jQuery.each(counts , function(index, val) {
    //    jQuery('input[name="'+filter_item_name+'"][value="'+index+'"] .et_pb_contact_field_radio').remove(".divi_filter_count");
    //
    //    jQuery('input[name="'+filter_item_name+'"][value="'+index+'"]').each(function(){
    //
    //      var self = jQuery(this);
    //        if (self.closest(".et_pb_contact_field_radio").find(".divi_filter_count").length) {
    //        self.closest(".et_pb_contact_field_radio").find(".divi_filter_count").remove();
    //        jQuery(this).closest(".et_pb_contact_field_radio").append('<span class="divi_filter_count">('+ val + ')</span>');
    //      } else {
    //        jQuery(this).closest(".et_pb_contact_field_radio").append('<span class="divi_filter_count">('+ val + ')</span>');
    //      }
    //    });
    //  });

    jQuery('input[name="' + filter_item_name + '"]').each(function () {

      if (filter_item_val_array.indexOf(jQuery(this).val()) > -1) {
      } else {
        jQuery(this).closest(".et_pb_contact_field_radio").addClass("hidethis");
      }
    });

  });
}

function show_hide_reset() {
  var is_filter_selected = false;
  jQuery('.search_filter_cont').each(function() {
    var dataType = jQuery(this).find('.et_pb_contact_field').attr('data-type');
    switch (dataType) {
      case 'select':
        if ( jQuery(this).find('.et_pb_contact_field select').eq(0).val() != '' )
          is_filter_selected = true;
        break;
      case 'checkbox':
        jQuery(this).find('.et_pb_contact_field_options_list').find('input').each(function(){
          if ( jQuery(this).val() != '' && jQuery(this).is(':checked')){
            is_filter_selected = true;
          }
        });
        break;
      case 'range':
        var rangeData = jQuery(this).find(".js-range-slider").data("ionRangeSlider");
        if ( typeof(rangeData) !== 'undefined' ){
          if ( rangeData.options.min != rangeData.result.from || rangeData.options.max != rangeData.result.to ) {
            is_filter_selected = true;
          }
        }
        break;
    }
  });

  if ( is_filter_selected ){
    jQuery('#divi_filter').find('.reset-filters').show();
  }else{
    jQuery('#divi_filter').find('.reset-filters').hide();
  }
}

function show_filter_counts() {
  var filter_count_options = [];
  var filter_types = [];
  jQuery('.search_filter_cont').each(function () {
    if (jQuery(this).find('.et_pb_contact_field[data-filtertype="radio"]').length > 0) {
      var $option_list = jQuery(this).find('.et_pb_contact_field_options_list');
      if ($option_list.attr('data-filter-count') == 'on') {
        filter_count_options.push($option_list.attr('data-filter-option'));
        if ($option_list.hasClass('dmach-checkboxmulti')) {
          filter_types.push('multi');
        } else {
          filter_types.push('single');
        }
      }
    }
  });

  if (filter_count_options.length > 0) {
    var $module_featured_posts = jQuery('.divi-filter-archive-loop.main-loop'),
      post_var = $module_featured_posts.attr("data-filter-var");

    var data = {
      'action': 'divi_filter_get_count_ajax_handler',
      'query': post_var,
      'filters': filter_count_options.join(','),
      'filter_types': filter_types.join(',')
    };

    jQuery.ajax({
      url: filter_ajax_object.ajax_url, // AJAX handler
      data: data,
      type: 'POST',
      dataType: 'JSON',
      success: function (data) {
        jQuery('.search_filter_cont').each(function () {
          if (jQuery(this).find('.et_pb_contact_field[data-filtertype="radio"]').length > 0) {
            var $option_list = jQuery(this).find('.et_pb_contact_field_options_list');
            if ($option_list.attr('data-filter-count') == 'on') {
              var filter_option = $option_list.attr('data-filter-option');
              $option_list.find('span.et_pb_contact_field_radio').each(function () {
                var data_val = jQuery(this).find('label.radio-label').attr('data-value');
                if (typeof data[filter_option][data_val] != 'undefined') {
                  jQuery(this).removeClass('empty');
                  if (data[filter_option][data_val] == '0') {
                    jQuery(this).addClass('empty');
                  }
                  if (jQuery(this).find('label.radio-count').length > 0) {
                    jQuery(this).find('label.radio-count').html(data[filter_option][data_val]);
                  } else {
                    jQuery(this).append('<label class="radio-count">' + data[filter_option][data_val] + '</label>');
                  }
                } else {
                  jQuery(this).addClass('empty');
                }
              });
            }
          }
        });
      }
    });
  }
}



// function colcade_itmes() {
//  jQuery('.filtered-posts').masonry({
//  columnWidth : '.grid-sizer',
//   itemSelector: '.grid-item',
//     gutter : 15,
//     percentPosition : 'true',
//     fitWidth: true
// });
//  // jQuery('.filtered-posts').masonry('layout');
// }
