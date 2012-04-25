/* Star Rating */
jQuery.fn.starRater = function(options, ratingObj){

  if (ratingObj == null) {
    ratingObj = {
      AverageRating: 0,
      AbsoluteRatingCount: 0
    };
  }
  
  var opts = jQuery.extend({}, jQuery.fn.starRater.defaults, options);
  return this.each(function(){
    var jQuerythis = jQuery(this);
    
    var jQueryon = jQuerythis.find('.ui-rater-starsOn');
    var jQueryoff = jQuerythis.find('.ui-rater-starsOff');
    if (opts.size == null) {
      opts.size = jQueryon.height();
    }
    
    var width = Math.ceil(jQueryoff.width() * (ratingObj.AverageRating / opts.units));
    jQueryon.width(width);
    jQuerythis.find('.ui-rater-rating').html(ratingObj.AverageRating.toFixed(1));
    jQuerythis.find('.ui-rater-rateCount').html(ratingObj.AbsoluteRatingCount);
    
    if (opts.enabled) {
      jQueryoff.mousemove(function(e){
        var left = e.clientX - jQueryoff.offset().left;
        var width = jQueryoff.width() - (jQueryoff.width() - left);
        width = Math.ceil(width / (opts.size / opts.step)) * opts.size / opts.step;
        jQueryon.width(width);
      }).hover(function(e){
        jQueryon.addClass('ui-rater-starsHover');
      }, function(e){
        jQueryon.removeClass('ui-rater-starsHover');
        var width = ratingObj.AverageRating * opts.size;
        jQueryon.width(width);
      }).click(function(e){
        var currentRating = Math.round(jQueryon.width() / jQueryoff.width() * (opts.units * opts.step)) / opts.step;
        jQueryoff.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave');
        jQueryoff.css('cursor', 'default');
        jQueryon.css('cursor', 'default');
        jQuery.fn.starRater.rate(jQuerythis, opts, currentRating);
      }).css('cursor', 'pointer');
      jQueryon.css('cursor', 'pointer');
    }
  });
};

jQuery.fn.starRater.defaults = {
  postHref: location.href,
  units: 5,
  enabled: true,
  method: "POST",
  count: 0,
  fadeDelay: 300,
  step: 1
};

jQuery.fn.starRater.rate = function(jQuerythis, opts, rating){

  var jQueryon = jQuerythis.find('.ui-rater-starsOn');
  var jQueryoff = jQuerythis.find('.ui-rater-starsOff');
  var jQuerycount = jQuerythis.find('.ui-rater-rateCount')
  
  //var uri = opts.onGetRatingUri(rating);
  
  jQueryoff.fadeTo(300, 0.4, function(){
  	opts.setSourceRating(opts.Id, rating, function(result){
  		if (result.Status.Error == null && result.Value.length == 1) {
          var ratingObj = result.Value[0];
          var resultRating = ratingObj.AverageRating;
          
          jQueryoff.fadeTo(300, 0.1, function(){
            jQueryon.removeClass('ui-rater-starsHover').width(resultRating * opts.size);			
            jQuerycount.text(ratingObj.AbsoluteRatingCount);
            jQuerythis.find('.ui-rater-rating').text(resultRating.toFixed(1));
            jQueryoff.fadeTo(300, 1);
            jQuerythis.attr('title', 'Your rating: ' + resultRating.toFixed(1));
          });
        }
  	});
    /*jQuery.ajax({
      url: uri,
      type: opts.method,
      success: function(result){
        if (result.Status.Error == null && result.Value.length == 1) {
          var ratingObj = result.Value[0];
          var resultRating = ratingObj.AverageRating;
          
          jQueryoff.fadeTo(300, 0.1, function(){
            jQueryon.removeClass('ui-rater-starsHover').width(resultRating * opts.size);			
            jQuerycount.text(ratingObj.AbsoluteRatingCount);
            jQuerythis.find('.ui-rater-rating').text(resultRating.toFixed(1));
            jQueryoff.fadeTo(300, 1);
            jQuerythis.attr('title', 'Your rating: ' + resultRating.toFixed(1));
          });
        }
      }
    });*/
  });
};


