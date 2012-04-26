dgosocial = function () {
  // Override prototypes to fix json serialization
  delete Number.prototype.toJSON;
  delete Boolean.prototype.toJSON;
  delete String.prototype.toJSON;
  delete Array.prototype.toJSON;
  Object.toJSON = JSON2.stringify;

  if(typeof Hash == 'function') {
    Hash.prototype.toJSON = function() {
      return this.toObject();
    };

  }

  // cache duration live
  this.shortCacheDuration  =  600;   // 10 minutes
  this.mediumCacheDuration =  3600;  // 1 hour
  this.longCacheDuration   =  604800;  // 1 week

}

dgosocial.prototype.getStackTrace = function() {
  function st2(f) {
    return !f ? [] :
    st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + f.arguments.join(',') + ')']);
  }
  return st2(arguments.callee.caller);
}

dgosocial.prototype.Log = function(arg1, arg2, arg3) {
  if (window.console && window.console.firebug) {
    if (typeof arg1 != "undefined" && typeof arg2 != "undefined" && typeof arg3 != "undefined") {
      console.log(arg1, arg2, arg3);
    } else if (typeof arg1 != "undefined" && typeof arg2 != "undefined") {
      console.log(arg1, arg2);
    } else if (typeof arg1 != "undefined") {
      console.log(arg1);
    }
  }
}

/*
 * Javascript Base Classes
 */
String.prototype.ParseRfcDate = function() {
  var dateArray = this.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(([+-])(\d{2}):(\d{2})))$/i);
  if (!dateArray) throw "Invalid date format: "+ this;

  return new Date(
  Date.UTC(dateArray[1],
  dateArray[2]-1,
  dateArray[3],
  dateArray[4],
  dateArray[5],
  dateArray[6]|0,
  (dateArray[6]*1000-((dateArray[6]|0)*1000))|0,
  dateArray[7]) + (dateArray[7].toUpperCase() ==="Z" ? 0 : (dateArray[10]*3600 + dateArray[11]*60) * (dateArray[9]==="-" ? 1000 : -1000))
  );
}

Number.prototype.Pad = function(length) {
  var number = this;
  var prefix = "";
  if(number<0) {
    number = number *-1;
    prefix = "-";
  }

  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }

  return prefix+str;
}

/*
 * 2011-05-17T03:13:30.9352508Z
 */
Date.prototype.FormatRfcDate = function(handleAsUtc) {

  var time = null;
  if(handleAsUtc) {
    time = {
      year: this.getUTCFullYear(),
      month: this.getUTCMonth(),
      day: this.getUTCDate(),
      hours: this.getUTCHours(),
      minutes: this.getUTCMinutes(),
      seconds: this.getUTCSeconds(),
      ms: this.getUTCMilliseconds(),
      zone: "Z"
    };
  } else {
    var offsetInMinutes = this.getTimezoneOffset();
    var offsetHours = Math.floor(offsetInMinutes/60);
    var offsetMinutes = offsetInMinutes-(offsetHours*60);

    time = {
      year: this.getFullYear(),
      month: this.getMonth(),
      day: this.getDate(),
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds(),
      ms: this.getMilliseconds(),
      zone: (offsetInMinutes > 0 ? "+": "") +offsetHours.Pad(2)+":"+ offsetMinutes.Pad(2)
    };
  }

  return time.year + "-" + (time.month+1).Pad(2) + "-" + time.day.Pad(2)
  + "T" + time.hours.Pad(2) + ":" + time.minutes.Pad(2)+ ":"+ time.seconds.Pad(2)
  + "."+ time.ms.Pad(3) +time.zone;
}

/* ================== COMMON ================== */

/*
 * Format currency
 */
dgosocial.prototype.FormatCurrency = function(amount, cur) {
  var numberOfDecimals = 0;
  var decimalSeparator = '.';

  if(cur) {
    switch(cur) {
      case 'EUR':
        numberOfDecimals = 2;
        decimalSeparator = ',';
        break;
      case 'USD':
        numberOfDecimals = 2;
        break;
    }
  }

  var c = jQuery().number_format(amount, {
    numberOfDecimals: numberOfDecimals,
    decimalSeparator: decimalSeparator,
    thousandSeparator: '.'
  });

  return c;
}

