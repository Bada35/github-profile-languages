# GitHub Profile Languages

> [!WARNING]
> This repository is outdated. Unless you are planning to make changes, please delete this repository and use [GitHub Profile Languages](https://github.com/yehwankim23/github-profile-languages) instead. Thank you 🙂

## About

An API that generates GitHub-themed SVGs that show the percentage of a language in public repositories

Inspired by [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats) and [Shields.io](https://github.com/badges/shields)

## Preview

### Language Bar

Default theme (dark):

![Language bar preview (dark default)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark)

<details>
  <summary>Other themes:</summary>
  <br />

Light themes (default, high contrast, Protanopia & Deuteranopia, Tritanopia):

![Language bar preview (light default)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=light)

![Language bar preview (light high contrast)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=light-high-contrast)

![Language bar preview (light Protanopia & Deuteranopia)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=light-colorblind)

![Language bar preview (light Tritanopia)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=light-tritanopia)

Dark themes (high contrast, Protanopia & Deuteranopia, Tritanopia, dimmed):

![Language bar preview (dark high contrast)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark-high-contrast)

![Language bar preview (dark Protanopia & Deuteranopia)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark-colorblind)

![Language bar preview (dark Tritanopia)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark-tritanopia)

![Language bar preview (dark dimmed)](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark-dimmed)

</details>

### Language Button

Light themes (default, high contrast, Protanopia & Deuteranopia, Tritanopia):

![Language button preview (light default)](https://github-profile-languages.vercel.app/api/button?language=TI%20Program&theme=light)![Language button preview (light high contrast)](https://github-profile-languages.vercel.app/api/button?language=Java&theme=light_high_contrast)![Language button preview (light Protanopia & Deuteranopia)](https://github-profile-languages.vercel.app/api/button?language=Processing&theme=light_colorblind)![Language button preview (light Tritanopia)](https://github-profile-languages.vercel.app/api/button?language=Python&theme=light_tritanopia)

Dark themes (default, high contrast, Protanopia & Deuteranopia, Tritanopia, dimmed):

![Language button preview (dark default)](https://github-profile-languages.vercel.app/api/button?language=JavaScript)![Language button preview (dark high contrast)](https://github-profile-languages.vercel.app/api/button?language=Batchfile&theme=dark_high_contrast)![Language button preview (dark Protanopia & Deuteranopia)](https://github-profile-languages.vercel.app/api/button?language=VBScript&theme=dark_colorblind)![Language button preview (dark Tritanopia)](https://github-profile-languages.vercel.app/api/button?language=PowerShell&theme=dark_tritanopia)![Language button preview (dark dimmed)](https://github-profile-languages.vercel.app/api/button?language=AutoHotkey&theme=dark_dimmed)

## How to use

1. [Fork this repository](https://github.com/yehwankim23/github-profile-languages/fork)
2. [Generate a GitHub personal access token](https://github.com/settings/tokens/new) with `public_repo` permission

![How to use (GitHub personal access token)](images/how-to-use-02.png)

3. Go to [Vercel](https://vercel.com/login) and `Continue with GitHub`

![How to use (Continue with GitHub)](images/how-to-use-03.png)

4. Click `Add New...` > `Project`

![How to use (Add New... > Project)](images/how-to-use-04.png)

5. Find your repository and click `Import`

![How to use (Import)](images/how-to-use-05.png)

6. Click `Environment Variables` and add `GPL_TOKEN` and `GPL_USERNAME`

![How to use (Environment Variables)](images/how-to-use-06.png)

7. (Optional) Add languages that you want to ignore as comma-separated values (no spaces)

> [Supported languages](/src/languages.js)

![How to use (ignore)](images/how-to-use-07.png)

8. Click `Deploy`
9. Click `Continue to Dashboard`
10. Check your domains under `DOMAINS`

![How to use (ignore)](images/how-to-use-10.png)

### Language Bar

Copy and paste the following Markdown and change `DOMAIN`, `WIDTH`, and `THEME`

> [Supported themes](/src/themes.js)

```md
[![GitHub Profile Language Bar](DOMAIN/api/bar?width=WIDTH&theme=THEME)](https://github.com/yehwankim23/github-profile-languages)
```

Example:

- `DOMAIN` → `https://github-profile-languages.vercel.app`
- `WIDTH` → `830`
- `THEME` → `dark`

```md
[![GitHub Profile Language Bar](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark)](https://github.com/yehwankim23/github-profile-languages)
```

Result:

![GitHub Profile Language Bar](https://github-profile-languages.vercel.app/api/bar?width=830&theme=dark)

### Language Button

Copy and paste the following Markdown and change `DOMAIN`, `LANGUAGE`, and `THEME`

> [Supported languages](/src/languages.js)

> [Supported themes](/src/themes.js)

```md
[![GitHub Profile Language Button](DOMAIN/api/button?language=LANGUAGE&theme=THEME)](https://github.com/yehwankim23/github-profile-languages)
```

Example:

- `DOMAIN` → `https://github-profile-languages.vercel.app`
- `LANGUAGE` → `C%2b%2b` ([Percent-encoded](#percent-encoding) "C++")
- `THEME` → `dark`

```md
[![GitHub Profile Language Button](https://github-profile-languages.vercel.app/api/button?language=C%2b%2b&theme=dark)](https://github.com/yehwankim23/github-profile-languages)
```

Result:

![GitHub Profile Language Button](https://github-profile-languages.vercel.app/api/button?language=C%2b%2b)

### Language Stats

Visit `DOMAIN/api/stats` for raw language statistics

Example:

- `DOMAIN` → `https://github-profile-languages.vercel.app`

[https://github-profile-languages.vercel.app/api/stats](https://github-profile-languages.vercel.app/api/stats)

Result:

![How to use (stats)](images/how-to-use-stats.png)

Or use the `username` parameter to specify a user

Example:

- `DOMAIN` → `https://github-profile-languages.vercel.app`
- `USERNAME` → `yehwankim23`

[https://github-profile-languages.vercel.app/api/stats?username=yehwankim23](https://github-profile-languages.vercel.app/api/stats?username=yehwankim23)

### Percent-encoding

| ASCII | 2x  | ASCII | 3x  | ASCII | 4x  | ASCII | 5x  | ASCII | 6x  | ASCII | 7x  |
| ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- |
| space | %20 | :     | %3a | @     | %40 | [     | %5b | `     | %60 | {     | %7b |
| !     | %21 | ;     | %3b |       |     | \     | %5c |       |     | \|    | %7c |
| "     | %22 | <     | %3c |       |     | ]     | %5d |       |     | }     | %7d |
| #     | %23 | =     | %3d |       |     | ^     | %5e |       |     | ~     | %7e |
| $     | %24 | >     | %3e |       |     | \_    | %5f |
| %     | %25 | ?     | %3f |
| &     | %26 |
| '     | %27 |
| (     | %28 |
| )     | %29 |
| \*    | %2a |
| +     | %2b |
| ,     | %2c |
| -     | %2d |
| .     | %2e |
| /     | %2f |
