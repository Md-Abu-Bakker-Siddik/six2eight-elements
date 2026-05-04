/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);





function ComparePreview({
  slide
}) {
  const safe = slide && typeof slide === 'object' ? slide : {};
  const before = safe.beforeUrl;
  const after = safe.afterUrl;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__compare s2e-compare",
    "data-s2e-compare": "1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__layer s2e-compare__before"
  }, before ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: before,
    alt: ""
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__layer s2e-compare__after",
    style: {
      clipPath: 'inset(0 0 0 50%)'
    }
  }, after ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: after,
    alt: ""
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__handle",
    role: "presentation",
    tabIndex: -1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-compare__handle-knob",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-compare__handle-arrows"
  }, '\u2039\u203A'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__badge s2e-transformation__badge--before"
  }, safe.beforeLabel || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before', 'six2eight-elements')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__badge s2e-transformation__badge--after"
  }, safe.afterLabel || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('After', 'six2eight-elements'))));
}
function asRichString(value) {
  return typeof value === 'string' ? value : '';
}
function Edit({
  attributes,
  setAttributes
}) {
  const {
    showHeader = true,
    showNav = true,
    showNavArrows = true
  } = attributes;
  const headlinePrefix = asRichString(attributes.headlinePrefix);
  const headlineAccent = asRichString(attributes.headlineAccent);
  const subheadline = asRichString(attributes.subheadline);
  const slides = Array.isArray(attributes.slides) ? attributes.slides : [];
  const mainIndex = Number(attributes.mainIndex) || 0;
  const showArrowsInNav = showNav !== false && showNavArrows !== false;
  const sectionClass = 's2e-transformation s2e-transformation--editor' + (showHeader === false ? ' s2e-transformation--header-off' : '');
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    ref,
    className: sectionClass,
    'data-s2e-transformation': '1'
  });
  const count = Math.max(1, slides.length);
  const idx = Math.max(0, Math.min(mainIndex, count - 1));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (typeof window !== 'undefined' && window.s2eEightReinitInScope && ref.current) {
      window.s2eEightReinitInScope(ref.current);
    }
  }, [slides, mainIndex, showHeader, showNav, showNavArrows]);
  const updateSlide = (index, patch) => {
    const base = Array.isArray(slides) ? slides : [];
    const nextSlides = base.map((row, i) => i === index ? {
      ...(row && typeof row === 'object' ? row : {}),
      ...patch
    } : row);
    setAttributes({
      slides: nextSlides
    });
  };
  const addSlide = () => {
    const base = Array.isArray(slides) ? slides : [];
    setAttributes({
      slides: [...base, {
        beforeId: 0,
        beforeUrl: '',
        afterId: 0,
        afterUrl: '',
        beforeLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before', 'six2eight-elements'),
        afterLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('After', 'six2eight-elements')
      }]
    });
  };
  const removeSlide = index => {
    const base = Array.isArray(slides) ? slides : [];
    if (base.length < 2) {
      return;
    }
    const nextSlides = base.filter((_, i) => i !== index);
    setAttributes({
      slides: nextSlides,
      mainIndex: Math.min(mainIndex, nextSlides.length - 1)
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    ...blockProps,
    "data-s2e-slide-count": String(count),
    "data-s2e-initial-slide": String(idx),
    "data-s2e-autoplay-ms": "5000"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout', 'six2eight-elements'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show header (headline + sub)', 'six2eight-elements'),
    checked: showHeader !== false,
    onChange: v => setAttributes({
      showHeader: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show navigation bar', 'six2eight-elements'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Counter and arrows live in this bar. Turn off to hide the whole bar.', 'six2eight-elements'),
    checked: showNav !== false,
    onChange: v => setAttributes({
      showNav: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show prev / next arrows', 'six2eight-elements'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slide counter stays visible when arrows are hidden.', 'six2eight-elements'),
    checked: showNavArrows !== false,
    onChange: v => setAttributes({
      showNavArrows: v
    }),
    disabled: showNav === false
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slides', 'six2eight-elements'),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Initial centered slide', 'six2eight-elements'),
    min: 0,
    max: Math.max(0, count - 1),
    value: idx,
    onChange: v => setAttributes({
      mainIndex: v
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    onClick: addSlide
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add comparison', 'six2eight-elements'))), (Array.isArray(slides) ? slides : []).map((slide, index) => {
    var _row$beforeLabel, _row$afterLabel;
    const row = slide && typeof slide === 'object' ? slide : {};
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      key: index,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Comparison', 'six2eight-elements') + ' ' + (index + 1),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: media => updateSlide(index, {
        beforeId: media.id,
        beforeUrl: media.url
      }),
      allowedTypes: ['image'],
      value: row.beforeId,
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        variant: "secondary",
        onClick: open
      }, row.beforeUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace before', 'six2eight-elements') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before image', 'six2eight-elements'))
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: media => updateSlide(index, {
        afterId: media.id,
        afterUrl: media.url
      }),
      allowedTypes: ['image'],
      value: row.afterId,
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        variant: "secondary",
        onClick: open,
        style: {
          marginTop: 8
        }
      }, row.afterUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace after', 'six2eight-elements') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('After image', 'six2eight-elements'))
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Before label', 'six2eight-elements'),
      value: (_row$beforeLabel = row.beforeLabel) !== null && _row$beforeLabel !== void 0 ? _row$beforeLabel : '',
      onChange: v => updateSlide(index, {
        beforeLabel: v
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('After label', 'six2eight-elements'),
      value: (_row$afterLabel = row.afterLabel) !== null && _row$afterLabel !== void 0 ? _row$afterLabel : '',
      onChange: v => updateSlide(index, {
        afterLabel: v
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isDestructive: true,
      variant: "link",
      onClick: () => removeSlide(index),
      disabled: (Array.isArray(slides) ? slides : []).length < 2
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove comparison', 'six2eight-elements')));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__inner"
  }, showHeader !== false ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "s2e-transformation__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "s2e-transformation__headline"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "span",
    className: "s2e-transformation__headline-sans",
    value: headlinePrefix,
    onChange: v => setAttributes({
      headlinePrefix: v !== null && v !== void 0 ? v : ''
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('See the', 'six2eight-elements'),
    allowedFormats: []
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "span",
    className: "s2e-transformation__headline-serif",
    value: headlineAccent,
    onChange: v => setAttributes({
      headlineAccent: v !== null && v !== void 0 ? v : ''
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Transformation', 'six2eight-elements'),
    allowedFormats: []
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "p",
    className: "s2e-transformation__sub",
    value: subheadline,
    onChange: v => setAttributes({
      subheadline: v !== null && v !== void 0 ? v : ''
    }),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Supporting copy', 'six2eight-elements')
  })) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 's2e-transformation__track' + (count <= 1 ? ' s2e-transformation__track--single' : ''),
    "data-s2e-track": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__rack",
    "data-s2e-transformation-rack": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__viewport",
    "data-s2e-transformation-viewport": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__strip",
    "data-s2e-transformation-strip": true
  }, (Array.isArray(slides) ? slides : []).map((slide, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 's2e-transformation__cell' + (i === idx ? ' is-active' : ''),
    "data-s2e-slide": true,
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ComparePreview, {
    slide: slide
  })))))), showNav !== false ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "s2e-transformation__nav",
    "data-s2e-transformation-nav": true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Project slides', 'six2eight-elements')
  }, showArrowsInNav ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "s2e-transformation__nav-btn s2e-transformation__nav-btn--prev",
    "data-s2e-carousel-prev": true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Previous slide', 'six2eight-elements')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\u2039")) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__nav-fraction",
    "aria-live": "polite"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "data-s2e-current": true
  }, "1"), " / ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "data-s2e-total": true
  }, count)), showArrowsInNav ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "s2e-transformation__nav-btn s2e-transformation__nav-btn--next",
    "data-s2e-carousel-next": true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Next slide', 'six2eight-elements')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\u203A")) : null) : null)));
}