/* Thumb Rating */
jQuery.fn.thumbRater = function(options, ratingObj){
  var opts = jQuery.extend({}, jQuery.fn.thumbRater.defaults, options);
  
  if (ratingObj == null) {
    ratingObj = {
      PositiveRatingCount: 0,
      NegativeRatingCount: 0
    };
  }
  
  return this.each(function(){
    var jQuerythis = jQuery(this);
    
    var jQueryupItem = jQuerythis.find('a.thumbsUp');
    
    if (opts.id == undefined) 
      opts.id = jQuerythis.attr('id');
    
    if (options.enabled) {
      jQueryupItem.hover(function(e){
        jQueryupItem.addClass('thumbsUp-hover');
      }, function(e){
        jQueryupItem.removeClass('thumbsUp-hover');
      }).click(function(e){
        jQuery.fn.thumbRater.rate(jQuerythis, opts, opts.upValue);
        jQueryupItem.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave').css('cursor', 'default');
        jQuerydownItem.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave').css('cursor', 'default');
      }).css('cursor', 'pointer');
    }
    
    var jQuerydownItem = jQuerythis.find('a.thumbsDown');
    
    if (options.enabled) {
      jQuerydownItem.hover(function(e){
        jQuerydownItem.addClass('thumbsDown-hover');
      }, function(e){
        jQuerydownItem.removeClass('thumbsDown-hover');
      }).click(function(e){
        jQuery.fn.thumbRater.rate(jQuerythis, opts, opts.downValue);
        jQueryupItem.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave').css('cursor', 'default');
        jQuerydownItem.unbind('click').unbind('mousemove').unbind('mouseenter').unbind('mouseleave').css('cursor', 'default');
      }).css('cursor', 'pointer');
    }
    
    jQuery.fn.thumbRater.updateValue(jQuerythis, ratingObj, false);
    
  });
};

jQuery.fn.thumbRater.updateValue = function(jQuerythis, ratingObj, fade){

  var jQueryupItem = jQuerythis.find('a.thumbsUp');
  var jQuerydownItem = jQuerythis.find('a.thumbsDown');
  
  var finalValue = ratingObj == null ? 0 : ratingObj.PositiveRatingCount - ratingObj.NegativeRatingCount;
  
  var jQueryvalue = jQuerythis.find("span.value");
  
  if (fade) {
    jQueryvalue.fadeTo(300, 0.4, function(){
      jQuery.fn.thumbRater.updateValueControl(jQueryvalue, finalValue);
      jQueryvalue.fadeTo(300, 1);
    });
  } else {
    jQuery.fn.thumbRater.updateValueControl(jQueryvalue, finalValue);
  }
}

jQuery.fn.thumbRater.updateValueControl = function(jQuerycontrol, finalValue){
  jQuerycontrol.removeClass("valueMinus").removeClass("valuePlus").removeClass("valueZero");
  if (finalValue < 0) {
    jQuerycontrol.addClass("valuePlus");
    jQuerycontrol.text(finalValue);
  } else if (finalValue > 0) {
    jQuerycontrol.addClass("valueMinus");
    jQuerycontrol.text("+" + finalValue);
  } else {
    jQuerycontrol.addClass("valueZero");
    jQuerycontrol.text(finalValue);
  }
}

jQuery.fn.thumbRater.rate = function(jQuerythis, opts, rating){
  var jQueryupItem = jQuerythis.find('a.thumbsUp');
  var jQueryupIcon = jQueryupItem.find('span.icon');
  
  var jQuerydownItem = jQuerythis.find('a.thumbsDown');
  var jQuerydownIcon = jQuerydownItem.find('span.icon');
  
  var uri = opts.onGetRatingUri(rating);
  
  jQuery.ajax({
    url: uri,
    type: opts.method,
    success: function(result){
      if (result.Status.Error == null && result.Value.length == 1) {
        var ratingObj = result.Value[0];
        jQuery.fn.thumbRater.updateValue(jQuerythis, ratingObj, true);
      }
    }
  });
};

jQuery.fn.thumbRater.defaults = {
  postHref: location.href,
  enabled: true,
  upValue: 0,
  downValue: 0
};
