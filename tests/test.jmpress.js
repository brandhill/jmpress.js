/**
 * jmpress.js test suite
 *
 * MIT Licensed.
 *
 * Copyright 2012 Kyle Robinson Young (@shama)
 */

describe('Jmpress', function() {
	jasmine.getFixtures().fixturesPath = 'tests/fixtures';
	var defaults = {
		stepSelector: '.step'
		,canvasClass: 'canvas'
		,notSupportedClass: 'not-supported'
		,loadedClass: 'loaded'
		,animation: {
			transformOrigin: 'top left'
			,transitionProperty: 'all'
			,transitionDuration: '1s'
			,transitionTimingFunction: 'ease-in-out'
			,transformStyle: "preserve-3d"
		}
		,beforeChange: null
		,test: true
	};
	
	/**
	 * beforeEach
	 */
	beforeEach(function() {
		loadFixtures('demo.html');
		window.location.hash = '#';
		$('#jmpress').jmpress( defaults );
	});

	/**
	 * test beforeChange
	 */
	describe('beforeChange', function() {
		/**
		 * test beforeChange
		 */
		it('should call a function before the slide has changed', function() {
			var callback = jasmine.createSpy('beforeChange');
			$('#jmpress').jmpress( 'beforeChange', callback );
			expect( callback ).not.toHaveBeenCalled();
			$('#jmpress').jmpress( 'next' );
			expect( callback ).toHaveBeenCalled();

			// TODO: Test setting callbacks as param
		});
	});

	/**
	 * test init
	 */
	describe('init', function() {
		/**
		 * test init
		 */
		it('should initialize', function() {
			var result;
			expect( $('#jmpress') ).toHaveClass( 'step-about' );
			expect( $('#jmpress') ).toContain( '.canvas' );
			
			// SET INIT VALUES
			$('#jmpress').jmpress({
				canvasClass: 'testcanvas'
				,stepSelector: 'li'
			});
			result = $('#jmpress').jmpress( 'settings' );
			expect( result.canvasClass ).toEqual( 'testcanvas' );
			expect( result.stepSelector ).toEqual( 'li' );
		});

		/**
		 * test init slides
		 */
		it('should initialize each slide', function() {
			var slide = $('#jmpress').find('.step:first');
			//expect( slide ).toHaveClass( 'active' ); // TODO: Failing because first slide isnt being activated due to the double select issue
			expect( slide.css('position') ).toEqual( 'absolute' );
			expect( slide.attr('style') ).toContain( 'translate(-50%, -50%)' );
			expect( slide.attr('style') ).toContain( 'translate3d(-900px, -1500px, 0px)' );
			expect( slide.attr('style') ).toContain( 'scaleX(1) scaleY(1) scaleZ(1)' );
			expect( slide.attr('style') ).toContain( 'preserve-3d' );
		});
	});
	
	/**
	 * test select
	 */
	describe('select', function() {
		/**
		 * test select
		 */
		it('should select a slide', function() {
			var slide;
			
			slide = $('#jmpress').jmpress('select', $('#jmpress').find('#about-impress'));
			expect( slide ).toHaveClass( 'active' );
			slide = null;

			slide = $('#jmpress').jmpress('select', '#about-impress');
			expect( slide ).toHaveClass( 'active' );
		});
	});
	
	/**
	 * test next/prev
	 */
	describe('next/prev', function() {
		/**
		 * test next
		 */
		it('should select the next slide', function() {
			var slide = $('#jmpress').jmpress( 'next' );
			expect( slide ).toHaveId( 'about-port' );
		});

		/**
		 * test prev
		 */
		it('should select the prev slide', function() {
			var slide = $('#jmpress').jmpress( 'prev' );
			expect( slide ).toHaveId( 'contribute-wishlist' );
		});
	});
	
	// TODO: Write test for loadSiblings
	
	/**
	 * test canvas
	 */
	describe('canvas', function() {
		/**
		* test canvas
		*/
		it('should modify the canvas css', function() {
			var canvas = $('#jmpress').jmpress('canvas', {
				transitionTimingFunction: 'linear'
			});
			expect( canvas.attr('style') ).toContain( 'transition-timing-function: linear;' );
		});
	});
	
	// TODO: Test getElementFromUrl, pfx, css, checkSupport
	
	/**
	 * test protected
	 */
	describe('test protected', function() {
		/**
		 * test _translate
		 */
		it('should build translate', function() {
			var result = $('#jmpress').jmpress('_translate', {x: 500, y: -900, z: 2});
			expect( result ).toEqual( ' translate3d(500px,-900px,2px) ' );
		});

		/**
		 * test _rotate
		 */
		it('should build rotate', function() {
			var result;
			result = $('#jmpress').jmpress('_rotate', {x: 90, y: 180, z: 20}, false);
			expect( result ).toEqual( ' rotateX(90deg)  rotateY(180deg)  rotateZ(20deg) ' );
			result = $('#jmpress').jmpress('_rotate', {x: 90, y: 180, z: 20}, true);
			expect( result ).toEqual( ' rotateZ(20deg)  rotateY(180deg)  rotateX(90deg) ' );
		});

		/**
		 * test _scale
		 */
		it('should build scale', function() {
			var result = $('#jmpress').jmpress('_scale', {x: 3, y: 2, z: 1});
			expect( result ).toEqual( ' scaleX(3) scaleY(2) scaleZ(1) ' );
		});
	});
	
});