/***/ },

/***/ "./src/save.js"
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


const DEFAULT_SLIDE = {
  beforeId: 0,
  beforeUrl: '',
  afterId: 0,
  afterUrl: '',
  beforeLabel: 'Before',
  afterLabel: 'After'
};
function asRichString(value) {
  return typeof value === 'string' ? value : '';
}
function CompareSave({
  slide
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__compare s2e-compare",
    "data-s2e-compare": "1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__layer s2e-compare__before"
  }, slide.beforeUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: slide.beforeUrl,
    alt: "",
    loading: "lazy"
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__layer s2e-compare__after",
    style: {
      clipPath: 'inset(0 0 0 50%)'
    }
  }, slide.afterUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: slide.afterUrl,
    alt: "",
    loading: "lazy"
  }) : null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-compare__handle",
    role: "slider",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": 50,
    tabIndex: 0,
    "aria-label": "Before and after"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-compare__handle-knob",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-compare__handle-arrows"
  }, '\u2039\u203A'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__badge s2e-transformation__badge--before"
  }, slide.beforeLabel || 'Before'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__badge s2e-transformation__badge--after"
  }, slide.afterLabel || 'After')));
}
function save({
  attributes
}) {
  const {
    mainIndex,
    showHeader = true,
    showNav = true,
    showNavArrows = true
  } = attributes;
  const headlinePrefix = asRichString(attributes.headlinePrefix);
  const headlineAccent = asRichString(attributes.headlineAccent);
  const subheadline = asRichString(attributes.subheadline);
  let slides = Array.isArray(attributes.slides) ? attributes.slides : [];
  if (!slides.length) {
    slides = [{
      ...DEFAULT_SLIDE
    }];
  }
  const showArrowsInNav = showNav !== false && showNavArrows !== false;
  const sectionClass = 's2e-transformation' + (showHeader === false ? ' s2e-transformation--header-off' : '');
  const count = slides.length || 1;
  const idx = Math.max(0, Math.min(Number(mainIndex) || 0, count - 1));
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: sectionClass,
    'data-s2e-transformation': '1',
    'data-s2e-slide-count': String(count),
    'data-s2e-initial-slide': String(idx),
    'data-s2e-autoplay-ms': '5000'
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__inner"
  }, showHeader !== false ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "s2e-transformation__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "s2e-transformation__headline"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "span",
    className: "s2e-transformation__headline-sans",
    value: headlinePrefix
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "span",
    className: "s2e-transformation__headline-serif",
    value: headlineAccent
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "p",
    className: "s2e-transformation__sub",
    value: subheadline
  })) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 's2e-transformation__track' + (count <= 1 ? ' s2e-transformation__track--single' : ''),
    "data-s2e-track": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__rack",
    "data-s2e-transformation-rack": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__viewport",
    "data-s2e-transformation-viewport": true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "s2e-transformation__strip",
    "data-s2e-transformation-strip": true
  }, slides.map((slide, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 's2e-transformation__cell' + (i === idx ? ' is-active' : ''),
    "data-s2e-slide": true,
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompareSave, {
    slide: slide
  })))))), showNav !== false ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "s2e-transformation__nav",
    "data-s2e-transformation-nav": true,
    "aria-label": "Project slides"
  }, showArrowsInNav ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "s2e-transformation__nav-btn s2e-transformation__nav-btn--prev",
    "data-s2e-carousel-prev": true,
    "aria-label": "Previous slide"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\u2039")) : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "s2e-transformation__nav-fraction",
    "aria-live": "polite"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "data-s2e-current": true
  }, "1"), " / ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "data-s2e-total": true
  }, count)), showArrowsInNav ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "s2e-transformation__nav-btn s2e-transformation__nav-btn--next",
    "data-s2e-carousel-next": true,
    "aria-label": "Next slide"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\u203A")) : null) : null)));
}

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./block.json"
/*!********************!*\
  !*** ./block.json ***!
  \********************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"six2eight/transformation-slider","version":"1.0.0","title":"Six2eight Transformation Slider","category":"widgets","icon":"slides","description":"Before and after image comparison with optional gallery context.","textdomain":"six2eight-elements","supports":{"align":["wide","full"],"html":false,"spacing":{"margin":true,"padding":true}},"attributes":{"headlinePrefix":{"type":"string","default":"See the"},"headlineAccent":{"type":"string","default":"Transformation"},"subheadline":{"type":"string","default":"See how homeowners across the region are transforming garages, driveways, and outdoor areas into cleaner, safer, more usable spaces."},"showHeader":{"type":"boolean","default":true},"showNav":{"type":"boolean","default":true},"showNavArrows":{"type":"boolean","default":true},"mainIndex":{"type":"number","default":0},"slides":{"type":"array","default":[{"beforeId":0,"beforeUrl":"","afterId":0,"afterUrl":"","beforeLabel":"Before","afterLabel":"After"}]}},"editorScript":"file:./build/index.js"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "./block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_1__,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});
})();

/******/ })()
;