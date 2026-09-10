RG Changelog
############

All notable changes to this project will be documented in this file.

The format is based on `Keep a Changelog <https://keepachangelog.com/en/1.0.0/>`_,
and this project adheres to customized Semantic Versioning e.g.: `teak-rg.1`

[Unreleased]
************

[release/teak-rg.4] - 2026-09-10
********************************

Added:
======
* Adopt the shared ``theme-variant`` cookie as the active theme in all modes, including the in-context sidebar iframe (ENG-63)
* Apply a dark content style to the TinyMCE editor surface when dark theme is active (ENG-63)

Fixed:
======
* Center the header theme-toggle icon within its button (ENG-63)

[release/teak-rg.3] - 2026-02-27
********************************

Maintenance:
============
* Rebased on upstream/release/teak.3

[release/teak-rg.2] - 2025-12-12
********************************

Fixed:
======
* Custom fonts loading fix (TEA-289)

[release/teak-rg.1] - 2025-08-06
********************************

Sync:
=====
* sync with upstream teak branch (TEA-18)

Added:
======
* add direct import of openedx-brand overrides (TEA-18)
* add design tokens support (TEA-18)

Changed:
========
* changed FooterSlot loading method to ensure basic `subscribe` works (TEA-289)
