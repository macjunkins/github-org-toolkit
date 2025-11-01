# AcreetionOS-Linux Repository Archival Recommendations

**Date:** October 31, 2025
**Prepared for:** AcreetionOS-Linux Organization
**Prepared by:** MAcJunkins
**Current Repository Count:** 99 (98 active, 1 already archived)
**Target Repository Count:** ~20-24 (75-79 to archive)

---

## Executive Summary

The AcreetionOS-Linux organization currently maintains 99 repositories, of which approximately **70% are pure upstream mirrors with zero AcreetionOS-specific modifications**. This creates unnecessary maintenance burden, organizational confusion, and unclear strategic direction.

### Key Findings

1. **Mirror Strategy Lacks Documentation** - No clear rationale exists for maintaining 65+ pure upstream syncs
2. 
**Aggressive Mirroring Doesn't Serve 2026 Independence Goal** - Pure syncs provide no value; modified forks do

3. **Fragmented But Intentional Desktop Strategy** - 4 desktop variants (KDE, XFCE, GNOME, COSMIC) with varying activity levels

4. **Multiple Abandoned Experiments** - Build systems, installers, and utilities started but not maintained

5. **Recent Organizational Reset** - Main repos recreated Oct 31, 2025 suggests fresh start opportunity
              
### Recommendation

**Archive 75-79 repositories** through aggressive consolidation while preserving:

- Core distribution infrastructure (acreetionos, arch-iso, PKGBUILDs)

- Mirrors with actual AcreetionOS modifications (3 repos)

- All desktop environment variants and themes (per organizational diversity goals)
- Active documentation and web presence
        
---

## Archival Philosophy

This recommendation follows three guiding principles:

### 1. Modified Over Mirrored
**Keep only mirrors with AcreetionOS-specific commits.** Pure upstream syncs can be pulled from source when needed. There's no value in GitHub-hosting upstream code you don't modify. 

### 2. Active Over Aspirational
**Archive experiments that haven't been touched in 6+ months** unless they serve a clear strategic purpose (e.g., theme forks tracking upstream).

### 3. Documented Over Speculative
**If there's no documentation explaining why a repo exists, and it shows no custom work, archive it.** Future needs can be addressed when they arise. 
        
---

## Detailed Archival Recommendations

### TIER 1: Archive Immediately - Empty & Abandoned (10 repos)

These repositories provide zero value and should be archived without hesitation.

| Repository | Size | Last Update | Reason |
|------------|------|-------------|--------|
| AcreetionOS-Test-Repo | 0 KB | Jan 2025 | Empty repository |
| gcc-libs | 0 KB | Jan 2025 | Empty placeholder |
| kmod | 0 KB | Jan 2025 | Empty placeholder |
| AcreetionOSDockerBuild | 1 KB | Nov 2024 | Abandoned after 1 day |
| acreetionfox | 19 KB | July 2025 | Redundant GitHub mirror of self-hosted GitLab |
| AcreetionOS-Download-Utility | 1 KB | July 2025 | Fork with minimal content, never developed |
| AcreetionOSBuildSystem | 3 KB | Nov 2024 | Shell scripts, superseded by main `acreetionos` repo |
| elfutils | 8 KB | Nov 2024 | Placeholder created but never populated |
| debugedit | ~10 KB | Nov 2024 | Minimal content, no clear integration |
| bsys6 | <50 KB | Mar 2025 | LibreWolf build system for archived browser project |

**Impact:** Removes 10 repos that consume mental bandwidth but provide no functionality.

---

### TIER 2: Archive Pure Upstream Mirrors - No Custom Work (65 repos)

These repositories are **pure upstream syncs** with zero AcreetionOS-specific modifications. They can be pulled from upstream sources when needed for package building.

#### GNU Core Utilities (14 repos)
- bash
- coreutils
- coreutils-rust *(keep one if rust version is strategic, archive both if not)*
- gawk
- grep
- findutils
- gzip
- gettext
- gnulib
- gperf
- bison
- autoconf
- automake
- diffutils

**Rationale:** These are pure GNU upstream syncs. No patches, no customization. Use upstream sources directly.

#### System Libraries (18 repos)
- glibc
- gnutls
- gpgme
- libidn2
- libbpf
- libfido2
- libarchive
- libgd
- libelfin
- libpamac *(unless actively modifying)*
- liboqs
- attr
- acl
- ca-certificates
- cracklib
- argon2
- audit
- alsa-firmware (from old AcreetionOS org)

**Rationale:** System libraries should come from Arch/upstream repos. Mirroring without modification adds no value.

