(function() {

	angular.module('ngImgFallback', [])
		.provider('imageFallback', function() {
			this.placeholderImages = {};
			this.$get = function() {
				return this;
			}
			this.setPlaceholderImages = function(images) {
				if (Object.prototype.toString.call(images) !== '[object Object]')
					throw 'placeholder images must of the type object';
				angular.extend(placeholderImages, images);
				if (!Object.prototype.hasOwnProperty.call(placeholderImages, 'general'))
					throw 'the placeholder images configuration should have the general fallback property set';
			}
		})
		.directive('imgFallback', ['imageFallback', function(imageFallback) {
			return [function() {

				return {
					restrict: 'A',
					link: function($scope, $el, $attrs) {

						// An array maintained in the config for placeholder images paths. To be copied from config.sample as its in .gitignore
						var placeholderImages = imageFallback.placeholderImages;

						/*
						    Sets a general fallback Image unless specified otherwise.
						*/
						var fallbackSrc = $attrs.imgFallback ? (placeholderImages[$attrs.imgFallback] ? placeholderImages[$attrs.imgFallback] : placeholderImages['general']) : placeholderImages['general'];

						var errorHandler = function() {
							$el.off('error', errorHandler)

							$el[0].src = fallbackSrc;

						}

						// Cross browser compatible trick to find the image load has been failed

						if (typeof $el[0].naturalWidth !== "undefined" && $el[0].naturalWidth === 0 && typeof $el[0].naturalHeight !== "undefined" && $el[0].naturalHeight === 0)
							errorHandler()


						$el.on('error', errorHandler)
					}
				}
			}]
		}])

})()
