jQuery(function ($) { // use jQuery code inside this to avoid "$ is not defined" error
  $(document).on('click', '.dmach-loadmore', function (e) {
    e.preventDefault();
    var $module_featured_posts = jQuery(this).parent().find('.divi-filter-archive-loop'),
      layoutid = $module_featured_posts.attr("data-layoutid"),
      posttype = $module_featured_posts.attr("data-posttype"),
      noresults = $module_featured_posts.attr("data-noresults"),
      sortorder = $module_featured_posts.attr("data-sortorder"),
      sortasc = $module_featured_posts.attr("data-sortasc"),
      gridstyle = $module_featured_posts.attr("data-gridstyle"),
      columnscount = $module_featured_posts.attr("data-columnscount"),
      postnumber = $module_featured_posts.attr("data-postnumber"),
      loadmoretext = $module_featured_posts.attr("data-btntext"),
      loadmoretextloading = $module_featured_posts.attr("data-btntext_loading"),
      resultcount = $module_featured_posts.attr("data-resultcount"),
      countposition = $module_featured_posts.attr("data-countposition"),
      module_current_page = parseInt($module_featured_posts.attr("data-current-page")),
      module_max_page = parseInt($module_featured_posts.attr("data-max-page")),
      post_var = $module_featured_posts.attr("data-filter-var"),
      loadmoretext = $module_featured_posts.attr("data-btntext"),
      loadmoretextloading = $module_featured_posts.attr("data-btntext_loading"),
      loadmore_icon = $module_featured_posts.find(".divi-loadmore").attr("data-icon"),
      link_wholegrid = $module_featured_posts.attr("data-link_wholegrid");

    var button = jQuery(this),
      data = {
        'action': 'divi_filter_loadmore_ajax_handler',
        'query': post_var,
        'page': module_current_page,
        'layoutid': layoutid,
        'posttype': posttype,
        'noresults': noresults,
        'sortorder': sortorder,
        'sortasc': sortasc,
        'gridstyle': gridstyle,
        'columnscount': columnscount,
        'resultcount': resultcount,
        'countposition': countposition,
        'postnumber': postnumber,
        'loadmoretext': loadmoretext,
        'loadmore_icon': loadmore_icon,
        'link_wholegrid': link_wholegrid
      };

    jQuery.ajax({ // you can also use $.post here
      url: loadmore_ajax_object.ajax_url, // AJAX handler
      data: data,
      type: 'POST',
      beforeSend: function (xhr) {
        button.text(loadmoretextloading); // change the button text, you can also add a preloader image
      },
      success: function (data) {
        if (data) {
          if (button.parent().find('.df-inner-styles').length > 0) {
            button.text(loadmoretext).parent().find('.df-inner-styles').eq(0).before(data.posts); // insert new posts
            button.parent().find('.df-inner-styles').eq(0).before(data.css_output);
          } else {
            button.text(loadmoretext).parent().find('.divi-filter-archive-loop').children().append(data.posts); // insert new posts
            button.text(loadmoretext).parent().find('.divi-filter-archive-loop').children().append(data.css_output);
          }

          if (data.after_post) {
            var filter_post_container = button.parent();

            if (filter_post_container.find('.divi-filter-result-count').length > 0) {
              filter_post_container.find('.divi-filter-result-count').remove();
            }

            button.remove();

            filter_post_container.append(data.after_post);
          }

          $module_featured_posts.attr("data-current-page", module_current_page + 1);

          resizeAllGridItems();
          //show_filter_counts();
          get_post_popup();
          // same_height_cards();

          if ($module_featured_posts.find(".grid-col").find(".gallery_vars").length > 0) {
            var gallery_vars = $module_featured_posts.find(".grid-col").find(".gallery_vars").attr("data-gallery_vars");
            var gallery_type = $module_featured_posts.find(".grid-col").find(".gallery_vars").attr("data-gallery_type");
            gallery_vars = gallery_vars.replace(/,\s*$/, "");
            gallery_vars = gallery_vars.replace(/,/g, ", ");
            gallery_vars = gallery_vars.replace(/'/g, '"');
            gallery_vars = '{' + gallery_vars + '}';

            gallery_vars = JSON.parse(gallery_vars);

            jQuery('.et_pb_de_mach_acf_slider_containter').each(function (i, obj) {
              jQuery(this).slick('unslick');
              jQuery(this).slick(gallery_vars);
            });

            if (gallery_type == 'gallery') {
              var gallery_nav_vars = $module_featured_posts.find(".grid-col").find(".gallery_vars").attr("data-gallery_nav");
              gallery_nav_vars = gallery_nav_vars.replace(/,\s*$/, "");
              gallery_nav_vars = gallery_nav_vars.replace(/,/g, ", ");
              gallery_nav_vars = gallery_nav_vars.replace(/'/g, '"');
              gallery_nav_vars = '{' + gallery_nav_vars + '}';

              gallery_nav_vars = JSON.parse(gallery_nav_vars);
              gallery_nav_vars.asNavFor = '.et_pb_de_mach_acf_slider_containter';
              gallery_nav_vars.focusOnSelect = true;
              jQuery('.et_pb_de_mach_acf_slider_containter_nav').each(function (i, obj) {
                jQuery(this).slick('unslick');
                jQuery(this).slick(gallery_nav_vars);
              });
            }

          }


        } else {
          button.remove(); // if no data, remove the button as well
        }
      }
    });
  });
});