dgosocial.api = function () {
  var _this = this;

  this.ErrorSource = {
    Api: "api",
    System: "system"
  }

  this.OnError = function(error) {
    _this.Log("Error: "+ error.Text);
  }

  this.OnWarning = function(warning) {
    _this.Log("Warning: "+ warning.Text);
  }

  this.PortalNameSpace = null;
  this.AjaxProxy = "inc/ajaxproxy.php?u=";
  this.IsDev = false;
  this.ApiKey = "00000000-0000-0000-0000-000000000000";

  // private members
  // don't change these from outside
  //this.PortalUriBase = "https://social.cloud.delivergo.com/{2}";
  this.PortalUriBase = "https://api.delivergo.com/api.social{0}/{2}";

  /*
   * Request
   */
  this.Request = {
  };

  /*
   * Result
   */
  this.Result = null;

  // get full proxied portal uri on relative part like '/api/Calculate'
  this.proxyPortalUri = function(relativeUri, proxyCacheDuration) {
    var baseUri = this.PortalUriBase;

    if(this.IsDev) {
      baseUri = baseUri.replace("{0}", ".dev");
    } else {
      baseUri = baseUri.replace("{0}", "");
    }

    var portalUri = baseUri.replace("{1}", this.PortalNameSpace);

    if(relativeUri[0]=="/") {
      relativeUri = relativeUri.substring(1);
    }

    return this.proxyUri(portalUri.replace("{2}", relativeUri), proxyCacheDuration);
  }

  // get proxied url
  this.proxyUri = function(uri, proxyCacheDuration) {
    if(this.AjaxProxy ==null || this.AjaxProxy == "") {
      return uri;
    }
    var result = this.AjaxProxy + uri;
    if(proxyCacheDuration>0) {
      result += "&c="+ proxyCacheDuration;
    }
    return result;
  }

}

// api class inherits all members and functions from delivergo superclass and
// extends it
dgosocial.api.prototype = new dgosocial;

dgosocial.api.prototype.handleError = function(source, error, details) {
  if(this.OnError!=null) {
    this.OnError(source, error, details);
  }
}

dgosocial.api.prototype.handleTimeout = function() {
  if(this.OnTimeout!=null) {
    this.OnTimeout();
  }
}

dgosocial.api.prototype.handleWarning = function(source, warning, details) {
  if(this.OnWarning!=null) {
    this.OnWarning(source, warning, details);
  }
}

dgosocial.api.prototype.EnableDebug = function() {
  this.Request.Header.IsDebug = true;
}

dgosocial.api.prototype.DisableDebug = function() {
  this.Request.Header.IsDebug = false;
}

/*===========================Social Portal==============================*/
/*
 * Get Social Portals
 */
dgosocial.api.prototype.GetSocialPortal = function () {
  var _this = this;
  this.doAjaxGet("/apps", function(result) {
  	console.log(result);
  });
}

/*===========================COMMENT====================================*/
/*
 * Getting source comment
 */
