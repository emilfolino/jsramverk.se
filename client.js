import "./client-js/scroll.js";

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';

import 'highlight.js/styles/monokai-sublime.css';

import Turbolinks from "turbolinks";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);

hljs.initHighlightingOnLoad();
Turbolinks.start();
