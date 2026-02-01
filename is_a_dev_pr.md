# is-a.dev Registration PR Description

Copy and paste the following content into your Pull Request block on GitHub:

---

# Requirements

- [x] I **agree** to the [Terms of Service](https://is-a.dev/terms).
- [x] My file is following the [domain structure](https://docs.is-a.dev/domain-structure/).
- [x] My website is **reachable** and **completed**.
- [x] My website is **software development** related.
- [x] My website is **not for commercial use**.
- [x] I have provided contact information in the `owner` key.
- [x] I have provided a preview of my website below.

# Website Preview

**Link**: [https://fastering.vercel.app](https://fastering.vercel.app)

**Screenshot**:
![Portfolio Preview](https://github.com/Fastering18/fastering18.github.io/blob/design2026/public/images/portfolio-preview.png?raw=true)

---

> [!TIP]
> I have saved the screenshot I took to your `public/images/portfolio-preview.png` and pushed it to GitHub so you can use the direct link in your PR!

> [!IMPORTANT]
> Make sure your `fastering.json` (inside the `domains/` folder of your fork) looks like this:
```json
{
  "owner": {
    "username": "Fastering18",
    "email": "fasteringdev@gmail.com"
  },
  "records": {
    "A": ["216.198.79.1"],
    "TXT": ["vc-domain-verify=fastering.is-a.dev,PASTE_YOUR_VERIFICATION_CODE_HERE"]
  }
}
```