dgosocial.api.prototype.GetSourceComment = function (portalId, source, callback) {
  var _this = this;
  this.doAjaxGet("/apps/" + portalId + "/comments/" + source, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}
/*
 * Setting source comment
 */
dgosocial.api.prototype.SetSourceComment = function (portalId, callback) {
  var _this = this;
  this.doAjaxPost("/apps/" + portalId + "/comments", _this.Request, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}

/*
 * Source comment delete
 */
dgosocial.api.prototype.CommentDelete = function (portalId, comment, callback) {
  var _this = this;
  this.doAjaxDelete("/apps/" + portalId + "/comments/" + comment, _this.Request, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}

/*
 * Setting comment content
 */
dgosocial.api.prototype.SetCommentContent = function (reqObject) {
	if(reqObject != null && reqObject != undefined){
		this.Request = reqObject;
	}	  
}

/* ======================RATING=========================*/
/*
 * Getting source rating
 */
dgosocial.api.prototype.GetSourceRating = function (portalId, source, userid, callback) {
  var _this = this;
  this.doAjaxGet("/apps/" + portalId + "/sources/" + source + "/" + userid, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}

/*
 * Setting source rating
 */
dgosocial.api.prototype.SetSourceRating = function (portalId, source, userid, rating, callback) {
  var _this = this;
  this.doAjaxGet("/apps/" + portalId + "/sources/" + source + "/" + userid + "/" + rating, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}

/*
 * Getting comment rating
 */
dgosocial.api.prototype.GetCommentRating = function (portalId, comment, userid, callback) {
  var _this = this;
  this.doAjaxGet("/apps/" + portalId + "/comments/" + comment + "/" + userid, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}

/*
 * Setting comment rating
 */
dgosocial.api.prototype.SetCommentRating = function (portalId, comment, userid, rating, callback) {
  var _this = this;
  this.doAjaxGet("/apps/" + portalId + "/comments/" + comment + "/" + userid + "/" + rating, function(result) {
    // overwrite current request value with result value
    _this.Request.Value = result.Value;
    callback(result);
  });
}
/* ================== REQUEST ================== */
/*
 * Initialize a default Request object
 */


/*
 * Get current Portal info
 */
dgosocial.api.prototype.GetPortal = function (language, callback) {
  this.doAjaxGet("/Portal/"+ language , callback, 'GetPortal:'+this.PortalNameSpace+":"+ language, this.longCacheDuration);
}

/*
 * Get TimeZone
 */
dgosocial.api.prototype.GetTimeZones = function (language, callback) {
  this.doAjaxGet("/TimeZones/"+ language, callback,
  'GetTimeZones:'+language, this.longCacheDuration);
}

/*
 * Get Currency
 */
dgosocial.api.prototype.GetCurrencies = function (language, callback) {
  this.doAjaxGet("/Currencies/"+ language +"?compact" , callback, 'GetCurrencies:'+language);
}

/*
 * Get languages
 */
dgosocial.api.prototype.GetLanguages = function (language, callback) {
  this.doAjaxGet("/Languages/"+ language +"?compact" , callback,
  'GetLanguages:'+language, this.longCacheDuration);
}
/** **************************************************************************************
 * */
/*
 *
 * General AJAX API call
 *
 */
dgosocial.api.prototype.doAjaxDelete = function (uri, data, callback, cacheKey) {
  this.doAjaxWithBody("DELETE", uri, data, callback, cacheKey, false);
}

dgosocial.api.prototype.doAjaxGet = function (uri, callback, cacheKey, proxyCacheDuration, sync) {
  this.doAjaxWithoutBody("GET", uri, callback, cacheKey, proxyCacheDuration, sync);
}

dgosocial.api.prototype.doAjaxWithoutBody = function (method, uri, callback, cacheKey, proxyCacheDuration, sync) {
  var _this = this;

  var async = true;
  if(sync) {
    async = false;
  }

  var call = function(localCallback) {
    jQuery.ajax({
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: method,
      url: _this.proxyPortalUri(uri, proxyCacheDuration),
      success: function (result) {
        _this.Result = result;
        localCallback(result);
      },

      error: function(xhr, ajaxOptions, thrownError) {
        _this.handleError(_this.ErrorSource.System, thrownError, xhr)
      },

      async: async
    })
  };

  if(cacheKey==null) {
    call(callback);
  } else {
    _this.TryGetCached(cacheKey, call, callback)
  }
}

dgosocial.api.prototype.doAjaxPut = function (uri, data, callback, cacheKey) {
  this.doAjaxWithBody("PUT", uri, data, callback, cacheKey, false);
}

dgosocial.api.prototype.doAjaxPost = function (uri, data, callback, cacheKey, proxyCacheDuration) {
  this.doAjaxWithBody("POST", uri, data, callback, cacheKey, proxyCacheDuration);
}

dgosocial.api.prototype.doAjaxWithBody = function (method, uri, data, callback, cacheKey, proxyCacheDuration) {
  var _this = this;

  var dataToUse = data == null ? _this.Request : data;

  var call = function(localCallback) {
    jQuery.ajax({
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: method,
      url: _this.proxyPortalUri(uri, proxyCacheDuration),
      data: JSON2.stringify(dataToUse),
      success: function (Result) {
        _this.Result = Result;
        localCallback(Result);
      },

      error: function(xhr, ajaxOptions, thrownError) {
        _this.handleError(_this.ErrorSource.System, thrownError, xhr);
      }

    })
  };

  if(cacheKey==null) {
    call(callback);
  } else {
    _this.TryGetCached(cacheKey, call, callback)
  }
}

dgosocial.api.prototype.handleAjaxResponse = function(result, successCallback) {
  var _this = this;

  if (result != null && result.Status != null && result.Status.Errors != null
  && result.Status.Errors.length > 0) {
    // Error message
    jQuery.each(result.Status.Errors, function(index, error) {
      _this.handleError(error, _this.ErrorSource.Api);
    });

    return false;
  }

  // handle returned warnings
  if (result != null && result.Status != null && result.Status.Warnings != null
  && result.Status.Warnings.length > 0) {
    // Warning message

    jQuery.each(result.Status.Warnings, function(index, warning) {
      _this.handleWarning(warning, _this.ErrorSource.Api);
    });

  }

  // Request was successful, call onSuccess callback
  if (result != null && result.Status != null && result.Status.Messages != null
  && result.Status.Messages.length > 0 && result.Status.Messages[0].Code == 1000) {
    successCallback(result);
  }

  return true;
}

/*
 *
 * AJAX API calculation call with default error handling
 *
 */
dgosocial.api.prototype.Calculate = function(successCallback, useProxyCache, useClientCache) {
  var _this = this;

  var cacheKey = null;

  if(useClientCache) {
    cacheKey = hex_md5(JSON2.stringify(_this.Request));
  }

  // get prices from api
  this.calculateCurrentRequest( function (response) {
    // use callback function for usage
    _this.handleAjaxResponse(response, successCallback);
  }, useProxyCache ? _this.shortCacheDuration : -1, cacheKey);

}