#### Development Tools (8 repos)
- git
- gnupg
- binutils
- python
- fakechroot
- asciidoc-py
- file
- jq

**Rationale:** Developer tools are universally available. No need to mirror unless patching.

#### System Utilities (10 repos)
- less
- curl
- brotli
- kbd
- iproute2
- iputils
- bash-completion
- dbus
- dbus-broker
- dash

**Rationale:** Standard system utilities with no custom work. Pull from upstream.

#### Build/Compression Tools (4 repos)
- bzip2
- binutils (duplicate listing - build tool)
- archlinux-keyring *(unless modified for AcreetionOS keys)*
- linux-firmware

**Rationale:** Standard build dependencies available everywhere.

#### Legacy Forks/Utilities (6 repos)
- snapd *(if not using Snap packages, definitely archive)*
- pamac + pamac-cli *(if not modifying; may be in active use)*
- AcreetionOS-Installer *(replaced by Calamares)*
- alsa-utils, alsa-plugins (from old org)
- freeglut (from old org)

**Rationale:** Either superseded by newer tools or unmodified upstream forks.

#### C Libraries - D-Bus Related (7 repos)
Last updated 2023-2024, unclear purpose for distro:
- c-utf8
- c-shquote
- c-ini
- c-rbtree
- c-dvar
- c-stdaux
- c-list

**Rationale:** These appear to be dependencies for dbus-broker, but if dbus-broker is archived, these are unnecessary. Even if keeping dbus-broker, these can come from upstream.

**Total TIER 2:** ~65 repositories

---

### TIER 3: Consolidation Candidates - Consider Merging (5 repos)

These repositories might be consolidated or archived depending on active usage.

#### Package Manager Ecosystem (3 repos)
- **pamac** (master branch)
- **pamac-cli** (separate repo)
- **libpamac** (library repo)

**Recommendation:** If actively using/modifying Pamac, keep necessary repos. If just tracking upstream, archive all. If not using Pamac at all (using pacman only), archive immediately.

#### Installer Configs (2 repos)
- **calamares-config** (private, Oct 2025 - current)
- **calamares-config-xfce** (public fork, Dec 2024 - superseded?)

**Recommendation:** Keep the active private config, archive the XFCE fork if consolidated into main config.

---

### KEEP: Strategic Repositories (19-24 repos)

These repositories are essential to AcreetionOS and should be maintained.

#### Core Distribution Infrastructure (5 repos)
1. **acreetionos** - Main distribution/ISO builder (active Oct 31, 2025)
2. **arch-iso** - Custom Arch ISO builder fork with 4 AcreetionOS commits
3. **Acreetion-PKGBUILDs** - Package build definitions (critical infrastructure)
4. **pacman** - Package manager with 9 AcreetionOS-specific patches
5. **mkinitcpio** - Init system with 4 custom commits

**Rationale:** Core distro functionality with actual custom work.

#### Documentation & Web Presence (3 repos)
6. **acreetionos-linux.github.io** - Project website (1 star, 1 fork)
7. **.github** - Organization landing page (updated Oct 31, 2025)
8. **Wiki-Repository** - Documentation (mostly template, but strategic)

**Optional:**
9. **InitialDocumentation** (Feb 2025 - may consolidate into Wiki)
10. **AcreetionOS_Package_Request_Repo** (Feb 2025, 1 star - issue tracker)

**Rationale:** Public face of the project.

#### Desktop Environment Variants (8-10 repos)

**KDE (Primary):**
11. **calamares-config** (private, installer config - active Oct 2025)
12. **acreetion-kde-themes** (Dec 2024)
13. **klassy** (fork, Oct 2024 - KDE theme)

**XFCE (Secondary):**
14. **acreetion-xfce-configs** (Dec 2024)
15. **builds-xfce** (fork, Dec 2024 - may consolidate with configs)

**GNOME (Experimental):**
16. **AcreetionOS-GNOME** (fork, July 2025 - 117 MB)

**COSMIC (Experimental):**
17. **cosmic-edit** (fork, Dec 2024)
18. **cosmic-term** (fork, Dec 2024)
19. **cosmic-icons** (fork, Dec 2024)

**Shared:**
20. **iso-included-wallpapers** (Jan 2025)
21. **pop-icon-theme** (fork, Oct 2024)
22. **aura-theme** (fork, Aug 2024)

**Rationale:** Per organizational direction, maintain all desktop variants even if some are less active. Provides user choice and development flexibility. 
       
        
#### Utilities & Tools (Optional Keep - 2-3 repos)
23. **fastfetch** (fork, Feb 2025 - system info tool)
24. **fprint_gui** (fork, July 2025 - fingerprint utility)

