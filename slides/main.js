import slideorama from "slideorama";
slideorama.init("presentation", "slide-container");

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/monokai-sublime.css';
