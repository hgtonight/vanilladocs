---
title: Coding Standards
layout: page
categories: ["Developers","Contributing"]
---

## Coding Standards

As of May 2014, Vanilla now primary adheres to PSR-2 with a few exceptions. We will be mass-updating our source code during the summer of 2014.

We've named our primary exception to PSR-2 **[Lord Brackos](https://twitter.com/linc/status/462308222427480065)** - Same-line open braces on all classes, method, and function definitions.

## CodeSniffer

This assumes you have both PEAR and homebrew with PHP 5.5.

1. Get CodeSniffer: `pear install PHP_CodeSniffer`
2. Add to bash profile: `export PATH="$(brew --prefix php55)/bin:$PATH"`
3. Symlink `addons/standards` to CodeSniffer's Standards folder as `Vanilla`
4. Set Vanilla as your standard: `phpcs --config-set default_standard Vanilla`
5. Use it: `phpcs /path/to/vanilla`