**Rationale:** May be valuable utilities if actively developed or integrated.

---

## Implementation Strategy

### Phase 1: Pre-Archival (Week 1)

**1. Create Archival Announcement Issue**
```markdown
Title: Repository Consolidation Initiative - 75+ Repos to be Archived

We're streamlining the AcreetionOS-Linux organization by archiving repositories that:
- Are empty or abandoned
- Mirror upstream sources without modifications
- Have been superseded by newer implementations

**Timeline:**
- Nov 4-8: Review period for community feedback
- Nov 11-15: Begin archival process
- Nov 18: Complete archival

**Affected repositories:** [link to full list]
```

**2. Document Migration Paths**

Create `ARCHIVAL_LOG.md` documenting:
- Each archived repo
- Reason for archival
- Alternative/replacement (if applicable)
- Upstream source location

**3. Update Build Documentation**

Ensure `Acreetion-PKGBUILDs` and `acreetionos` documentation clearly explains:
- How to pull upstream sources for packages
- Which repos contain AcreetionOS modifications
- Package source management strategy

**4. Backup Critical Data**

Before archiving, ensure any important documentation or custom work is:
- Extracted and moved to appropriate active repo
- Documented in issue tracker or wiki
- Backed up externally if valuable

### Phase 2: Archival Execution (Week 2-3)

**Archive via GitHub CLI:**

```bash
# TIER 1 - Empty/Abandoned (10 repos)
gh repo archive acreetionos-linux/AcreetionOS-Test-Repo -y
gh repo archive acreetionos-linux/gcc-libs -y
gh repo archive acreetionos-linux/kmod -y
gh repo archive acreetionos-linux/AcreetionOSDockerBuild -y
gh repo archive acreetionos-linux/acreetionfox -y
gh repo archive acreetionos-linux/AcreetionOS-Download-Utility -y
gh repo archive acreetionos-linux/AcreetionOSBuildSystem -y
gh repo archive acreetionos-linux/elfutils -y
gh repo archive acreetionos-linux/debugedit -y
gh repo archive acreetionos-linux/bsys6 -y

# TIER 2 - Pure Upstream Mirrors (65 repos)
# GNU Core Utilities
gh repo archive acreetionos-linux/bash -y
gh repo archive acreetionos-linux/coreutils -y
gh repo archive acreetionos-linux/coreutils-rust -y  # or keep if strategic
gh repo archive acreetionos-linux/gawk -y
gh repo archive acreetionos-linux/grep -y
gh repo archive acreetionos-linux/findutils -y
gh repo archive acreetionos-linux/gzip -y
gh repo archive acreetionos-linux/gettext -y
gh repo archive acreetionos-linux/gnulib -y
gh repo archive acreetionos-linux/gperf -y
gh repo archive acreetionos-linux/bison -y
gh repo archive acreetionos-linux/autoconf -y
gh repo archive acreetionos-linux/automake -y
gh repo archive acreetionos-linux/diffutils -y

# System Libraries (18 repos)
gh repo archive acreetionos-linux/glibc -y
gh repo archive acreetionos-linux/gnutls -y
gh repo archive acreetionos-linux/gpgme -y
gh repo archive acreetionos-linux/libidn2 -y
gh repo archive acreetionos-linux/libbpf -y
gh repo archive acreetionos-linux/libfido2 -y
gh repo archive acreetionos-linux/libarchive -y
gh repo archive acreetionos-linux/libgd -y
gh repo archive acreetionos-linux/libelfin -y
gh repo archive acreetionos-linux/liboqs -y
gh repo archive acreetionos-linux/attr -y
gh repo archive acreetionos-linux/acl -y
gh repo archive acreetionos-linux/ca-certificates -y
gh repo archive acreetionos-linux/cracklib -y
gh repo archive acreetionos-linux/argon2 -y
gh repo archive acreetionos-linux/audit -y

# Development Tools (8 repos)
gh repo archive acreetionos-linux/git -y
gh repo archive acreetionos-linux/gnupg -y
gh repo archive acreetionos-linux/binutils -y
gh repo archive acreetionos-linux/python -y
gh repo archive acreetionos-linux/fakechroot -y
gh repo archive acreetionos-linux/asciidoc-py -y
gh repo archive acreetionos-linux/file -y
gh repo archive acreetionos-linux/jq -y

# System Utilities (10 repos)
gh repo archive acreetionos-linux/less -y
gh repo archive acreetionos-linux/curl -y
gh repo archive acreetionos-linux/brotli -y
gh repo archive acreetionos-linux/kbd -y
gh repo archive acreetionos-linux/iproute2 -y
gh repo archive acreetionos-linux/iputils -y
gh repo archive acreetionos-linux/bash-completion -y
gh repo archive acreetionos-linux/dbus -y
gh repo archive acreetionos-linux/dbus-broker -y
gh repo archive acreetionos-linux/dash -y

# Build/Compression (4 repos)
gh repo archive acreetionos-linux/bzip2 -y
gh repo archive acreetionos-linux/archlinux-keyring -y  # unless modified
gh repo archive acreetionos-linux/linux-firmware -y
gh repo archive acreetionos-linux/cryptsetup -y

# Legacy/Superseded (6 repos)
gh repo archive acreetionos-linux/snapd -y  # if not using Snap
gh repo archive acreetionos-linux/AcreetionOS-Installer -y
gh repo archive acreetionos-linux/pamac -y  # if not actively using
gh repo archive acreetionos-linux/pamac-cli -y
gh repo archive acreetionos-linux/libpamac -y

# C Libraries (7 repos)
gh repo archive acreetionos-linux/c-utf8 -y
gh repo archive acreetionos-linux/c-shquote -y
gh repo archive acreetionos-linux/c-ini -y
gh repo archive acreetionos-linux/c-rbtree -y
gh repo archive acreetionos-linux/c-dvar -y
gh repo archive acreetionos-linux/c-stdaux -y
gh repo archive acreetionos-linux/c-list -y

# TIER 3 - Consolidation (evaluate first)
# Archive calamares-config-xfce if superseded
gh repo archive acreetionos-linux/calamares-config-xfce -y
```

### Phase 3: Post-Archival Cleanup (Week 4)

**1. Update Organization README**

Update `.github` repo to reflect streamlined repository structure:
- Core repos only (~20)
- Clear purpose for each repo
- Link to archival log

**2. Update Website**

Update `acreetionos-linux.github.io` to document:
- New focused repository structure
- How to contribute
- Where to find package sources

**3. Update Wiki**

Update `Wiki-Repository` with:
- Archival rationale
- New contribution guidelines
- Package management documentation

**4. Create Pinned Repositories**

Pin the most important repos on the organization profile:
1. acreetionos (main)
2. acreetionos-linux.github.io (website)
3. Acreetion-PKGBUILDs (packages)
4. arch-iso (ISO builder)
5. pacman (package manager)
6. acreetion-kde-themes (desktop showcase)

---

## Alternative Approaches Considered

### Option A: Git Submodules
**Concept:** Use git submodules to reference upstream sources instead of mirroring entire repos.

**Pros:**
- Reduces repository count dramatically
- Tracks specific upstream commits
- Clear separation of upstream vs custom code

**Cons:**
- Adds complexity to build process
- Requires careful submodule management
- May complicate reproducible builds

**Verdict:** Good long-term strategy, but requires architectural changes to build system.

### Option B: Package Source Management Tool
**Concept:** Build or use existing tool (like Arch's `asp` or Gentoo's portage) to fetch sources on-demand.
        

**Pros:**
- No GitHub repos needed for upstream sources
- Standard practice in Linux distributions
- Cleaner separation of concerns

**Cons:**
- Requires tooling investment
- May impact build reproducibility
- **Learning curve for contributors**

**Verdict:** **Recommended for post-archival implementation**. This is how most distributions handle source management.

### Option C: Mono-repo Approach
**Concept:** Consolidate all AcreetionOS-specific work into single repository with subdirectories.

**Pros:**
- Single source of truth
- Simplified management
- Clear AcreetionOS identity

**Cons:**
- Loses per-component history
- Makes contribution more complex
- Harder to track individual component changes

**Verdict:** Too extreme for current project structure.

---

## Recommended Next Steps

### Immediate Actions (This Week)

1. **Review this document** with project maintainers and stakeholders
2. **Validate assumptions** about which repos contain custom work (audit commits)
3. **Create archival announcement issue** for community feedback
4. **Identify any critical dependencies** in PKGBUILDs that reference mirror repos

### Short-term Actions (Next 2-3 Weeks)

5. **Execute TIER 1 archival** (10 empty/abandoned repos) - low risk, high clarity gain
6. **Document package source strategy** in Wiki or main repo
7. **Begin TIER 2 archival** in phases (10-20 repos at a time)
8. **Update organization profile and pinned repos**

### Long-term Strategy (Next 3-6 Months)

9. **Implement proper package source management** (Option B above)
10. **Establish clear criteria** for when to fork vs reference upstream
11. **Document 2026 independence roadmap** with specific technical requirements
12. **Regular repository audits** (quarterly) to prevent future accumulation

---

## Risk Assessment

### Low Risk
- Archiving empty repos (TIER 1)
- Archiving pure upstream syncs with available alternatives (most of TIER 2)
- Archiving superseded tools (old installers, build systems)

### Medium Risk
- Archiving C libraries if any build dependencies exist
- Consolidating pamac repos if actively in use
- Archiving archlinux-keyring if modified for AcreetionOS

### High Risk (Requires Careful Validation)
- None identified if proper audit completed first

### Mitigation Strategy
1. **Audit before archiving:** Check all PKGBUILDs for references to repos being archived
2. **Archive, don't delete:** GitHub archive preserves all data, can be unarchived if needed
3. **Phase the archival:** Do TIER 1, validate builds, then proceed to TIER 2
4. **Community feedback period:** 1 week minimum before archiving any repos

---

## Success Metrics

### Quantitative
- **Repository count:** 99 → ~20-24 (76-79% reduction)
- **Active maintenance burden:** Reduced from 99 to ~20 repos
- **Organization clarity:** Clear purpose for every remaining repo

### Qualitative
- **Improved contributor experience:** Clear understanding of what repos matter
- **Better resource allocation:** Focus maintenance effort on repos with custom work
- **Strategic clarity:** Obvious distinction between AcreetionOS work and upstream dependencies
- **Professional appearance:** Organized, focused organization profile

---

## Appendix A: Full Archive List

### TIER 1 - Immediate Archive (10)
1. AcreetionOS-Test-Repo
2. gcc-libs
3. kmod
4. AcreetionOSDockerBuild
5. acreetionfox
6. AcreetionOS-Download-Utility
7. AcreetionOSBuildSystem
8. elfutils
9. debugedit
10. bsys6

### TIER 2 - Pure Upstream Mirrors (65)

**GNU Core (14):**
11-24. bash, coreutils, coreutils-rust, gawk, grep, findutils, gzip, gettext, gnulib, gperf, bison, autoconf, automake, diffutils

**System Libraries (18):**
25-42. glibc, gnutls, gpgme, libidn2, libbpf, libfido2, libarchive, libgd, libelfin, liboqs, attr, acl, ca-certificates, cracklib, argon2, audit, cryptsetup, linux-firmware

**Dev Tools (8):**
43-50. git, gnupg, binutils, python, fakechroot, asciidoc-py, file, jq

**System Utilities (10):**
51-60. less, curl, brotli, kbd, iproute2, iputils, bash-completion, dbus, dbus-broker, dash

**Build Tools (4):**
61-64. bzip2, archlinux-keyring, snapd, AcreetionOS-Installer

**C Libraries (7):**
65-71. c-utf8, c-shquote, c-ini, c-rbtree, c-dvar, c-stdaux, c-list

**Legacy (4):**
72-75. pamac, pamac-cli, libpamac (if not actively used)

### TIER 3 - Consolidation (1-4)
76. calamares-config-xfce (if superseded)
77-79. pamac repos (if actively used, evaluate for consolidation)

**Total to Archive: 76-79 repositories**

---

## Appendix B: Repositories to Keep (~20-24)

### Core Infrastructure (5)
1. acreetionos
2. arch-iso
3. Acreetion-PKGBUILDs
4. pacman (9 custom patches)
5. mkinitcpio (4 custom commits)

### Web/Docs (3-5)
6. acreetionos-linux.github.io
7. .github
8. Wiki-Repository
9. InitialDocumentation (optional consolidate)
10. AcreetionOS_Package_Request_Repo (optional)

### Desktop - KDE (3)
11. calamares-config (private)
12. acreetion-kde-themes
13. klassy

### Desktop - XFCE (2)
14. acreetion-xfce-configs
15. builds-xfce (optional consolidate)

### Desktop - GNOME (1)
16. AcreetionOS-GNOME

### Desktop - COSMIC (3)
17. cosmic-edit
18. cosmic-term
19. cosmic-icons

### Shared Themes (3)
20. iso-included-wallpapers
21. pop-icon-theme
22. aura-theme

### Optional Utilities (2)
23. fastfetch
24. fprint_gui

**Total to Keep: 19-24 repositories**

---

## Document Revision History

- **v1.0** - Oct 31, 2025 - Initial recommendations based on org analysis
- Strategy: Aggressive consolidation, modified mirrors only, preserve all desktop variants

---

**End of Report**

For questions or clarifications, please open an issue in the `.github` repository.
